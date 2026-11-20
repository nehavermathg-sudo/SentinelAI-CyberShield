import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { riskPropagation, finalRisk } from "@/lib/correlation-data";

export function RiskPropagation() {
  let running = 0;
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center">
      {riskPropagation.map((s, i) => {
        running += s.delta;
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="w-full"
          >
            <div className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-background/40 p-3">
              <span className="text-sm font-medium">{s.label}</span>
              <span className="rounded-full bg-danger/10 px-2 py-0.5 text-xs font-bold text-danger">+{s.delta}</span>
            </div>
            <div className="flex flex-col items-center py-1 text-[10px] text-muted-foreground">
              <ArrowDown className="h-4 w-4 text-danger/70" />
              <span>running {running}</span>
            </div>
          </motion.div>
        );
      })}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: riskPropagation.length * 0.12 }}
        className="mt-1 grid h-24 w-24 place-items-center rounded-full border-2 border-danger/50 bg-danger/10"
      >
        <div className="text-center">
          <div className="text-2xl font-extrabold text-danger">{finalRisk}</div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Final Risk</div>
        </div>
      </motion.div>
    </div>
  );
}
