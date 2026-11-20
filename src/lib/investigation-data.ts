import {
  LogIn,
  ShieldOff,
  Smartphone,
  Activity,
  Banknote,
  Ban,
  KeyRound,
  MapPin,
  Wifi,
  Plane,
  TrendingUp,
  Repeat,
  type LucideIcon,
} from "lucide-react";

import type { Severity } from "@/lib/soc-data";

export const investigationCase = {
  id: "INC-2026-10421",
  status: "Critical" as Severity | "Critical",
  priority: "P1",
  riskScore: 95,
  confidence: 98,
  phase: "Investigation In Progress",
  owner: "SOC Administrator",
  createdDate: "Today",
  createdTime: "02:42 PM",
  analyst: "SOC Administrator",
  sla: "3h 12m",
  evidenceCount: 27,
  documents: 6,
  relatedCases: 4,
};

export interface SummaryItem {
  label: string;
  value: string;
  tone?: "danger" | "warning" | "success" | "cyan" | "default";
}

export const incidentSummary: SummaryItem[] = [
  { label: "Threat Category", value: "Account Takeover", tone: "danger" },
  { label: "Financial Impact", value: "₹95,000", tone: "warning" },
  { label: "Attack Stage", value: "Execution", tone: "danger" },
  { label: "Affected Services", value: "UPI", tone: "cyan" },
  { label: "Customer Trust Score", value: "61%", tone: "warning" },
  { label: "Overall Security Status", value: "Critical", tone: "danger" },
];

export interface QuickTimelineNode {
  label: string;
  time: string;
  severity: Severity;
  icon: LucideIcon;
}

export const quickTimeline: QuickTimelineNode[] = [
  { label: "Login Success", time: "02:31 PM", severity: "low", icon: LogIn },
  { label: "VPN Connected", time: "02:32 PM", severity: "medium", icon: ShieldOff },
  { label: "Device Changed", time: "02:37 PM", severity: "critical", icon: Smartphone },
  { label: "Behavior Changed", time: "02:38 PM", severity: "high", icon: Activity },
  { label: "High Value Transfer", time: "02:39 PM", severity: "critical", icon: Banknote },
  { label: "Blocked", time: "02:40 PM", severity: "critical", icon: Ban },
];

export const immediateRecommendations = [
  { action: "Freeze Transaction", severity: "critical" as Severity },
  { action: "Verify Identity", severity: "high" as Severity },
  { action: "Block Device", severity: "critical" as Severity },
  { action: "Notify Customer", severity: "medium" as Severity },
  { action: "Escalate To Fraud Team", severity: "high" as Severity },
  { action: "Generate Audit Report", severity: "low" as Severity },
];

export const aiSummary = [
  "The AI engine correlated transaction telemetry, login behavior, device fingerprint, network intelligence and historical customer activity across the last 90 days.",
  "The transaction originated from a previously unseen device located approximately 780 km away from the customer's normal operating region in Mumbai.",
  "Multiple failed login attempts occurred before successful authentication, followed by an immediate password reset — a classic account takeover sequence.",
  "The current device is connected through a commercial VPN exit node, masking the true origin of the session.",
  "The transaction amount is 24x higher than the customer's average spending and was directed to a first-time beneficiary.",
  "Behavioral confidence strongly indicates an Account Takeover attempt with coordinated evasion techniques.",
];

export interface RiskFactor {
  title: string;
  severity: Severity;
  description: string;
  impact: string;
  confidence: number;
  icon: LucideIcon;
}

export const riskFactors: RiskFactor[] = [
  { title: "Device Changed", severity: "critical", description: "Session from an unrecognized device fingerprint.", impact: "Bypasses trusted-device controls.", confidence: 97, icon: Smartphone },
  { title: "Location Changed", severity: "high", description: "Origin 780 km outside usual region.", impact: "Geo-anomaly against baseline.", confidence: 93, icon: MapPin },
  { title: "VPN Enabled", severity: "high", description: "Commercial VPN exit node detected.", impact: "Obscures true attacker location.", confidence: 88, icon: Wifi },
  { title: "Impossible Travel", severity: "critical", description: "Mumbai → Delhi in under 9 minutes.", impact: "Physically impossible session.", confidence: 96, icon: Plane },
  { title: "Behavior Drift", severity: "high", description: "Typing cadence & navigation anomaly.", impact: "Does not match customer profile.", confidence: 91, icon: Activity },
  { title: "Large Transaction", severity: "critical", description: "24x above average spend.", impact: "High financial exposure.", confidence: 98, icon: TrendingUp },
  { title: "Failed Login", severity: "medium", description: "5 failed attempts before success.", impact: "Credential-stuffing indicator.", confidence: 84, icon: KeyRound },
  { title: "SIM Swap Risk", severity: "high", description: "Recent carrier port event flagged.", impact: "OTP interception possible.", confidence: 79, icon: Repeat },
];

export const identityIntel: SummaryItem[] = [
  { label: "Customer Name", value: "Neha Gupta" },
  { label: "Customer ID", value: "CUST-8842190" },
  { label: "Masked Account", value: "•••• •••• 4821" },
  { label: "Phone", value: "+91 ••••• •7734" },
  { label: "Email", value: "n•••a@gmail.com" },
  { label: "KYC", value: "Verified", tone: "success" },
  { label: "Relationship Since", value: "Mar 2016" },
  { label: "Customer Segment", value: "Priority Banking", tone: "cyan" },
  { label: "VIP Status", value: "Gold", tone: "warning" },
  { label: "Current Balance", value: "₹12,40,500" },
];

export const behaviorIntel: SummaryItem[] = [
  { label: "Average Daily Spend", value: "₹3,950" },
  { label: "Preferred Payment Method", value: "UPI" },
  { label: "Usual Transaction Hours", value: "9 AM – 8 PM" },
  { label: "Frequent Locations", value: "Mumbai, Pune" },
  { label: "Trusted Devices", value: "iPhone 14, MacBook" },
  { label: "Behavior Consistency Score", value: "61%", tone: "warning" },
];

export const spendingHistory = [
  { day: "Mon", amount: 3200 },
  { day: "Tue", amount: 4100 },
  { day: "Wed", amount: 2800 },
  { day: "Thu", amount: 5200 },
  { day: "Fri", amount: 3600 },
  { day: "Sat", amount: 4800 },
  { day: "Sun", amount: 95000 },
];

export const endpointIntel: SummaryItem[] = [
  { label: "Operating System", value: "Android 14" },
  { label: "Browser", value: "Chrome Mobile 122" },
  { label: "IP Address", value: "103.21.•.•" },
  { label: "Device Fingerprint", value: "a7f2-90c1-ee34" },
  { label: "VPN Status", value: "Active", tone: "danger" },
  { label: "Root Detection", value: "Detected", tone: "danger" },
  { label: "Jailbreak Detection", value: "N/A" },
  { label: "Battery Health", value: "82%" },
  { label: "App Integrity", value: "Failed", tone: "danger" },
  { label: "Last Seen", value: "02:39 PM" },
];

export const geoIntel = {
  current: "Delhi, DL",
  previous: "Mumbai, MH",
  distance: "780 km",
  expectedTravel: "~2h 10m (flight)",
  impossibleTravel: true,
};

export interface EvidenceEvent {
  time: string;
  title: string;
  severity: Severity | "resolved";
  icon: LucideIcon;
  details: string;
  meta: { label: string; value: string }[];
}

export const evidenceEvents: EvidenceEvent[] = [
  {
    time: "02:31 PM",
    title: "Successful Login",
    severity: "low",
    icon: LogIn,
    details: "Customer authenticated successfully after multiple failed attempts.",
    meta: [
      { label: "Method", value: "Password + OTP" },
      { label: "IP", value: "103.21.•.•" },
      { label: "Device", value: "Unknown Android" },
    ],
  },
  {
    time: "02:32 PM",
    title: "VPN Activated",
    severity: "medium",
    icon: ShieldOff,
    details: "Session routed through a commercial VPN exit node in Amsterdam.",
    meta: [
      { label: "Provider", value: "NordVPN (commercial)" },
      { label: "Exit Node", value: "Amsterdam, NL" },
    ],
  },
  {
    time: "02:34 PM",
    title: "Five Failed Login Attempts",
    severity: "high",
    icon: KeyRound,
    details: "Repeated authentication failures consistent with credential stuffing.",
    meta: [
      { label: "Attempts", value: "5" },
      { label: "Window", value: "48 seconds" },
    ],
  },
  {
    time: "02:35 PM",
    title: "Password Reset",
    severity: "critical",
    icon: Repeat,
    details: "Account password reset immediately after login — takeover indicator.",
    meta: [
      { label: "Channel", value: "SMS OTP" },
      { label: "SIM Age", value: "3 days" },
    ],
  },
  {
    time: "02:37 PM",
    title: "Device Changed",
    severity: "critical",
    icon: Smartphone,
    details: "Session moved to a rooted device failing app integrity checks.",
    meta: [
      { label: "Fingerprint", value: "a7f2-90c1-ee34" },
      { label: "Root", value: "Detected" },
    ],
  },
  {
    time: "02:39 PM",
    title: "High Value Transfer",
    severity: "critical",
    icon: Banknote,
    details: "UPI transfer of ₹95,000 to a first-time beneficiary initiated.",
    meta: [
      { label: "Amount", value: "₹95,000" },
      { label: "Beneficiary", value: "New / Untrusted" },
    ],
  },
  {
    time: "02:40 PM",
    title: "Transaction Blocked",
    severity: "resolved",
    icon: Ban,
    details: "SentinelAI auto-blocked the transaction and froze the session.",
    meta: [
      { label: "Action", value: "Auto-block" },
      { label: "Decision", value: "Blocked" },
    ],
  },
];

export interface AnalystAction {
  label: string;
  description: string;
  tone: "danger" | "warning" | "success" | "cyan" | "default";
  icon: LucideIcon;
}

export const analystActions: AnalystAction[] = [
  { label: "Approve Transaction", description: "Release the held transaction and mark it as legitimate.", tone: "success", icon: Banknote },
  { label: "Temporarily Hold", description: "Keep the transaction on hold pending further review.", tone: "warning", icon: Activity },
  { label: "Block Transaction", description: "Permanently block this transaction from processing.", tone: "danger", icon: Ban },
  { label: "Freeze Account", description: "Freeze all activity on the customer's account.", tone: "danger", icon: ShieldOff },
  { label: "Lock Device", description: "Revoke and lock the offending device fingerprint.", tone: "danger", icon: Smartphone },
  { label: "Initiate Face Verification", description: "Trigger a step-up biometric verification.", tone: "cyan", icon: KeyRound },
  { label: "Notify Customer", description: "Send a secure alert to the customer's verified channel.", tone: "cyan", icon: Smartphone },
  { label: "Notify Branch", description: "Alert the home branch relationship manager.", tone: "cyan", icon: MapPin },
  { label: "Generate Investigation Report", description: "Compile a full forensic PDF report of this case.", tone: "default", icon: TrendingUp },
  { label: "Assign To Fraud Team", description: "Route the case to the specialized fraud unit.", tone: "warning", icon: Repeat },
  { label: "Escalate To Level 2", description: "Escalate the investigation to a senior analyst.", tone: "warning", icon: Plane },
  { label: "Close Investigation", description: "Close and archive this investigation case.", tone: "default", icon: Ban },
];

export const activityLog = [
  { time: "02:42 PM", text: "Case created by SentinelAI auto-triage", who: "System" },
  { time: "02:43 PM", text: "Assigned to SOC Administrator", who: "System" },
  { time: "02:45 PM", text: "Transaction placed on hold", who: "SOC Administrator" },
  { time: "02:48 PM", text: "Requested device forensics", who: "SOC Administrator" },
  { time: "02:52 PM", text: "AI reasoning summary reviewed", who: "SOC Administrator" },
];

export const relatedCases = [
  { id: "INC-2026-10388", title: "SIM swap · same carrier", severity: "high" as Severity },
  { id: "INC-2026-10402", title: "VPN cluster · 103.21.•.•", severity: "medium" as Severity },
  { id: "INC-2026-10417", title: "First-time beneficiary fraud", severity: "critical" as Severity },
  { id: "INC-2026-10420", title: "Rooted device network", severity: "high" as Severity },
];

export const caseNotes = [
  { who: "SOC Administrator", time: "02:50 PM", text: "Device fingerprint matches earlier flagged rooted cluster. Recommend full account freeze." },
  { who: "R. Patel", time: "02:55 PM", text: "Customer unreachable on primary number — possible SIM swap in progress." },
];

export const caseDocuments = [
  { name: "Forensic_Telemetry.json", size: "412 KB" },
  { name: "Device_Report.pdf", size: "1.2 MB" },
  { name: "Network_Trace.pcap", size: "3.8 MB" },
  { name: "AI_Reasoning.txt", size: "18 KB" },
  { name: "Customer_Baseline.csv", size: "96 KB" },
  { name: "KYC_Snapshot.pdf", size: "740 KB" },
];