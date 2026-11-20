import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/dashboard/AnimatedCounter";
import { kpis } from "@/lib/correlation-data";
import { toneColor } from "./toneColors";

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {kpis.map((k, i) => {
        const color = toneColor[k.tone];
        return (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="glass relative overflow-hidden rounded-2xl p-4 shadow-[var(--shadow-premium)]"
          >
            <span className="absolute left-0 top-0 h-full w-1" style={{ background: color }} />
            <div className="text-2xl font-extrabold tabular-nums" style={{ color }}>
              {k.display ?? (
                <>
                  <AnimatedCounter value={k.value} />
                  {k.suffix}
                </>
              )}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">{k.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
