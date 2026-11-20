import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Switch } from "@/components/ui/switch";
import { AnimatedCounter } from "@/components/dashboard/AnimatedCounter";

const BASE = 93;
const signals = [
  { id: "vpn", label: "VPN", weight: 19 },
  { id: "device", label: "Device Change", weight: 13 },
  { id: "behavior", label: "Behavior Drift", weight: 12 },
  { id: "travel", label: "Impossible Travel", weight: 10 },
  { id: "txn", label: "Large Transaction", weight: 14 },
  { id: "failed", label: "Failed Login", weight: 8 },
];

export function WhatIfSimulator() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(signals.map((s) => [s.id, true])),
  );

  const risk = useMemo(() => {
    const removed = signals.filter((s) => !enabled[s.id]).reduce((a, s) => a + s.weight, 0);
    return Math.max(4, BASE - removed);
  }, [enabled]);

  const level = risk >= 80 ? "Critical" : risk >= 60 ? "High" : risk >= 40 ? "Elevated" : "Low";
  const color = risk >= 80 ? "#ef4444" : risk >= 60 ? "#f59e0b" : risk >= 40 ? "#22d3ee" : "#22c55e";

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          Disable a signal to see how it changed the AI risk score — Explainable AI in action.
        </p>
        {signals.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-3"
          >
            <div>
              <div className="text-sm font-medium">{s.label}</div>
              <div className="text-[11px] text-muted-foreground">Weight +{s.weight}</div>
            </div>
            <Switch
              checked={enabled[s.id]}
              onCheckedChange={(v) => setEnabled((e) => ({ ...e, [s.id]: v }))}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border/60 bg-background/40 p-6">
        <motion.div
          key={level}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="grid h-40 w-40 place-items-center rounded-full border-4"
          style={{ borderColor: `${color}66`, boxShadow: `0 0 40px -8px ${color}88` }}
        >
          <div className="text-center">
            <div className="text-4xl font-extrabold tabular-nums" style={{ color }}>
              <AnimatedCounter value={risk} duration={600} />%
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-widest" style={{ color }}>
              {level}
            </div>
          </div>
        </motion.div>
        <p className="text-center text-xs text-muted-foreground">
          Simulated risk with {signals.filter((s) => !enabled[s.id]).length} signal(s) removed
        </p>
      </div>
    </div>
  );
}
