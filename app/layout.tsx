import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import ParticlesBackground from "@/components/effects/ParticlesBackground";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  icons: { icon: "/electron.png" },
  title: "Vishal Kumar | Cybersecurity Expert",
  description:
    "SOC Analyst and cybersecurity defender based in Ranchi, Jharkhand, India. Specializing in threat detection, SIEM log analysis, phishing email triage, and security automations.",
  keywords: ["SOC Analyst", "Blue Team", "Threat Detection", "SIEM", "Splunk", "Wireshark", "Cybersecurity", "Incident Response", "Defender"],
  authors: [{ name: "Vishal Kumar" }],
  openGraph: {
    title: "Vishal Kumar — SOC Analyst & Blue Team Specialist",
    description: "SOC Analyst and cybersecurity defender. Specializing in threat detection, SIEM log analysis, and defensive security automations.",
    type: "website",
    images: [
      {
        url: "/electron.png",
        width: 1920,
        height: 2180,
        alt: "Vishal Kumar — SOC Analyst & Blue Team Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Kumar — SOC Analyst & Blue Team Specialist",
    description: "SOC Analyst and cybersecurity defender. Specializing in threat detection, SIEM log analysis, and defensive security automations.",
    images: ["/electron.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#04060a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased relative">
        <ParticlesBackground />
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
