import {
  Smartphone,
  Banknote,
  ShieldOff,
  Plane,
  RefreshCw,
  KeyRound,
  Bug,
  Bot,
  MonitorSmartphone,
  Activity,
  type LucideIcon,
} from "lucide-react";

export type Severity = "critical" | "high" | "medium" | "low";
export type Decision = "Allow" | "Verify" | "Blocked";

export interface ThreatEvent {
  id: string;
  title: string;
  detail: string;
  severity: Severity;
  time: string;
  status: string;
  icon: LucideIcon;
}

export const threatFeed: ThreatEvent[] = [
  { id: "T-1", title: "New Device Login", detail: "Customer •••4821 · Android", severity: "medium", time: "just now", status: "Monitoring", icon: Smartphone },
  { id: "T-2", title: "High Value Transfer", detail: "₹18,50,000 · NEFT", severity: "high", time: "1m ago", status: "Step-up auth", icon: Banknote },
  { id: "T-3", title: "VPN Detected", detail: "Exit node · Amsterdam", severity: "medium", time: "3m ago", status: "Flagged", icon: ShieldOff },
  { id: "T-4", title: "Impossible Travel", detail: "Mumbai → Lagos · 9 min", severity: "critical", time: "5m ago", status: "Blocked", icon: Plane },
  { id: "T-5", title: "SIM Change", detail: "Customer •••7734", severity: "high", time: "8m ago", status: "Frozen", icon: RefreshCw },
  { id: "T-6", title: "Multiple Failed Login", detail: "6 attempts · IP 103.21.•.•", severity: "high", time: "11m ago", status: "Locked", icon: KeyRound },
  { id: "T-7", title: "Rooted Device", detail: "Integrity check failed", severity: "critical", time: "14m ago", status: "Blocked", icon: Bug },
  { id: "T-8", title: "Bot Activity", detail: "Scripted session detected", severity: "medium", time: "17m ago", status: "Challenged", icon: Bot },
  { id: "T-9", title: "Remote Access Detected", detail: "TeamViewer on session", severity: "high", time: "21m ago", status: "Verifying", icon: MonitorSmartphone },
  { id: "T-10", title: "Behavior Change", detail: "Typing cadence anomaly", severity: "low", time: "25m ago", status: "Learning", icon: Activity },
];

export interface TxnRow {
  id: string;
  customer: string;
  amount: string;
  location: string;
  device: string;
  risk: number;
  decision: Decision;
}

export const transactions: TxnRow[] = [
  { id: "TX-90212", customer: "Rohan Mehta", amount: "₹1,24,500", location: "Mumbai, MH", device: "iPhone 15", risk: 12, decision: "Allow" },
  { id: "TX-90213", customer: "Aisha Khan", amount: "₹18,50,000", location: "Delhi, DL", device: "Pixel 8", risk: 78, decision: "Verify" },
  { id: "TX-90214", customer: "Vikram Rao", amount: "₹9,999", location: "Pune, MH", device: "OnePlus 12", risk: 6, decision: "Allow" },
  { id: "TX-90215", customer: "Neha Gupta", amount: "₹4,60,000", location: "Lagos, NG", device: "Web · Chrome", risk: 94, decision: "Blocked" },
  { id: "TX-90216", customer: "Arjun Nair", amount: "₹32,000", location: "Bangalore, KA", device: "Galaxy S24", risk: 21, decision: "Allow" },
  { id: "TX-90217", customer: "Sana Sheikh", amount: "₹2,10,000", location: "Hyderabad, TS", device: "iPad Air", risk: 63, decision: "Verify" },
  { id: "TX-90218", customer: "Karan Singh", amount: "₹75,000", location: "Kanpur, UP", device: "Redmi Note 13", risk: 88, decision: "Blocked" },
  { id: "TX-90219", customer: "Divya Iyer", amount: "₹15,250", location: "Chennai, TN", device: "iPhone 14", risk: 9, decision: "Allow" },
  { id: "TX-90220", customer: "Manish Jain", amount: "₹6,80,000", location: "Ahmedabad, GJ", device: "Web · Edge", risk: 71, decision: "Verify" },
  { id: "TX-90221", customer: "Pooja Desai", amount: "₹41,300", location: "Pune, MH", device: "Galaxy A54", risk: 18, decision: "Allow" },
  { id: "TX-90222", customer: "Imran Ali", amount: "₹9,20,000", location: "Unknown", device: "Rooted Android", risk: 97, decision: "Blocked" },
  { id: "TX-90223", customer: "Meera Joshi", amount: "₹52,000", location: "Nagpur, MH", device: "iPhone 13", risk: 27, decision: "Allow" },
];

export const riskDistribution = [
  { name: "Safe", value: 1084, color: "#22c55e" },
  { name: "Medium", value: 312, color: "#f59e0b" },
  { name: "High", value: 148, color: "#fb923c" },
  { name: "Critical", value: 41, color: "#ef4444" },
];

export interface HeatCity {
  city: string;
  level: Severity;
  incidents: number;
  x: number;
  y: number;
}

export const heatCities: HeatCity[] = [
  { city: "Delhi", level: "high", incidents: 42, x: 44, y: 30 },
  { city: "Mumbai", level: "critical", incidents: 61, x: 30, y: 60 },
  { city: "Kanpur", level: "medium", incidents: 24, x: 52, y: 38 },
  { city: "Bangalore", level: "high", incidents: 38, x: 45, y: 78 },
  { city: "Hyderabad", level: "medium", incidents: 29, x: 48, y: 66 },
  { city: "Pune", level: "low", incidents: 17, x: 33, y: 62 },
];

export interface Incident {
  id: string;
  customer: string;
  risk: Severity;
  status: string;
  assignee: string;
  time: string;
}

export const incidents: Incident[] = [
  { id: "INC-4821", customer: "Neha Gupta", risk: "critical", status: "Investigating", assignee: "A. Sharma", time: "5m ago" },
  { id: "INC-4820", customer: "Imran Ali", risk: "critical", status: "Contained", assignee: "R. Patel", time: "22m ago" },
  { id: "INC-4819", customer: "Karan Singh", risk: "high", status: "Open", assignee: "S. Verma", time: "41m ago" },
  { id: "INC-4818", customer: "Aisha Khan", risk: "high", status: "Escalated", assignee: "M. Rao", time: "1h ago" },
  { id: "INC-4817", customer: "Manish Jain", risk: "medium", status: "Resolved", assignee: "A. Sharma", time: "2h ago" },
];

export type RecKind = "critical" | "warning" | "recommendation" | "information";

export const recommendations = [
  { action: "Freeze customer verification", target: "Neha Gupta · INC-4821", severity: "critical" as Severity, kind: "critical" as RecKind },
  { action: "Enable step-up authentication", target: "Aisha Khan · high value", severity: "high" as Severity, kind: "warning" as RecKind },
  { action: "Investigate unusual login", target: "Imran Ali · rooted device", severity: "critical" as Severity, kind: "critical" as RecKind },
  { action: "Block suspicious IP", target: "103.21.•.• · brute force", severity: "high" as Severity, kind: "warning" as RecKind },
  { action: "Notify branch manager", target: "Kanpur branch · UP", severity: "medium" as Severity, kind: "recommendation" as RecKind },
  { action: "Generate investigation report", target: "Weekly SOC digest", severity: "low" as Severity, kind: "information" as RecKind },
];

export const recKindStyles: Record<
  RecKind,
  { border: string; bg: string; icon: string; badge: string; label: string }
> = {
  critical: { border: "border-danger/30", bg: "bg-danger/5", icon: "bg-danger/10 text-danger", badge: "bg-danger/10 text-danger", label: "Critical" },
  warning: { border: "border-warning/30", bg: "bg-warning/5", icon: "bg-warning/10 text-warning", badge: "bg-warning/10 text-warning", label: "Warning" },
  recommendation: { border: "border-success/30", bg: "bg-success/5", icon: "bg-success/10 text-success", badge: "bg-success/10 text-success", label: "Recommendation" },
  information: { border: "border-cyber-blue/30", bg: "bg-cyber-blue/5", icon: "bg-cyber-blue/10 text-cyber-blue", badge: "bg-cyber-blue/10 text-cyber-blue", label: "Information" },
};

export const behaviorTrend = [
  { day: "Mon", normal: 82, anomaly: 12 },
  { day: "Tue", normal: 88, anomaly: 9 },
  { day: "Wed", normal: 79, anomaly: 18 },
  { day: "Thu", normal: 91, anomaly: 7 },
  { day: "Fri", normal: 74, anomaly: 24 },
  { day: "Sat", normal: 85, anomaly: 14 },
  { day: "Sun", normal: 90, anomaly: 8 },
];

export interface ThreatIntel {
  type: string;
  label: string;
  severity: Severity;
  time: string;
}

export const threatIntel: ThreatIntel[] = [
  { type: "Threat Signature", label: "Sig #A7F2 · Banking trojan variant", severity: "high", time: "2m ago" },
  { type: "Zero-Day Alert", label: "CVE-2026-3391 · Auth bypass", severity: "critical", time: "18m ago" },
  { type: "Phishing Campaign", label: "bankofmaha-secure[.]net", severity: "high", time: "34m ago" },
  { type: "Malicious Domain", label: "kyc-update-verify[.]io", severity: "medium", time: "1h ago" },
  { type: "Compromised Device", label: "3 endpoints · branch net", severity: "high", time: "2h ago" },
  { type: "Dark Web Leak", label: "412 credentials exposed", severity: "critical", time: "3h ago" },
];

export const severityStyles: Record<Severity, { text: string; bg: string; dot: string }> = {
  critical: { text: "text-danger", bg: "bg-danger/10", dot: "bg-danger" },
  high: { text: "text-warning", bg: "bg-warning/10", dot: "bg-warning" },
  medium: { text: "text-cyber-cyan", bg: "bg-cyber-cyan/10", dot: "bg-cyber-cyan" },
  low: { text: "text-success", bg: "bg-success/10", dot: "bg-success" },
};