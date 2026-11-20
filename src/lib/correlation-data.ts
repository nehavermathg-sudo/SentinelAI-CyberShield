import {
  UserCircle,
  Landmark,
  CreditCard,
  Store,
  Smartphone,
  Globe,
  MonitorSmartphone,
  Wifi,
  ShieldOff,
  MapPin,
  LogIn,
  KeyRound,
  Repeat,
  Activity,
  Cpu,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

import type { Severity } from "@/lib/soc-data";

export type LinkTone = "safe" | "suspicious" | "critical";

export interface KpiCard {
  label: string;
  value: number;
  suffix?: string;
  display?: string;
  tone: "cyan" | "blue" | "green" | "amber" | "red" | "violet";
}

export const kpis: KpiCard[] = [
  { label: "Correlation Confidence", value: 98, suffix: "%", tone: "cyan" },
  { label: "Entities Correlated", value: 42, tone: "blue" },
  { label: "Security Signals", value: 137, tone: "violet" },
  { label: "Behavior Signals", value: 28, tone: "green" },
  { label: "Threat Probability", value: 96, suffix: "%", tone: "red" },
  { label: "Predicted Attack", value: 0, display: "Account Takeover", tone: "amber" },
];

export interface GraphNode {
  id: string;
  label: string;
  icon: LucideIcon;
  status: string;
  tone: LinkTone;
  /** relative position in a 0..100 coordinate space */
  x: number;
  y: number;
  details: { label: string; value: string; tone?: "danger" | "warning" | "success" | "cyan" }[];
  riskContribution: number;
}

export const graphNodes: GraphNode[] = [
  {
    id: "customer", label: "Customer", icon: UserCircle, status: "Verified", tone: "safe", x: 50, y: 50,
    riskContribution: 0,
    details: [
      { label: "Name", value: "Neha Gupta" },
      { label: "Customer ID", value: "CUST-8842190" },
      { label: "Segment", value: "Priority Banking", tone: "cyan" },
      { label: "Trust Score", value: "61%", tone: "warning" },
      { label: "Linked Events", value: "42" },
    ],
  },
  {
    id: "account", label: "Account", icon: Landmark, status: "Active", tone: "safe", x: 50, y: 16,
    riskContribution: 4,
    details: [
      { label: "Masked Account", value: "•••• 4821" },
      { label: "Balance", value: "₹12,40,500" },
      { label: "Status", value: "Frozen", tone: "danger" },
      { label: "Linked Events", value: "12" },
    ],
  },
  {
    id: "transaction", label: "Transaction", icon: CreditCard, status: "Blocked", tone: "critical", x: 78, y: 22,
    riskContribution: 30,
    details: [
      { label: "Amount", value: "₹95,000", tone: "warning" },
      { label: "Channel", value: "UPI" },
      { label: "Beneficiary", value: "First-time", tone: "danger" },
      { label: "Decision", value: "Blocked", tone: "danger" },
      { label: "Risk Contribution", value: "30%" },
    ],
  },
  {
    id: "merchant", label: "Merchant", icon: Store, status: "Untrusted", tone: "suspicious", x: 90, y: 44,
    riskContribution: 6,
    details: [
      { label: "Category", value: "Wallet Top-up" },
      { label: "History", value: "None" },
      { label: "Trust", value: "Low", tone: "warning" },
      { label: "Linked Events", value: "3" },
    ],
  },
  {
    id: "device", label: "Device", icon: Smartphone, status: "Unrecognized", tone: "critical", x: 84, y: 68,
    riskContribution: 22,
    details: [
      { label: "Model", value: "Rooted Android" },
      { label: "Fingerprint", value: "a7f2-90c1-ee34" },
      { label: "App Integrity", value: "Failed", tone: "danger" },
      { label: "Trust Score", value: "8%", tone: "danger" },
      { label: "Risk Contribution", value: "22%" },
    ],
  },
  {
    id: "browser", label: "Browser", icon: Globe, status: "New", tone: "suspicious", x: 66, y: 82,
    riskContribution: 5,
    details: [
      { label: "Agent", value: "Chrome Mobile 122" },
      { label: "Automation", value: "Suspected", tone: "warning" },
      { label: "Linked Events", value: "4" },
    ],
  },
  {
    id: "os", label: "Operating System", icon: MonitorSmartphone, status: "Anomalous", tone: "suspicious", x: 48, y: 90,
    riskContribution: 5,
    details: [
      { label: "OS", value: "Windows 11" },
      { label: "Expected", value: "Android 14", tone: "warning" },
      { label: "Mismatch", value: "Yes", tone: "danger" },
    ],
  },
  {
    id: "ip", label: "IP Address", icon: Wifi, status: "Flagged", tone: "critical", x: 20, y: 74,
    riskContribution: 8,
    details: [
      { label: "IP", value: "103.21.•.•" },
      { label: "ASN", value: "Commercial VPN" },
      { label: "Reputation", value: "Poor", tone: "danger" },
      { label: "Risk Contribution", value: "8%" },
    ],
  },
  {
    id: "vpn", label: "VPN", icon: ShieldOff, status: "Active", tone: "critical", x: 10, y: 50,
    riskContribution: 9,
    details: [
      { label: "VPN Provider", value: "NordVPN (commercial)" },
      { label: "IP", value: "103.21.•.•" },
      { label: "Country", value: "Netherlands" },
      { label: "Trust Score", value: "11%", tone: "danger" },
      { label: "Known Malicious", value: "Yes", tone: "danger" },
      { label: "Previous Usage", value: "Never", tone: "warning" },
      { label: "Linked Events", value: "6" },
      { label: "Risk Contribution", value: "9%" },
    ],
  },
  {
    id: "geo", label: "Geo Location", icon: MapPin, status: "Impossible Travel", tone: "critical", x: 18, y: 26,
    riskContribution: 18,
    details: [
      { label: "Current", value: "Mumbai, MH", tone: "danger" },
      { label: "Baseline", value: "Kanpur, UP" },
      { label: "Distance", value: "1,340 km" },
      { label: "Impossible Travel", value: "Detected", tone: "danger" },
      { label: "Risk Contribution", value: "18%" },
    ],
  },
  {
    id: "login", label: "Login Event", icon: LogIn, status: "Success", tone: "suspicious", x: 34, y: 12,
    riskContribution: 4,
    details: [
      { label: "Time", value: "02:31 AM" },
      { label: "Method", value: "Password + OTP" },
      { label: "Anomaly", value: "Odd hour", tone: "warning" },
    ],
  },
  {
    id: "failed", label: "Failed Login", icon: KeyRound, status: "5 Attempts", tone: "suspicious", x: 66, y: 12,
    riskContribution: 6,
    details: [
      { label: "Attempts", value: "5", tone: "warning" },
      { label: "Window", value: "48 sec" },
      { label: "Pattern", value: "Credential stuffing", tone: "danger" },
    ],
  },
  {
    id: "sim", label: "SIM Change", icon: Repeat, status: "3 Days Old", tone: "critical", x: 90, y: 62,
    riskContribution: 10,
    details: [
      { label: "Carrier Port", value: "Detected", tone: "danger" },
      { label: "SIM Age", value: "3 days" },
      { label: "OTP Risk", value: "High", tone: "danger" },
    ],
  },
  {
    id: "behavior", label: "Behavior Pattern", icon: Activity, status: "Drift 72pts", tone: "critical", x: 14, y: 62,
    riskContribution: 15,
    details: [
      { label: "Baseline Match", value: "24%", tone: "danger" },
      { label: "Historical", value: "96%" },
      { label: "Typing Cadence", value: "Anomalous", tone: "warning" },
      { label: "Risk Contribution", value: "15%" },
    ],
  },
  {
    id: "risk", label: "Risk Engine", icon: Cpu, status: "Score 93", tone: "critical", x: 28, y: 90,
    riskContribution: 0,
    details: [
      { label: "Aggregate Score", value: "93 / 100", tone: "danger" },
      { label: "Signals", value: "137 telemetry · 28 behavior" },
      { label: "Model", value: "SentinelAI v4.2" },
    ],
  },
  {
    id: "decision", label: "AI Decision", icon: BrainCircuit, status: "Blocked", tone: "critical", x: 58, y: 68,
    riskContribution: 0,
    details: [
      { label: "Verdict", value: "Account Takeover", tone: "danger" },
      { label: "Confidence", value: "98%", tone: "cyan" },
      { label: "Action", value: "Transaction Blocked", tone: "danger" },
    ],
  },
];

export interface GraphEdge {
  from: string;
  to: string;
  tone: LinkTone;
}

export const graphEdges: GraphEdge[] = [
  { from: "customer", to: "account", tone: "safe" },
  { from: "customer", to: "login", tone: "suspicious" },
  { from: "customer", to: "behavior", tone: "critical" },
  { from: "account", to: "transaction", tone: "critical" },
  { from: "transaction", to: "merchant", tone: "suspicious" },
  { from: "transaction", to: "decision", tone: "critical" },
  { from: "login", to: "failed", tone: "suspicious" },
  { from: "login", to: "device", tone: "critical" },
  { from: "device", to: "browser", tone: "suspicious" },
  { from: "device", to: "os", tone: "suspicious" },
  { from: "device", to: "sim", tone: "critical" },
  { from: "device", to: "ip", tone: "critical" },
  { from: "ip", to: "vpn", tone: "critical" },
  { from: "vpn", to: "geo", tone: "critical" },
  { from: "geo", to: "behavior", tone: "critical" },
  { from: "behavior", to: "risk", tone: "critical" },
  { from: "risk", to: "decision", tone: "critical" },
  { from: "customer", to: "device", tone: "critical" },
];

export interface TimelineEvent {
  time: string;
  title: string;
  severity: Severity | "resolved";
  details: string;
  evidence: string;
  confidence: number;
}

export const correlationTimeline: TimelineEvent[] = [
  { time: "02:31", title: "Login", severity: "low", details: "Authentication succeeded at an unusual hour.", evidence: "Auth log #A731", confidence: 74 },
  { time: "02:32", title: "VPN Connected", severity: "medium", details: "Session routed via commercial VPN exit node.", evidence: "Netflow trace", confidence: 88 },
  { time: "02:33", title: "Device Changed", severity: "critical", details: "Session moved to a rooted, unrecognized device.", evidence: "Fingerprint a7f2", confidence: 97 },
  { time: "02:34", title: "Five Failed Login Attempts", severity: "high", details: "Repeated failures consistent with credential stuffing.", evidence: "Auth log burst", confidence: 84 },
  { time: "02:35", title: "Password Reset", severity: "critical", details: "Immediate password reset after access.", evidence: "SMS OTP event", confidence: 92 },
  { time: "02:37", title: "Large Transaction", severity: "critical", details: "₹95,000 transfer to first-time beneficiary.", evidence: "UPI txn TX-90215", confidence: 98 },
  { time: "02:38", title: "AI Risk Increased", severity: "critical", details: "Aggregate risk score climbed to 93.", evidence: "Risk engine delta", confidence: 96 },
  { time: "02:39", title: "Transaction Blocked", severity: "resolved", details: "SentinelAI auto-blocked and froze the session.", evidence: "Decision log", confidence: 99 },
];

export const aiExplanation = [
  "SentinelAI correlated 137 cybersecurity telemetry events with 28 behavioral indicators across a single session.",
  "The investigation identified a new device connecting from an unfamiliar network through a commercial VPN.",
  "The customer historically performs transactions between 9 AM and 7 PM from Kanpur using an Android device.",
  "The current transaction originated from Mumbai at 2:34 AM using a Windows laptop.",
  "Behavioral similarity dropped from 96% to 24% within minutes of the session start.",
  "The AI model identified an Account Takeover attack with a confidence score of 98%.",
];

export const matrixRows = ["Transaction", "Location", "Device", "IP", "VPN", "Behavior", "Merchant", "Network"];
export const matrixCols = ["Customer", "Account", "Device", "IP", "VPN", "Geo", "Behavior", "Merchant"];
// relationship strength 0..100
export const matrixValues: number[][] = [
  [62, 88, 74, 40, 35, 55, 71, 90],
  [58, 30, 66, 82, 78, 96, 61, 24],
  [70, 65, 100, 88, 72, 60, 84, 46],
  [40, 44, 88, 100, 94, 68, 52, 30],
  [35, 41, 72, 94, 100, 90, 48, 22],
  [55, 52, 60, 68, 90, 100, 58, 44],
  [71, 61, 84, 52, 48, 58, 100, 63],
  [30, 33, 46, 88, 76, 44, 63, 70],
];

export interface SignalContribution {
  label: string;
  value: number;
  tone: "blue" | "cyan" | "green" | "amber" | "red" | "violet";
}

export const signalContributions: SignalContribution[] = [
  { label: "Behavior", value: 25, tone: "cyan" },
  { label: "Device", value: 22, tone: "blue" },
  { label: "Location", value: 18, tone: "violet" },
  { label: "Transaction", value: 14, tone: "green" },
  { label: "VPN", value: 9, tone: "amber" },
  { label: "Network", value: 8, tone: "red" },
  { label: "Threat Intelligence", value: 4, tone: "cyan" },
];

export interface EntityRow {
  entity: string;
  type: string;
  risk: Severity;
  confidence: number;
  status: string;
  relatedEvents: number;
}

export const entityRows: EntityRow[] = [
  { entity: "Neha Gupta", type: "Customer", risk: "medium", confidence: 61, status: "Under Review", relatedEvents: 42 },
  { entity: "•••• 4821", type: "Account", risk: "critical", confidence: 98, status: "Frozen", relatedEvents: 12 },
  { entity: "TX-90215", type: "Transaction", risk: "critical", confidence: 98, status: "Blocked", relatedEvents: 7 },
  { entity: "a7f2-90c1-ee34", type: "Device", risk: "critical", confidence: 97, status: "Blocked", relatedEvents: 15 },
  { entity: "103.21.•.•", type: "IP Address", risk: "high", confidence: 88, status: "Flagged", relatedEvents: 9 },
  { entity: "NordVPN Node", type: "VPN", risk: "high", confidence: 90, status: "Flagged", relatedEvents: 6 },
  { entity: "Mumbai, MH", type: "Geo Location", risk: "critical", confidence: 96, status: "Anomaly", relatedEvents: 5 },
  { entity: "Wallet Top-up", type: "Merchant", risk: "medium", confidence: 55, status: "Untrusted", relatedEvents: 3 },
  { entity: "Typing Cadence", type: "Behavior", risk: "high", confidence: 91, status: "Drift", relatedEvents: 8 },
  { entity: "SIM Port Event", type: "Network", risk: "high", confidence: 79, status: "Flagged", relatedEvents: 4 },
];

export const decisionPath = [
  "Telemetry",
  "Feature Extraction",
  "Behavior Correlation",
  "Threat Intelligence",
  "Risk Engine",
  "Explainable AI",
  "Decision Engine",
  "Transaction Blocked",
];

export const attackGraph = [
  { label: "Attacker", tone: "critical" as LinkTone },
  { label: "VPN", tone: "critical" as LinkTone },
  { label: "Credential Theft", tone: "critical" as LinkTone },
  { label: "Login", tone: "suspicious" as LinkTone },
  { label: "Device Change", tone: "critical" as LinkTone },
  { label: "Behavior Drift", tone: "critical" as LinkTone },
  { label: "Transaction", tone: "critical" as LinkTone },
  { label: "Blocked", tone: "safe" as LinkTone },
];

export interface RiskStep {
  label: string;
  delta: number;
  id: string;
}

export const riskPropagation: RiskStep[] = [
  { id: "vpn", label: "VPN", delta: 10 },
  { id: "device", label: "New Device", delta: 20 },
  { id: "geo", label: "Impossible Travel", delta: 18 },
  { id: "behavior", label: "Behavior Drift", delta: 15 },
  { id: "transaction", label: "Large Transaction", delta: 30 },
];
export const finalRisk = 93;

export const caseMeta = {
  id: "INC-2026-10421",
  risk: "Critical",
  evidenceCount: 27,
  signals: "137 + 28",
  analyst: "SOC Administrator",
  investigationTime: "18m",
  recommendedAction: "Freeze Account & Escalate",
};
