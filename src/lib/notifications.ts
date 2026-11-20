import {
  ShieldAlert,
  Smartphone,
  UserCheck,
  Radar,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

import type { Severity } from "@/lib/soc-data";

export interface AppNotification {
  id: string;
  title: string;
  detail: string;
  time: string;
  priority: Severity;
  icon: LucideIcon;
  to: string;
}

export const initialNotifications: AppNotification[] = [
  { id: "n1", title: "Critical Fraud Detected", detail: "Neha Gupta · ₹4,60,000 · Lagos", time: "1m ago", priority: "critical", icon: ShieldAlert, to: "/dashboard/investigation" },
  { id: "n2", title: "New Device Login", detail: "Customer •••4821 · Android", time: "6m ago", priority: "medium", icon: Smartphone, to: "/dashboard/cyber-dna" },
  { id: "n3", title: "Case Assigned", detail: "INC-4819 assigned to you", time: "18m ago", priority: "high", icon: Briefcase, to: "/dashboard/incidents" },
  { id: "n4", title: "Threat Intelligence Updated", detail: "CVE-2026-3391 · Auth bypass", time: "34m ago", priority: "high", icon: Radar, to: "/dashboard/threats" },
  { id: "n5", title: "Customer Verification Completed", detail: "Rohan Mehta · identity confirmed", time: "1h ago", priority: "low", icon: UserCheck, to: "/dashboard/customers" },
];