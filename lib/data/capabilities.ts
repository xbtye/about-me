export interface Capability {
  id: string;
  title: string;
  description: string;
  techniques: string[];
  accentColor: "cyan" | "red";
}

export const capabilities: Capability[] = [
  {
    id: "01",
    title: "SIEM & Log Analysis",
    description: "Monitoring network/system activity, parsing logs, and identifying anomalies or suspicious behavior using SIEM platforms.",
    accentColor: "cyan",
    techniques: [
      "Splunk search & correlation",
      "Linux syslog analysis",
      "Windows Event Log triage",
      "Network flow monitoring",
      "Alert tuning & rule design",
      "Log parser scripting",
      "Anomaly detection",
      "SOC dashboarding",
    ],
  },
  {
    id: "02",
    title: "Threat Detection & Incident Response",
    description: "Investigating potential security threats, analyzing traffic, and understanding attack vectors to execute containment playbooks.",
    accentColor: "red",
    techniques: [
      "Wireshark packet analysis",
      "Nmap vulnerability scanning",
      "Phishing email triage",
      "Email header investigation",
      "IOC extraction & analysis",
      "Incident containment basics",
      "LetsDefend SOC simulation",
      "TryHackMe defense labs",
    ],
  },
  {
    id: "03",
    title: "Security Automation & Dev",
    description: "Building custom defensive tools and scripting automations to streamline SOC analyst workflows and reduce manual triage time.",
    accentColor: "cyan",
    techniques: [
      "Python security scripting",
      "AI-driven phishing analysis",
      "Automated log scanners",
      "Alert reporting integrations",
      "Full-stack defensive tools",
      "API parsing & automation",
      "Regex pattern matching",
      "Generative AI automations",
    ],
  },
];
