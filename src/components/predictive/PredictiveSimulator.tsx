import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Switch } from "@/components/ui/switch";
import { AnimatedCounter } from "@/components/dashboard/AnimatedCounter";
import { simSignals } from "@/lib/predictive-data";

const BASE = 58;

export function PredictiveSimulator() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(simSignals.map((s) => [s.id, s.defaultOn])),
  );

  const risk = useMemo(() => {
    let r = BASE;
    for (const s of simSignals) {
      if (enabled[s.id]) r -= s.delta;
      else r += s.delta * 0.6;
    }
    return Math.max(4, Math.min(99, Math.round(r + 30)));
  }, [enabled]);

  const level = risk >= 80 ? "Critical" : risk >= 60 ? "High" : risk >= 40 ? "Elevated" : "Low";
  const color = risk >= 80 ? "#ef4444" : risk >= 60 ? "#f59e0b" : risk >= 40 ? "#22d3ee" : "#22c55e";

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          Toggle security controls to see how the predicted fraud probability changes in real time.
        </p>
        {simSignals.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-3">
            <div>
              <div className="text-sm font-medium">{s.label}</div>
              <div className="text-[11px] text-muted-foreground">
                {enabled[s.id] ? "Active · reducing risk" : "Disabled · raising risk"}
              </div>
            </div>
            <Switch checked={enabled[s.id]} onCheckedChange={(v) => setEnabled((e) => ({ ...e, [s.id]: v }))} />
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
            <div className="mt-1 text-xs font-semibold uppercase tracking-widest" style={{ color }}>{level}</div>
          </div>
        </motion.div>
        <p className="text-center text-xs text-muted-foreground">Predicted fraud probability under current controls</p>
      </div>
    </div>
  );
}