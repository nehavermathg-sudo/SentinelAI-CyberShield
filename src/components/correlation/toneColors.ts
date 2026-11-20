import type { LinkTone } from "@/lib/correlation-data";

export const linkColor: Record<LinkTone, string> = {
  safe: "#3b82f6",
  suspicious: "#f59e0b",
  critical: "#ef4444",
};

export const toneColor: Record<string, string> = {
  cyan: "#22d3ee",
  blue: "#3b82f6",
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
  violet: "#a78bfa",
};
