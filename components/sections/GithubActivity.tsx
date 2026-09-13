"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

interface DayData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  dayOfWeek: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  monthLabel?: string;
  isFirstOfMonth?: boolean;
}

const TOTAL_TARGET_CONTRIBUTIONS = 1664;

// Generate deterministic data matching the user's exact contribution chart:
// - Sep 2025 -> Dec 2025: Sparse (mostly 0, few 1-3)
// - Jan 2026: 1 contribution around mid-Jan
// - Feb 2026 -> Sep 2026: Heavy activity (level 2, 3, 4) summing up to exactly 1,664!
function generateContributionData(): DayData[] {
  const endDate = new Date(2026, 8, 14); // Sep 14, 2026
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (52 * 7 - 1)); // 52 weeks ago

  // Pseudo-random generator seeded deterministically
  let seed = 42;
  function pseudoRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  const days: DayData[] = [];
  const rawCounts: number[] = [];

  const curr = new Date(startDate);
  while (curr <= endDate) {
    const year = curr.getFullYear();
    const month = curr.getMonth(); // 0-indexed
    const dayOfMonth = curr.getDate();
    const dateStr = curr.toISOString().split("T")[0];
    const dayOfWeek = curr.getDay();

    let count = 0;

    if (year === 2025) {
      if (month === 11 && dayOfMonth >= 15 && dayOfMonth <= 17) {
        count = 1; // Dec green block
      } else {
        count = 0;
      }
    } else {
      // 2026
      if (month === 0) {
        // Jan
        if (dayOfMonth === 19) count = 1;
        else if (dayOfMonth > 24) count = Math.floor(pseudoRandom() * 4) + 1;
        else count = 0;
      } else if (month >= 1 && month <= 7) {
        // Feb to Aug: Heavy active season
        const rand = pseudoRandom();
        if (rand < 0.08) {
          count = Math.floor(pseudoRandom() * 3) + 2; // 2-4
        } else if (rand < 0.45) {
          count = Math.floor(pseudoRandom() * 5) + 5; // 5-9
        } else if (rand < 0.85) {
          count = Math.floor(pseudoRandom() * 6) + 10; // 10-15
        } else {
          count = Math.floor(pseudoRandom() * 5) + 16; // 16-20 (peak)
        }
      } else if (month === 8) {
        // Sep 2026 up to 14th
        const rand = pseudoRandom();
        if (rand < 0.2) count = Math.floor(pseudoRandom() * 4) + 3;
        else count = Math.floor(pseudoRandom() * 8) + 7;
      }
    }

    rawCounts.push(count);
    curr.setDate(curr.getDate() + 1);
  }

  // Scale rawCounts so the exact total sum equals TOTAL_TARGET_CONTRIBUTIONS (1,664)
  const currentSum = rawCounts.reduce((a, b) => a + b, 0);
  const scale = TOTAL_TARGET_CONTRIBUTIONS / currentSum;

  let scaledSum = 0;
  const scaledCounts = rawCounts.map((val) => {
    if (val === 0) return 0;
    const scaled = Math.round(val * scale);
    scaledSum += scaled;
    return scaled;
  });

  // Adjust discrepancy to hit 1,664 exactly
  let diff = TOTAL_TARGET_CONTRIBUTIONS - scaledSum;
  let idx = scaledCounts.length - 1;
  while (diff !== 0 && idx >= 0) {
    if (scaledCounts[idx] > 0) {
      if (diff > 0) {
        scaledCounts[idx]++;
        diff--;
      } else if (scaledCounts[idx] > 1) {
        scaledCounts[idx]--;
        diff++;
      }
    }
    idx--;
  }

  // Re-generate date array with assigned scaled counts and levels
  curr.setTime(startDate.getTime());
  let lastMonth = -1;

  for (let i = 0; i < scaledCounts.length; i++) {
    const month = curr.getMonth();
    const count = scaledCounts[i];

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count === 0) level = 0;
    else if (count <= 3) level = 1;
    else if (count <= 7) level = 2;
    else if (count <= 12) level = 3;
    else level = 4;

    const isFirstOfMonth = month !== lastMonth;
    const monthLabel = isFirstOfMonth
      ? curr.toLocaleString("en-US", { month: "short" })
      : undefined;

    days.push({
      date: curr.toISOString().split("T")[0],
      count,
      level,
      dayOfWeek: curr.getDay(),
      monthLabel,
      isFirstOfMonth,
    });

    if (isFirstOfMonth) lastMonth = month;
    curr.setDate(curr.getDate() + 1);
  }

  return days;
}



// ─── Main Component ───────────────────────────────────────────────────────────
export default function GithubActivity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const heatmapContentRef = useRef<HTMLDivElement>(null);

  const inView = useInView(inViewRef, { once: true, margin: "-80px" });

  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [maxSlide, setMaxSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center 50%"],
  });

  useEffect(() => {
    const updateMaxSlide = () => {
      if (heatmapContainerRef.current && heatmapContentRef.current) {
        const containerW = heatmapContainerRef.current.clientWidth;
        const contentW = heatmapContentRef.current.scrollWidth;
        if (contentW > containerW) {
          setMaxSlide(-(contentW - containerW + 12));
        } else {
          setMaxSlide(0);
        }
      }
    };

    updateMaxSlide();
    window.addEventListener("resize", updateMaxSlide);
    return () => window.removeEventListener("resize", updateMaxSlide);
  }, []);

  const rawX = useTransform(scrollYProgress, [0, 1], [0, maxSlide]);
  const translateX = useSpring(rawX, {
    stiffness: 140,
    damping: 24,
    mass: 0.15,
  });

  const daysData = useMemo(() => generateContributionData(), []);

  // Filter or group into 52 weeks (columns)
  const weeks = useMemo(() => {
    const result: DayData[][] = [];
    let currentWeek: DayData[] = [];

    daysData.forEach((day) => {
      currentWeek.push(day);
      if (day.dayOfWeek === 6) {
        // Saturday = end of week
        result.push(currentWeek);
        currentWeek = [];
      }
    });
    if (currentWeek.length > 0) {
      result.push(currentWeek);
    }
    return result;
  }, [daysData]);

  // Compute month headers with proper column offset
  const monthHeaders = useMemo(() => {
    const headers: { month: string; colIndex: number }[] = [];
    let lastSeenMonth = "";

    weeks.forEach((week, colIdx) => {
      week.forEach((day) => {
        if (day.monthLabel && day.monthLabel !== lastSeenMonth) {
          headers.push({ month: day.monthLabel, colIndex: colIdx });
          lastSeenMonth = day.monthLabel;
        }
      });
    });

    return headers;
  }, [weeks]);

  // Level color palette matching Cyber Defender theme
  const getLevelStyle = (level: number) => {
    switch (level) {
      case 1:
        return {
          background: "#0e4429",
          border: "1px solid rgba(14,68,41,0.8)",
          boxShadow: "0 0 4px rgba(14,68,41,0.4)",
        };
      case 2:
        return {
          background: "#006d32",
          border: "1px solid rgba(0,109,50,0.9)",
          boxShadow: "0 0 6px rgba(0,109,50,0.5)",
        };
      case 3:
        return {
          background: "#26a641",
          border: "1px solid rgba(38,166,65,0.9)",
          boxShadow: "0 0 8px rgba(38,166,65,0.6)",
        };
      case 4:
        return {
          background: "#39d353",
          border: "1px solid rgba(57,211,83,1)",
          boxShadow: "0 0 10px rgba(57,211,83,0.8), 0 0 18px rgba(230,34,76,0.3)",
        };
      default:
        return {
          background: "rgba(16, 22, 34, 0.7)",
          border: "1px solid rgba(230, 34, 76, 0.08)",
          boxShadow: "none",
        };
    }
  };

  return (
    <section
      ref={sectionRef}
      id="github-activity"
      className="w-full py-24 relative"
      style={{ background: "transparent" }}
      aria-labelledby="github-heading"
    >
      <div ref={inViewRef} className="max-w-350 mx-auto px-6 lg:px-20">



        {/* ── macOS Terminal Wrapper ── */}
        <motion.div
          className="relative rounded-xl overflow-hidden border border-[rgba(230,34,76,0.22)] shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(230,34,76,0.1)]"
          style={{
            background: "rgba(8, 12, 18, 0.94)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* ── Interactive Contribution Heatmap Canvas ── */}
          <div
            ref={heatmapContainerRef}
            className="p-6 overflow-x-hidden md:overflow-x-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            <motion.div
              ref={heatmapContentRef}
              style={{ x: translateX }}
              className="min-w-[760px] flex flex-col gap-2"
            >
              {/* Month Row */}
              <div className="flex text-[11px] font-mono text-gray-400 pl-8 relative h-5">
                {monthHeaders.map((mh, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{ left: `calc(32px + ${mh.colIndex * 14}px)` }}
                  >
                    {mh.month}
                  </span>
                ))}
              </div>

              {/* Main Grid: Days of week + 52 Column Matrix */}
              <div className="flex gap-2 items-start">
                {/* Day Labels Column */}
                <div className="flex flex-col gap-[3px] text-[10px] font-mono text-gray-500 pt-0.5 select-none w-6 shrink-0">
                  <span className="h-[11px] leading-[11px]"></span>
                  <span className="h-[11px] leading-[11px]">Mon</span>
                  <span className="h-[11px] leading-[11px]"></span>
                  <span className="h-[11px] leading-[11px]">Wed</span>
                  <span className="h-[11px] leading-[11px]"></span>
                  <span className="h-[11px] leading-[11px]">Fri</span>
                  <span className="h-[11px] leading-[11px]"></span>
                </div>

                {/* 52 Columns */}
                <div className="flex gap-[3px] flex-1">
                  {weeks.map((week, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-[3px]">
                      {week.map((day, rowIdx) => (
                        <motion.div
                          key={rowIdx}
                          className="w-[11px] h-[11px] rounded-[2px] cursor-pointer transition-transform duration-150 hover:scale-125 hover:z-20 relative"
                          style={getLevelStyle(day.level)}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          whileHover={{ scale: 1.35 }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid Footer: Hover readout & Legend */}
              <div className="flex flex-wrap items-center justify-between pt-6 mt-2 border-t border-white/5 text-xs font-mono gap-4">
                {/* Dynamic Tooltip / Status Prompt */}
                <div className="flex items-center gap-2 min-h-[24px]">
                  {hoveredDay ? (
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[rgba(230,34,76,0.12)] border border-[rgba(230,34,76,0.3)] text-gray-200"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="text-rose-400 font-bold">
                        {hoveredDay.count} contribution{hoveredDay.count === 1 ? "" : "s"}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span>{hoveredDay.date}</span>
                    </motion.div>
                  ) : (
                    <span className="text-gray-500 italic">
                      Hover over matrix cells to inspect daily logs
                    </span>
                  )}
                </div>

                {/* GitHub Standard Heatmap Legend */}
                <div className="flex items-center gap-2 select-none">
                  <span className="text-gray-400 text-[11px]">Less</span>
                  <div className="flex gap-[3px]">
                    <div className="w-[11px] h-[11px] rounded-[2px]" style={getLevelStyle(0)} />
                    <div className="w-[11px] h-[11px] rounded-[2px]" style={getLevelStyle(1)} />
                    <div className="w-[11px] h-[11px] rounded-[2px]" style={getLevelStyle(2)} />
                    <div className="w-[11px] h-[11px] rounded-[2px]" style={getLevelStyle(3)} />
                    <div className="w-[11px] h-[11px] rounded-[2px]" style={getLevelStyle(4)} />
                  </div>
                  <span className="text-gray-400 text-[11px]">More</span>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
