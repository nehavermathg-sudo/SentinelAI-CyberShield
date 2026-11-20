import { motion } from "motion/react";
import { signalContributions } from "@/lib/correlation-data";
import { toneColor } from "./toneColors";

export function SignalContribution() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {signalContributions.map((s, i) => {
        const color = toneColor[s.tone];
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border/60 bg-background/40 p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{s.label}</span>
              <span className="text-sm font-bold tabular-nums" style={{ color }}>{s.value}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${s.value * 4}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.05 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
