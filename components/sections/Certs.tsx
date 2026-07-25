"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Cert {
  id: string;
  title: string;
  issuer: string;
  image: string;
  url: string;
}

const certs: Cert[] = [
  {
    id: "01",
    title: "Complete Ethical Hacking Bootcamp",
    issuer: "Zero To Mastery",
    image: "/hacking_bootcamp.png",
    url: "#",
  },
  {
    id: "02",
    title: "E-Summit 2026 Hackathon",
    issuer: "BIT Sindri",
    image: "/bit_sindri_hackathon.png",
    url: "#",
  },
  {
    id: "03",
    title: "Ranchi Hacks 2026",
    issuer: "GDG Ranchi",
    image: "/gdg_ranchi_hacks.png",
    url: "#",
  },
  {
    id: "04",
    title: "Career Guidance Seminar",
    issuer: "E-Cell IIT Hyderabad",
    image: "/iit_hyderabad_webinar.png",
    url: "#",
  },
];

export default function Certs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="certs"
      className="w-full py-24"
      style={{
        background: "transparent",
      }}
      aria-labelledby="certs-heading"
    >
      <div ref={ref} className="max-w-350 mx-auto px-6 lg:px-20">
        <div className="flex items-end gap-6 mb-14">
          <div className="flex flex-col gap-2">
            <motion.span
              className="font-orbitron text-xs tracking-widest uppercase"
              style={{ color: "var(--accent)", opacity: 0.6 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.6 } : {}}
              transition={{ duration: 0.5 }}
            >
              05 / 07
            </motion.span>
            <motion.h2
              id="certs-heading"
              className="font-display font-bold leading-none"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "var(--text-primary)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              CERTIFICATIONS
            </motion.h2>
          </div>
          <motion.div
            className="flex-1 h-px mb-3 origin-left hidden md:block"
            style={{ background: "var(--grid-line)" }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, index) => (
            <motion.a
              key={cert.id}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group relative flex flex-col items-center text-center gap-6 p-7 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="w-full h-40 relative flex items-center justify-center">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <h3
                  className="font-display font-bold leading-tight"
                  style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                    color: "var(--text-primary)",
                  }}
                >
                  {cert.title}
                </h3>
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--accent)" }}
                >
                  {cert.issuer}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
