import { motion } from "motion/react";
import { auditStats } from "@/lib/evidence-data";

const tone: Record<string, string> = {
  cyan: "#22d3ee",
  green: "#22c55e",
  amber: "#f59e0b",
  blue: "#3b82f6",
  violet: "#a78bfa",
};

export function AuditDashboard() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {auditStats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-xl border border-border/60 bg-background/40 p-4"
        >
          <div className="text-xl font-extrabold tabular-nums" style={{ color: tone[s.tone] }}>
            {s.value}
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}