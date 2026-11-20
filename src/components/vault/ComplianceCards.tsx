import { motion } from "motion/react";
import { BadgeCheck } from "lucide-react";
import { complianceCards } from "@/lib/evidence-data";

export function ComplianceCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {complianceCards.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -3 }}
          className="glass rounded-2xl p-4 shadow-[var(--shadow-premium)]"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-success/10 text-success">
              <BadgeCheck className="h-4 w-4" />
            </span>
            <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
              {c.status}
            </span>
          </div>
          <h4 className="mt-3 text-sm font-semibold">{c.name}</h4>
          <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Compliance Score</span>
            <span className="font-semibold text-success">{c.score}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${c.score}%` }}
              transition={{ delay: i * 0.05 + 0.2, duration: 0.6 }}
              className="h-full rounded-full bg-success"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}