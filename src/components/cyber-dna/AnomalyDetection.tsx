import { motion } from "motion/react";
import { anomalies } from "@/lib/cyber-dna-data";
import { severityStyles } from "@/lib/soc-data";
import { cn } from "@/lib/utils";

export function AnomalyDetection() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {anomalies.map((a, i) => {
        const s = severityStyles[a.severity];
        return (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="rounded-xl border border-border/60 bg-background/40 p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{a.label}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", s.bg, s.text)}>
                {a.severity}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
              <span>Confidence</span>
              <span className="font-semibold text-foreground">{a.confidence}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={cn("h-full rounded-full", s.dot)}
                initial={{ width: 0 }}
                animate={{ width: `${a.confidence}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px]">
              <span className="text-muted-foreground">Impact</span>
              <span className="font-semibold">{a.impact}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
