import { motion } from "motion/react";
import { TrustRing } from "./TrustRing";
import { dnaSummary } from "@/lib/cyber-dna-data";

export function DnaSummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {dnaSummary.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          whileHover={{ y: -4 }}
          className="glass flex flex-col items-center gap-3 rounded-2xl p-5 text-center shadow-[var(--shadow-premium)]"
        >
          <TrustRing value={s.value} display={s.display} suffix={s.suffix} tone={s.tone} label={s.label} />
          <div>
            <div className="text-sm font-semibold">{s.label}</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">{s.note}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
