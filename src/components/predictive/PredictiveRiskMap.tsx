import { useState } from "react";
import { motion } from "motion/react";
import { stateRisks, type StateRisk } from "@/lib/predictive-data";

const levelColor: Record<StateRisk["level"], string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

export function PredictiveRiskMap() {
  const [active, setActive] = useState<StateRisk>(stateRisks[0]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_240px]">
      <div className="relative aspect-[4/5] max-h-[440px] overflow-hidden rounded-xl border border-border/60 bg-background/40 sm:aspect-[5/4]">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          {stateRisks.map((s) => {
            const color = levelColor[s.level];
            const isActive = active.code === s.code;
            const r = 2 + s.density / 22;
            return (
              <g key={s.code} onClick={() => setActive(s)} className="cursor-pointer">
                <circle cx={s.x} cy={s.y} r={r + 2} fill={color} opacity={isActive ? 0.25 : 0.12}>
                  <animate attributeName="r" values={`${r + 1};${r + 4};${r + 1}`} dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx={s.x} cy={s.y} r={r} fill={color} opacity={isActive ? 1 : 0.8} stroke={isActive ? "#fff" : "none"} strokeWidth={0.4} />
                {isActive && (
                  <text x={s.x} y={s.y - r - 2} textAnchor="middle" fontSize="3" fill="#f4f4f5" fontWeight="bold">
                    {s.code}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="absolute bottom-3 left-3 flex gap-3 rounded-lg border border-border/60 bg-card/70 px-3 py-1.5 text-[11px] backdrop-blur">
          {(["high", "medium", "low"] as const).map((l) => (
            <span key={l} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: levelColor[l] }} />
              <span className="capitalize text-muted-foreground">{l}</span>
            </span>
          ))}
        </div>
      </div>

      <motion.div key={active.code} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
        <div className="rounded-xl border border-border/60 bg-background/40 p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Selected Region</div>
          <div className="mt-1 text-lg font-bold">{active.state}</div>
          <span
            className="mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize"
            style={{ background: `${levelColor[active.level]}1a`, color: levelColor[active.level] }}
          >
            {active.level} risk
          </span>
        </div>
        {[
          { label: "Fraud Density", value: `${active.density}%` },
          { label: "Threat Growth", value: `+${active.growth}%` },
          { label: "Predicted Attacks", value: `${active.predicted}` },
        ].map((m) => (
          <div key={m.label} className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-4 py-3">
            <span className="text-xs text-muted-foreground">{m.label}</span>
            <span className="text-sm font-bold text-cyber-cyan tabular-nums">{m.value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}