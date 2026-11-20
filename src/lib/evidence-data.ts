import {
  ShieldCheck,
  FileLock2,
  Network,
  BadgeCheck,
  Gauge,
  FolderSearch,
  Banknote,
  Smartphone,
  Globe,
  Activity,
  BrainCircuit,
  FileText,
  Image,
  type LucideIcon,
} from "lucide-react";

export type Risk = "critical" | "high" | "medium" | "low";
export type VerifyState = "Verified" | "Pending" | "Anchoring";

export interface VaultKpi {
  label: string;
  value: number;
  suffix?: string;
  display?: string;
  tone: "cyan" | "blue" | "green" | "amber" | "violet";
}

export const vaultKpis: VaultKpi[] = [
  { label: "Evidence Records", value: 12842, tone: "cyan" },
  { label: "Immutable Records", value: 100, suffix: "%", tone: "green" },
  { label: "Blockchain Status", value: 0, display: "Healthy", tone: "blue" },
  { label: "Verification Success", value: 99.99, suffix: "%", tone: "green" },
  { label: "Compliance Score", value: 100, suffix: "%", tone: "violet" },
  { label: "Active Investigations", value: 42, tone: "amber" },
];

export interface StatusItem {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "green" | "cyan" | "blue" | "amber";
}

export const vaultStatus: StatusItem[] = [
  { label: "Evidence Integrity", value: "Verified", icon: ShieldCheck, tone: "green" },
  { label: "Blockchain Network", value: "Operational", icon: Network, tone: "cyan" },
  { label: "Digital Signatures", value: "Verified", icon: BadgeCheck, tone: "blue" },
  { label: "Last Synchronization", value: "2 minutes ago", icon: Gauge, tone: "amber" },
  { label: "System Status", value: "Protected", icon: FileLock2, tone: "green" },
];

export const kpiIcons: LucideIcon[] = [FolderSearch, FileLock2, Network, BadgeCheck, ShieldCheck, Gauge];

export interface EvidenceRecord {
  id: string;
  caseId: string;
  customer: string;
  type: string;
  risk: Risk;
  hashStatus: "Matched" | "Pending";
  timestamp: string;
  analyst: string;
  verification: VerifyState;
  anchor: string;
  status: "Locked" | "In Review" | "Anchoring";
  incidentId: string;
  transactionId: string;
  customerId: string;
  riskScore: number;
  aiDecision: string;
  hash: string;
  signature: string;
  recordedBy: string;
  block: string;
}

export const evidenceRecords: EvidenceRecord[] = [
  {
    id: "EV-2026-88214",
    caseId: "INC-2026-10421",
    customer: "Neha Gupta",
    type: "Transaction",
    risk: "critical",
    hashStatus: "Matched",
    timestamp: "Today · 02:42 PM",
    analyst: "SOC Administrator",
    verification: "Verified",
    anchor: "0x9f2a…ee34",
    status: "Locked",
    incidentId: "INC-2026-10421",
    transactionId: "TX-90215",
    customerId: "CUST-8842190",
    riskScore: 95,
    aiDecision: "Blocked · Account Takeover",
    hash: "3a7f9c2e18b4d6f0aa21c5390e77b1d2c4e9f8a0b6d3e1f27c95a4b8d0e6f312",
    signature: "SIG-RSA4096 · a7f2-90c1-ee34",
    recordedBy: "SentinelAI Auto-Triage",
    block: "#8,214,993",
  },
  {
    id: "EV-2026-88213",
    caseId: "INC-2026-10420",
    customer: "Karan Singh",
    type: "Device",
    risk: "high",
    hashStatus: "Matched",
    timestamp: "Today · 01:58 PM",
    analyst: "R. Patel",
    verification: "Verified",
    anchor: "0x71c4…a913",
    status: "Locked",
    incidentId: "INC-2026-10420",
    transactionId: "TX-90218",
    customerId: "CUST-7741002",
    riskScore: 88,
    aiDecision: "Verify · Rooted Device",
    hash: "b1d29f0e3c7a4d61f8905ba2c6e34d7f19082be5c4a3d6f0e2917c5b8a4d0e63",
    signature: "SIG-RSA4096 · 71c4-8820-a913",
    recordedBy: "R. Patel",
    block: "#8,214,981",
  },
  {
    id: "EV-2026-88212",
    caseId: "INC-2026-10417",
    customer: "Aisha Khan",
    type: "Network",
    risk: "critical",
    hashStatus: "Matched",
    timestamp: "Today · 12:31 PM",
    analyst: "S. Menon",
    verification: "Verified",
    anchor: "0x33ab…c0f1",
    status: "Locked",
    incidentId: "INC-2026-10417",
    transactionId: "TX-90213",
    customerId: "CUST-5520118",
    riskScore: 91,
    aiDecision: "Blocked · First-time Beneficiary",
    hash: "c4e9f8a0b6d3e1f27c95a4b8d0e6f3123a7f9c2e18b4d6f0aa21c5390e77b1d2",
    signature: "SIG-RSA4096 · 33ab-7712-c0f1",
    recordedBy: "S. Menon",
    block: "#8,214,902",
  },
  {
    id: "EV-2026-88211",
    caseId: "INC-2026-10402",
    customer: "Sana Sheikh",
    type: "Behavior",
    risk: "medium",
    hashStatus: "Matched",
    timestamp: "Today · 11:14 AM",
    analyst: "SOC Administrator",
    verification: "Verified",
    anchor: "0x58dd…4b20",
    status: "In Review",
    incidentId: "INC-2026-10402",
    transactionId: "TX-90217",
    customerId: "CUST-4410093",
    riskScore: 63,
    aiDecision: "Verify · Behavior Drift",
    hash: "e2917c5b8a4d0e63b1d29f0e3c7a4d61f8905ba2c6e34d7f19082be5c4a3d6f0",
    signature: "SIG-RSA4096 · 58dd-1190-4b20",
    recordedBy: "SOC Administrator",
    block: "#8,214,850",
  },
  {
    id: "EV-2026-88210",
    caseId: "INC-2026-10388",
    customer: "Manish Jain",
    type: "AI Analysis",
    risk: "high",
    hashStatus: "Matched",
    timestamp: "Today · 10:02 AM",
    analyst: "A. Verma",
    verification: "Verified",
    anchor: "0xac91…7d3e",
    status: "Locked",
    incidentId: "INC-2026-10388",
    transactionId: "TX-90220",
    customerId: "CUST-3390221",
    riskScore: 79,
    aiDecision: "Verify · SIM Swap Risk",
    hash: "19082be5c4a3d6f0e2917c5b8a4d0e63b1d29f0e3c7a4d61f8905ba2c6e34d7f",
    signature: "SIG-RSA4096 · ac91-6640-7d3e",
    recordedBy: "A. Verma",
    block: "#8,214,777",
  },
  {
    id: "EV-2026-88209",
    caseId: "INC-2026-10371",
    customer: "Rohan Mehta",
    type: "Document",
    risk: "low",
    hashStatus: "Matched",
    timestamp: "Yesterday · 06:41 PM",
    analyst: "S. Menon",
    verification: "Verified",
    anchor: "0x1f80…9ab2",
    status: "Locked",
    incidentId: "INC-2026-10371",
    transactionId: "TX-90212",
    customerId: "CUST-2201884",
    riskScore: 12,
    aiDecision: "Allow · KYC Verified",
    hash: "f8905ba2c6e34d7f19082be5c4a3d6f0e2917c5b8a4d0e63b1d29f0e3c7a4d61",
    signature: "SIG-RSA4096 · 1f80-5510-9ab2",
    recordedBy: "S. Menon",
    block: "#8,214,610",
  },
  {
    id: "EV-2026-88208",
    caseId: "INC-2026-10366",
    customer: "Divya Iyer",
    type: "Transaction",
    risk: "medium",
    hashStatus: "Pending",
    timestamp: "Yesterday · 04:19 PM",
    analyst: "R. Patel",
    verification: "Anchoring",
    anchor: "pending",
    status: "Anchoring",
    incidentId: "INC-2026-10366",
    transactionId: "TX-90219",
    customerId: "CUST-1980552",
    riskScore: 57,
    aiDecision: "Verify · Velocity Anomaly",
    hash: "0e2917c5b8a4d0e63b1d29f0e3c7a4d61f8905ba2c6e34d7f19082be5c4a3d6f",
    signature: "SIG-RSA4096 · pending",
    recordedBy: "R. Patel",
    block: "queued",
  },
];

export const riskLevels: Risk[] = ["critical", "high", "medium", "low"];
export const evidenceTypes = ["Transaction", "Device", "Network", "Behavior", "AI Analysis", "Document"];

export interface CustodyStep {
  label: string;
  officer: string;
  time: string;
  signature: string;
  status: "done" | "active";
}

export const chainOfCustody: CustodyStep[] = [
  { label: "Evidence Created", officer: "SentinelAI Auto-Triage", time: "02:42:03 PM", signature: "SIG-a7f2", status: "done" },
  { label: "AI Analysis Completed", officer: "SentinelAI Engine", time: "02:42:18 PM", signature: "SIG-90c1", status: "done" },
  { label: "Analyst Review", officer: "SOC Administrator", time: "02:45:51 PM", signature: "SIG-ee34", status: "done" },
  { label: "Manager Approval", officer: "R. Patel · Fraud Lead", time: "02:51:07 PM", signature: "SIG-4b20", status: "done" },
  { label: "Blockchain Anchored", officer: "Vault Ledger Service", time: "02:51:44 PM", signature: "SIG-c0f1", status: "done" },
  { label: "Evidence Locked", officer: "Vault Ledger Service", time: "02:51:45 PM", signature: "SIG-7d3e", status: "done" },
  { label: "Compliance Verified", officer: "Audit Automation", time: "02:52:10 PM", signature: "SIG-9ab2", status: "active" },
];

export interface ViewerTab {
  id: string;
  label: string;
  icon: LucideIcon;
  summary: string;
  meta: { label: string; value: string }[];
}

export const viewerTabs: ViewerTab[] = [
  {
    id: "transaction",
    label: "Transaction Evidence",
    icon: Banknote,
    summary: "UPI transfer of ₹95,000 to a first-time beneficiary, blocked by SentinelAI.",
    meta: [
      { label: "Amount", value: "₹95,000" },
      { label: "Channel", value: "UPI" },
      { label: "Beneficiary", value: "New / Untrusted" },
      { label: "Decision", value: "Blocked" },
    ],
  },
  {
    id: "device",
    label: "Device Evidence",
    icon: Smartphone,
    summary: "Session from an unrecognized rooted Android device failing app integrity checks.",
    meta: [
      { label: "OS", value: "Android 14" },
      { label: "Fingerprint", value: "a7f2-90c1-ee34" },
      { label: "Root", value: "Detected" },
      { label: "Integrity", value: "Failed" },
    ],
  },
  {
    id: "network",
    label: "Network Evidence",
    icon: Globe,
    summary: "Traffic routed through a commercial VPN exit node masking true origin.",
    meta: [
      { label: "IP", value: "103.21.•.•" },
      { label: "Exit Node", value: "Amsterdam, NL" },
      { label: "VPN", value: "Active" },
      { label: "ASN", value: "AS-14061" },
    ],
  },
  {
    id: "behavior",
    label: "Behavior Evidence",
    icon: Activity,
    summary: "Typing cadence and navigation pattern diverge sharply from the customer baseline.",
    meta: [
      { label: "Consistency", value: "61%" },
      { label: "Cadence", value: "Anomalous" },
      { label: "Session", value: "Scripted-like" },
      { label: "Baseline", value: "90-day" },
    ],
  },
  {
    id: "ai",
    label: "AI Analysis",
    icon: BrainCircuit,
    summary: "Correlated telemetry indicates a coordinated Account Takeover with evasion techniques.",
    meta: [
      { label: "Verdict", value: "Account Takeover" },
      { label: "Confidence", value: "98%" },
      { label: "Risk Score", value: "95 / 100" },
      { label: "Model", value: "Sentinel-XAI v4" },
    ],
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    summary: "Forensic reports, KYC snapshots and network traces attached to this case.",
    meta: [
      { label: "Files", value: "6" },
      { label: "Total Size", value: "7.1 MB" },
      { label: "Format", value: "PDF · JSON · PCAP" },
      { label: "Signed", value: "Yes" },
    ],
  },
  {
    id: "screenshots",
    label: "Screenshots",
    icon: Image,
    summary: "Captured session frames at the moment of the high-value transfer attempt.",
    meta: [
      { label: "Captures", value: "4" },
      { label: "Resolution", value: "1080p" },
      { label: "Hashed", value: "Yes" },
      { label: "Redacted", value: "PII masked" },
    ],
  },
];

export interface IntegrityCheck {
  label: string;
  value: string;
  ok: boolean;
}

export const integrityChecks: IntegrityCheck[] = [
  { label: "Hash Match", value: "Verified", ok: true },
  { label: "Digital Signature", value: "Valid", ok: true },
  { label: "Timestamp Integrity", value: "Verified", ok: true },
  { label: "Chain Status", value: "Immutable", ok: true },
  { label: "Evidence Modified", value: "No", ok: true },
  { label: "Verification Score", value: "100%", ok: true },
];

export const blockchainFlow = [
  "Incident",
  "Evidence Package",
  "SHA-256 Hash",
  "Digital Signature",
  "Blockchain Anchor",
  "Verification",
  "Audit Trail",
];

export interface ComplianceCard {
  name: string;
  description: string;
  score: number;
  status: string;
}

export const complianceCards: ComplianceCard[] = [
  { name: "RBI Cyber Security Framework", description: "Baseline controls for scheduled commercial banks.", score: 100, status: "Compliant" },
  { name: "PCI-DSS", description: "Payment card data protection standard v4.0.", score: 100, status: "Compliant" },
  { name: "ISO 27001", description: "Information security management system.", score: 99, status: "Certified" },
  { name: "CERT-In", description: "Incident reporting within 6-hour mandate.", score: 100, status: "Audit Ready" },
  { name: "DPDP Compliance", description: "Digital Personal Data Protection Act, 2023.", score: 98, status: "Compliant" },
  { name: "Audit Ready", description: "Immutable evidence available for on-demand audit.", score: 100, status: "Ready" },
];

export interface AuditStat {
  label: string;
  value: string;
  tone: "cyan" | "green" | "amber" | "blue" | "violet";
}

export const auditStats: AuditStat[] = [
  { label: "Evidence Generated", value: "12,842", tone: "cyan" },
  { label: "Evidence Verified", value: "12,839", tone: "green" },
  { label: "Pending Reviews", value: "3", tone: "amber" },
  { label: "Locked Cases", value: "11,904", tone: "blue" },
  { label: "Compliance Status", value: "100%", tone: "green" },
  { label: "Audit Readiness", value: "Ready", tone: "violet" },
];

export const exportActions = [
  "Generate RBI Audit Report",
  "Export Evidence Package",
  "Download Investigation PDF",
  "Generate Compliance Report",
  "Export Chain of Custody",
  "Executive Summary",
];

export const forensicItems = [
  "Incident Summary",
  "AI Decision",
  "Evidence List",
  "Timeline",
  "Risk Factors",
  "Device Details",
  "Behavior Analysis",
  "Compliance Checklist",
  "Digital Signatures",
];

export interface AuditLogEntry {
  action: string;
  user: string;
  time: string;
  status: "Success" | "Approved" | "Anchored";
}

export const auditLog: AuditLogEntry[] = [
  { action: "Evidence Uploaded", user: "SentinelAI Auto-Triage", time: "02:42:03 PM", status: "Success" },
  { action: "AI Analysis Recorded", user: "SentinelAI Engine", time: "02:42:18 PM", status: "Success" },
  { action: "Analyst Viewed", user: "SOC Administrator", time: "02:45:51 PM", status: "Success" },
  { action: "Manager Approved", user: "R. Patel", time: "02:51:07 PM", status: "Approved" },
  { action: "Blockchain Anchored", user: "Vault Ledger Service", time: "02:51:44 PM", status: "Anchored" },
  { action: "Report Generated", user: "Audit Automation", time: "02:52:10 PM", status: "Success" },
];

export interface AssistantQA {
  q: string;
  a: string;
}

export const assistantQA: AssistantQA[] = [
  {
    q: "Generate RBI audit report",
    a: "The RBI Cyber Security Framework audit report for case INC-2026-10421 is ready. All 27 evidence records are immutable and verified, with a 100% compliance score. The report includes incident summary, AI decision rationale, chain of custody and digital signatures — packaged for RBI submission within the reporting window.",
  },
  {
    q: "Summarize investigation",
    a: "Case INC-2026-10421 is an Account Takeover attempt on customer Neha Gupta. A ₹95,000 UPI transfer to a first-time beneficiary was blocked after correlating device change, VPN usage, impossible travel and behavioral drift. Risk score 95/100 with 98% confidence. All evidence is anchored and locked.",
  },
  {
    q: "Verify evidence integrity",
    a: "Integrity check complete. Hash match: Verified. Digital signature: Valid. Timestamp integrity: Verified. Chain status: Immutable. No modifications detected. Overall verification score is 100% — the evidence is admissible and tamper-proof.",
  },
  {
    q: "Show chain of custody",
    a: "Chain of custody for EV-2026-88214: Created by Auto-Triage → AI Analysis → Analyst Review (SOC Admin) → Manager Approval (R. Patel) → Blockchain Anchored → Evidence Locked → Compliance Verified. Every step is timestamped and digitally signed.",
  },
  {
    q: "Generate compliance checklist",
    a: "Compliance checklist generated: RBI Framework ✓, PCI-DSS ✓, ISO 27001 ✓, CERT-In 6-hour reporting ✓, DPDP data handling ✓. All controls satisfied. The case is audit-ready with no outstanding remediation items.",
  },
  {
    q: "Prepare executive summary",
    a: "Executive summary: SentinelAI prevented a ₹95,000 fraudulent transfer via real-time behavioral correlation. Evidence is immutably stored and compliance stands at 100%. Estimated fraud prevented this month: ₹18.4 L across 42 active investigations, with full audit readiness.",
  },
];