import { motion } from "motion/react";
import { execMetrics } from "@/lib/predictive-data";
import { toneColor } from "@/components/correlation/toneColors";

export function ExecutiveDashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {execMetrics.map((m, i) => {
        const color = toneColor[m.tone];
        const circumference = 2 * Math.PI * 26;
        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-background/40 p-4"
          >
            <div className="relative h-16 w-16">
              <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke={color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference * (1 - m.value / 100) }}
                  transition={{ duration: 1, delay: i * 0.06 }}
                />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-sm font-bold tabular-nums" style={{ color }}>
                {m.value}
              </span>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium">{m.label}</div>
              <div className="text-[11px]" style={{ color }}>{m.status}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}