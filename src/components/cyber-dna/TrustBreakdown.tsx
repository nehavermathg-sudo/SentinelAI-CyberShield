import { motion } from "motion/react";
import { trustBreakdown } from "@/lib/cyber-dna-data";

export function TrustBreakdown() {
  return (
    <div className="space-y-4">
      {trustBreakdown.map((t, i) => (
        <motion.div
          key={t.label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted-foreground">{t.label}</span>
            <span className="font-semibold text-cyber-cyan tabular-nums">{t.value}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${t.value}%` }}
              transition={{ duration: 1, delay: i * 0.06 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
