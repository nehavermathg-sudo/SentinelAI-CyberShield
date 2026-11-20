import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { decisionPath } from "@/lib/correlation-data";

export function DecisionPath() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {decisionPath.map((step, i) => {
        const last = i === decisionPath.length - 1;
        return (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2"
          >
            <span
              className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                last
                  ? "border-danger/40 bg-danger/10 text-danger"
                  : "border-cyber-cyan/20 bg-cyber-cyan/5 text-foreground"
              }`}
            >
              {step}
            </span>
            {!last && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />}
          </motion.div>
        );
      })}
    </div>
  );
}
