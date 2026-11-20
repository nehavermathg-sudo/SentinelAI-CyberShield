import type { Risk } from "@/lib/evidence-data";

export const riskColor: Record<Risk, string> = {
  critical: "#ef4444",
  high: "#f59e0b",
  medium: "#3b82f6",
  low: "#22c55e",
};

export const riskBadge: Record<Risk, string> = {
  critical: "border-danger/30 bg-danger/10 text-danger",
  high: "border-warning/30 bg-warning/10 text-warning",
  medium: "border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue",
  low: "border-success/30 bg-success/10 text-success",
};