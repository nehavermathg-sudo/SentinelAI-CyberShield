import {
  CreditCard,
  Smartphone,
  MapPin,
  LogIn,
  Network,
  Store,
  Clock,
  ShieldAlert,
  Activity,
  type LucideIcon,
} from "lucide-react";

import type { Severity } from "@/lib/soc-data";

export interface DnaSummary {
  label: string;
  value: number;
  suffix?: string;
  display?: string;
  note: string;
  tone: "cyan" | "blue" | "green" | "amber" | "violet";
}

export const dnaSummary: DnaSummary[] = [
  { label: "Trust Score", value: 92, suffix: "%", note: "Excellent standing", tone: "cyan" },
  { label: "Behavior Consistency", value: 96, suffix: "%", note: "Highly consistent", tone: "green" },
  { label: "Identity Confidence", value: 98, suffix: "%", note: "AI verified", tone: "blue" },
  { label: "Attack Exposure", value: 8, display: "Low", note: "Minimal surface", tone: "violet" },
  { label: "Behavior Drift", value: 2, suffix: "%", note: "Very stable", tone: "amber" },
];

export const digitalIdentity = {
  customer: "Shivam Gupta",
  customerId: "CID-204781",
  relationshipSince: "2023",
  trustedDevices: 4,
  trustedLocations: 6,
  preferredPayment: "UPI",
  behaviorStatus: "Stable",
  aiIdentity: "Verified",
};

export interface DnaNode {
  label: string;
  progress: number;
  status: string;
  icon: LucideIcon;
  tone: "cyan" | "blue" | "green" | "amber" | "violet" | "red";
}

export const dnaNodes: DnaNode[] = [
  { label: "Transaction Behavior", progress: 96, status: "Stable", icon: CreditCard, tone: "cyan" },
  { label: "Device Intelligence", progress: 94, status: "Trusted", icon: Smartphone, tone: "blue" },
  { label: "Geo Intelligence", progress: 91, status: "Consistent", icon: MapPin, tone: "green" },
  { label: "Login Pattern", progress: 97, status: "Regular", icon: LogIn, tone: "cyan" },
  { label: "Network Pattern", progress: 89, status: "Trusted", icon: Network, tone: "blue" },
  { label: "Merchant Pattern", progress: 93, status: "Familiar", icon: Store, tone: "violet" },
  { label: "Time Pattern", progress: 95, status: "Predictable", icon: Clock, tone: "green" },
  { label: "Risk Pattern", progress: 88, status: "Low Risk", icon: ShieldAlert, tone: "amber" },
  { label: "Behavior Pattern", progress: 96, status: "Stable", icon: Activity, tone: "cyan" },
];

export interface ProfileItem {
  label: string;
  value: string;
}

export const behaviorProfile: ProfileItem[] = [
  { label: "Average Daily Spend", value: "₹1,240" },
  { label: "Average Monthly Spend", value: "₹37,500" },
  { label: "Peak Transaction Time", value: "9:00 – 10:00 AM" },
  { label: "Preferred Banking Hours", value: "8 AM – 9 PM" },
  { label: "Preferred Device", value: "Samsung S23 FE" },
  { label: "Preferred Browser", value: "Chrome Mobile" },
  { label: "Preferred Payment Method", value: "UPI" },
  { label: "Typical Merchant Category", value: "Grocery & Retail" },
  { label: "Trusted WiFi", value: "Home_5G · Office_Net" },
  { label: "Trusted Cellular Network", value: "Jio · Kanpur Circle" },
  { label: "Travel Frequency", value: "Low · 2 trips / yr" },
  { label: "Weekend Spending", value: "Moderate" },
  { label: "Salary Pattern", value: "Monthly · 1st" },
  { label: "EMI Pattern", value: "2 active · on-time" },
  { label: "Subscription Pattern", value: "3 recurring" },
];

export interface TrustedDevice {
  name: string;
  os: string;
  browser: string;
  lastSeen: string;
  trust: number;
  fingerprint: string;
  health: string;
  primary?: boolean;
}

export const trustedDevices: TrustedDevice[] = [
  { name: "Samsung Galaxy S23 FE", os: "Android 14", browser: "Chrome Mobile 122", lastSeen: "2 min ago", trust: 98, fingerprint: "Verified", health: "Excellent", primary: true },
  { name: "MacBook Air M2", os: "macOS 14.4", browser: "Safari 17", lastSeen: "Yesterday", trust: 94, fingerprint: "Verified", health: "Good" },
  { name: "iPad Air", os: "iPadOS 17", browser: "Safari 17", lastSeen: "3 days ago", trust: 90, fingerprint: "Verified", health: "Good" },
  { name: "Windows Desktop", os: "Windows 11", browser: "Edge 122", lastSeen: "1 week ago", trust: 85, fingerprint: "Verified", health: "Fair" },
];

export const locationIntel = {
  trustedCities: ["Kanpur", "Lucknow", "Delhi", "Noida", "Prayagraj", "Agra"],
  currentCity: "Kanpur, UP",
  frequentlyVisited: "Lucknow, Delhi",
  travelRadius: "420 km",
  geoStability: "96%",
  impossibleTravel: "None Detected",
};

export const behaviorEvolution = [
  { month: "Jul", score: 88 },
  { month: "Aug", score: 89 },
  { month: "Sep", score: 90 },
  { month: "Oct", score: 91 },
  { month: "Nov", score: 90 },
  { month: "Dec", score: 92 },
  { month: "Jan", score: 93 },
  { month: "Feb", score: 94 },
  { month: "Mar", score: 93 },
  { month: "Apr", score: 95 },
  { month: "May", score: 95 },
  { month: "Jun", score: 96 },
];

export const aiInsights = [
  "SentinelAI has analyzed over 14 behavioral dimensions across the customer's continuously evolving digital identity.",
  "The customer exhibits highly consistent transaction behavior across trusted devices and familiar merchant categories.",
  "No significant behavioral drift has been observed during the previous 180 days of activity.",
  "Current identity confidence remains above 98% with a very low probability of account compromise.",
  "Recent travel and login patterns align precisely with historical baseline activity.",
];

export interface Anomaly {
  label: string;
  severity: Severity;
  confidence: number;
  impact: string;
}

export const anomalies: Anomaly[] = [
  { label: "New Device", severity: "low", confidence: 12, impact: "Negligible" },
  { label: "Behavior Drift", severity: "low", confidence: 8, impact: "Negligible" },
  { label: "Large Spending", severity: "medium", confidence: 22, impact: "Low" },
  { label: "Travel Change", severity: "low", confidence: 14, impact: "Negligible" },
  { label: "Merchant Change", severity: "low", confidence: 11, impact: "Negligible" },
  { label: "Night Activity", severity: "medium", confidence: 19, impact: "Low" },
  { label: "Device Risk", severity: "low", confidence: 7, impact: "Negligible" },
  { label: "Network Risk", severity: "low", confidence: 9, impact: "Negligible" },
];

export const predictiveBehavior = {
  confidence: 96,
  items: [
    { label: "Expected Login Time", value: "Tomorrow · 9:15 AM" },
    { label: "Expected Spend", value: "₹1,200" },
    { label: "Expected Payment", value: "UPI" },
    { label: "Expected Location", value: "Kanpur" },
    { label: "Expected Device", value: "Samsung S23 FE" },
    { label: "Expected Merchant", value: "Grocery" },
  ],
};

export const trustBreakdown = [
  { label: "Device Trust", value: 96 },
  { label: "Behavior Stability", value: 95 },
  { label: "Location Consistency", value: 94 },
  { label: "Network Trust", value: 90 },
  { label: "Transaction Pattern", value: 93 },
  { label: "Historical Risk", value: 88 },
];

export const riskEvolution = [
  { month: "January", score: 96 },
  { month: "February", score: 95 },
  { month: "March", score: 95 },
  { month: "April", score: 94 },
  { month: "May", score: 93 },
  { month: "June", score: 92 },
];

export const dnaRecommendations = [
  "Maintain Current Trust Level",
  "No Security Action Required",
  "Continue Passive Monitoring",
  "Trusted Device Verified",
  "Behavior Matches Historical Profile",
];
