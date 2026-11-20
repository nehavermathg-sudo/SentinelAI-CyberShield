export type RiskTone = "cyan" | "blue" | "green" | "amber" | "red" | "violet";

export interface PredictiveKpi {
  label: string;
  value: number;
  suffix?: string;
  display?: string;
  tone: RiskTone;
}

export const predictiveKpis: PredictiveKpi[] = [
  { label: "Predicted Fraud Today", value: 48, tone: "red" },
  { label: "Attack Prevention Rate", value: 94, suffix: "%", tone: "green" },
  { label: "Estimated Money Saved", value: 0, display: "₹18.4 L", tone: "cyan" },
  { label: "Prediction Accuracy", value: 97.8, suffix: "%", tone: "blue" },
  { label: "Customers Monitored", value: 1284, tone: "violet" },
  { label: "High Risk Customers", value: 29, tone: "amber" },
];

export const forecast = {
  expectedAttempts: 52,
  highestRiskRegion: "Maharashtra · Mumbai Metro",
  vulnerableCustomers: "312 accounts (dormant + new device)",
  likelyAttackMethod: "Account Takeover via SIM Swap",
  expectedImpact: "₹24.6 Lakhs",
  confidence: 96,
};

export type Period = "Morning" | "Afternoon" | "Evening" | "Night";

export interface ForecastSlot {
  period: Period;
  window: string;
  threats: { name: string; level: RiskTone; likelihood: number }[];
}

export const attackTimeline: ForecastSlot[] = [
  {
    period: "Morning",
    window: "06:00 – 12:00",
    threats: [
      { name: "Phishing", level: "amber", likelihood: 62 },
      { name: "Credential Stuffing", level: "amber", likelihood: 48 },
    ],
  },
  {
    period: "Afternoon",
    window: "12:00 – 17:00",
    threats: [
      { name: "Card Fraud", level: "amber", likelihood: 55 },
      { name: "UPI Fraud", level: "red", likelihood: 71 },
    ],
  },
  {
    period: "Evening",
    window: "17:00 – 22:00",
    threats: [
      { name: "Account Takeover", level: "red", likelihood: 88 },
      { name: "Social Engineering", level: "red", likelihood: 74 },
    ],
  },
  {
    period: "Night",
    window: "22:00 – 06:00",
    threats: [
      { name: "SIM Swap", level: "red", likelihood: 79 },
      { name: "Credential Stuffing", level: "amber", likelihood: 51 },
    ],
  },
];

export interface CopilotSuggestion {
  q: string;
  a: string;
}

export const copilotSuggestions: CopilotSuggestion[] = [
  {
    q: "Summarize today's security posture.",
    a: "Overall posture is STABLE with elevated evening risk. 48 fraud attempts predicted today, 94% expected to be auto-prevented. High-risk cohort concentrated in Mumbai metro (312 accounts). Behavioral drift remains below threshold for 92% of monitored customers. No active critical incidents; 3 medium cases under investigation.",
  },
  {
    q: "Why was transaction TXN-20481 blocked?",
    a: "TXN-20481 (₹1,84,500 UPI transfer) was blocked by 4 correlated signals: (1) new device fingerprint, (2) impossible travel — login from Pune 8 min after Mumbai session, (3) VPN egress node, (4) beneficiary added <2 min prior. Composite risk score 91/100 exceeded the auto-block threshold of 80.",
  },
  {
    q: "Which customers are at highest risk?",
    a: "Top 3 by predicted risk: Rohan Deshmukh (Trust 41, ATO likely, 92%), Anita Kulkarni (Trust 47, SIM Swap, 88%), Vikram Rao (Trust 52, Card Fraud, 81%). All three show rapid device-fingerprint changes and unusual after-hours access. Recommend step-up authentication.",
  },
  {
    q: "Show suspicious VPN activity.",
    a: "14 sessions in the last 6h routed through known VPN/anonymizer egress nodes. 6 correlated with high-value transaction attempts. Clusters: Netherlands (5), Singapore (4), unidentified (5). Recommend enforcing enhanced verification on VPN-originating high-value transfers.",
  },
  {
    q: "Predict next fraud attack.",
    a: "Highest-probability next event: Account Takeover via SIM Swap during evening banking hours (17:00–22:00), targeting dormant-then-active accounts. Confidence 96%. Estimated financial exposure ₹24.6 Lakhs across 312 vulnerable customers.",
  },
  {
    q: "Explain attack graph.",
    a: "The current attack graph links a compromised credential set → VPN egress → new device enrollment → beneficiary injection → high-value UPI transfer. SentinelAI correlated these 5 telemetry events across 11 minutes, propagating risk from 32 to 91 and triggering automated containment.",
  },
  {
    q: "Recommend mitigation.",
    a: "Recommended actions: (1) Enable step-up authentication for accounts with device-fingerprint drift, (2) enforce geo-verification on VPN-originating transfers, (3) temporarily monitor the 29 high-risk accounts, (4) launch a customer awareness push on SIM-swap fraud. Projected residual risk reduction: 61%.",
  },
  {
    q: "Generate executive report.",
    a: "Executive summary drafted: Fraud prevention rate 94%, estimated ₹18.4 L saved today, prediction accuracy 97.8%. 1,284 customers monitored, 29 flagged high-risk. Compliance status: FULLY COMPLIANT (RBI, PCI-DSS). Full PDF available via the Export panel.",
  },
];

export interface StateRisk {
  state: string;
  code: string;
  level: "high" | "medium" | "low";
  density: number;
  growth: number;
  predicted: number;
  x: number;
  y: number;
}

export const stateRisks: StateRisk[] = [
  { state: "Maharashtra", code: "MH", level: "high", density: 88, growth: 22, predicted: 14, x: 34, y: 58 },
  { state: "Delhi NCR", code: "DL", level: "high", density: 81, growth: 18, predicted: 11, x: 40, y: 30 },
  { state: "Karnataka", code: "KA", level: "medium", density: 63, growth: 12, predicted: 7, x: 37, y: 74 },
  { state: "Tamil Nadu", code: "TN", level: "medium", density: 58, growth: 9, predicted: 6, x: 44, y: 84 },
  { state: "Gujarat", code: "GJ", level: "medium", density: 55, growth: 14, predicted: 5, x: 24, y: 50 },
  { state: "West Bengal", code: "WB", level: "high", density: 74, growth: 20, predicted: 9, x: 62, y: 52 },
  { state: "Telangana", code: "TG", level: "medium", density: 51, growth: 8, predicted: 4, x: 41, y: 68 },
  { state: "Rajasthan", code: "RJ", level: "low", density: 32, growth: 4, predicted: 2, x: 30, y: 40 },
  { state: "Kerala", code: "KL", level: "low", density: 28, growth: 3, predicted: 2, x: 36, y: 90 },
  { state: "Punjab", code: "PB", level: "low", density: 30, growth: 5, predicted: 2, x: 33, y: 24 },
  { state: "Uttar Pradesh", code: "UP", level: "medium", density: 60, growth: 15, predicted: 8, x: 48, y: 38 },
  { state: "Assam", code: "AS", level: "low", density: 26, growth: 6, predicted: 1, x: 74, y: 40 },
];

export interface WatchlistRow {
  customer: string;
  id: string;
  trust: number;
  risk: number;
  attack: string;
  confidence: number;
  action: string;
  priority: "Critical" | "High" | "Medium";
}

export const watchlist: WatchlistRow[] = [
  { customer: "Rohan Deshmukh", id: "CUS-88213", trust: 41, risk: 92, attack: "Account Takeover", confidence: 94, action: "Step-up Auth", priority: "Critical" },
  { customer: "Anita Kulkarni", id: "CUS-77410", trust: 47, risk: 88, attack: "SIM Swap", confidence: 88, action: "Freeze & Verify", priority: "Critical" },
  { customer: "Vikram Rao", id: "CUS-65029", trust: 52, risk: 81, attack: "Card Fraud", confidence: 81, action: "Block Device", priority: "High" },
  { customer: "Sneha Patil", id: "CUS-90188", trust: 58, risk: 74, attack: "Phishing", confidence: 76, action: "Awareness Alert", priority: "High" },
  { customer: "Arjun Mehta", id: "CUS-51277", trust: 61, risk: 68, attack: "UPI Fraud", confidence: 71, action: "Monitor", priority: "Medium" },
  { customer: "Priya Nair", id: "CUS-43910", trust: 64, risk: 61, attack: "Social Engineering", confidence: 66, action: "Geo Verify", priority: "Medium" },
];

export interface SimSignal {
  id: string;
  label: string;
  delta: number; // positive = increases risk when toggled OFF from default; handled in component
  protective: boolean; // protective control (on reduces risk)
  defaultOn: boolean;
}

export const simSignals: SimSignal[] = [
  { id: "mfa", label: "MFA", delta: 21, protective: true, defaultOn: true },
  { id: "vpn", label: "VPN Detection", delta: 15, protective: true, defaultOn: true },
  { id: "device", label: "Device Intelligence", delta: 18, protective: true, defaultOn: true },
  { id: "face", label: "Face Verification", delta: 12, protective: true, defaultOn: false },
  { id: "stepup", label: "Step-up Authentication", delta: 14, protective: true, defaultOn: false },
];

export const insights = [
  "Based on behavioral telemetry, SentinelAI predicts a significant increase in account takeover attempts during evening banking hours.",
  "Customers using unfamiliar devices after midnight demonstrate a 4.7x higher fraud probability.",
  "Current behavioral drift remains below operational threshold for 92% of monitored accounts.",
  "AI recommends enhanced verification for customers with rapidly changing device fingerprints.",
];

export const businessImpact: PredictiveKpi[] = [
  { label: "Estimated Fraud Prevented", value: 0, display: "₹2.1 Cr", tone: "green" },
  { label: "Money Saved (30d)", value: 0, display: "₹1.8 Cr", tone: "cyan" },
  { label: "Operational Efficiency", value: 42, suffix: "%", tone: "blue" },
  { label: "Cases Automated", value: 1360, tone: "violet" },
  { label: "Manual Investigations Reduced", value: 63, suffix: "%", tone: "amber" },
  { label: "Customer Trust Improvement", value: 18, suffix: "%", tone: "green" },
];

export interface ExecMetric {
  label: string;
  value: number;
  status: string;
  tone: RiskTone;
}

export const execMetrics: ExecMetric[] = [
  { label: "Security Posture", value: 91, status: "Strong", tone: "green" },
  { label: "Risk Trend", value: 68, status: "Rising", tone: "amber" },
  { label: "Operational Readiness", value: 96, status: "Ready", tone: "cyan" },
  { label: "Fraud Prevention Score", value: 94, status: "Excellent", tone: "green" },
  { label: "Compliance Status", value: 100, status: "Compliant", tone: "blue" },
];

export interface Recommendation {
  title: string;
  detail: string;
  impact: string;
  tone: RiskTone;
}

export const recommendations: Recommendation[] = [
  { title: "Increase MFA Coverage", detail: "Enforce MFA for 214 accounts lacking secondary factor.", impact: "-21% risk", tone: "cyan" },
  { title: "Block Risky Devices", detail: "Quarantine 38 devices with anomalous fingerprints.", impact: "-18% risk", tone: "red" },
  { title: "Enable Geo Verification", detail: "Apply to VPN-originating high-value transfers.", impact: "-15% risk", tone: "blue" },
  { title: "Customer Awareness Campaign", detail: "Target SIM-swap fraud education to Mumbai metro.", impact: "-9% risk", tone: "amber" },
  { title: "Fraud Team Investigation", detail: "Escalate 3 medium cases with correlated telemetry.", impact: "priority", tone: "violet" },
  { title: "Temporary Account Monitoring", detail: "Watch the 29 high-risk accounts for 72 hours.", impact: "-12% risk", tone: "green" },
];

export const aiStatus = {
  modelsRunning: 7,
  predictionAccuracy: 97.8,
  behaviorModels: 4,
  threatModels: 3,
  latestUpdate: "12 sec ago",
  systemHealth: 99,
};