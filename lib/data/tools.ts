export interface Tool {
  id: string;
  title: string;
  tag?: string;
  tagColor?: "red" | "cyan";
  description: string;
  stack: string[];
  href: string;
  docsHref?: string;
  featured?: boolean;
  bgVariant?: "particles" | "grid" | "plain";
}

export const tools: Tool[] = [
  {
    id: "01",
    title: "Mail Defender",
    tag: "[ BLUE TEAM TOOL ]",
    tagColor: "cyan",
    description:
      "Developed an AI-powered phishing email analysis tool that inspects email headers, URLs, and sender authenticity to identify potential phishing attempts. It detects spoofed domains, analyzes suspicious indicators, evaluates email risk, and generates detailed incident reports. The project simulates real-world SOC analyst workflows for efficient threat investigation and response.",
    stack: ["Python", "FastAPI", "React", "Generative AI"],
    href: "https://github.com/xbtye/Mail-Defender",
    featured: true,
    bgVariant: "particles",
  },
  {
    id: "02",
    title: "Steganography",
    tag: "[ SECURITY TOOL ]",
    tagColor: "cyan",
    description:
      "Built an Image Steganography application that securely hides secret messages inside images without affecting their visible appearance. The project uses encryption and extraction techniques to ensure confidential communication while demonstrating practical information security concepts.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    href: "https://github.com/xbtye/Stagenography",
    bgVariant: "grid",
  },

  {
    id: "03",
    title: "GCShop",
    tag: "[ E-COMMERCE ]",
    tagColor: "cyan",
    description:
      "Built a modern e-commerce web platform for gift cards featuring an intuitive product catalog, dynamic price and balance calculators, high-contrast card management, and secure checkout workflows.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "https://github.com/xbtye/gcshop",
    bgVariant: "grid",
  },
  {
    id: "04",
    title: "More on GitHub →",
    tag: "[ EXPLORE ]",
    tagColor: "cyan",
    description: "Access my repository of cybersecurity automation scripts, tools, and security research.",
    stack: [],
    href: "https://github.com/xbtye",
    bgVariant: "grid",
  },
];
