import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { attackGraph } from "@/lib/correlation-data";
import { linkColor } from "./toneColors";

export function AttackGraph() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {attackGraph.map((step, i) => {
        const last = i === attackGraph.length - 1;
        const color = linkColor[step.tone];
        return (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09 }}
            className="flex items-center gap-2"
          >
            <span
              className="rounded-full border px-3 py-1.5 text-xs font-semibold"
              style={{ borderColor: `${color}55`, background: `${color}12`, color }}
            >
              {step.label}
            </span>
            {!last && <ArrowRight className="h-4 w-4 shrink-0" style={{ color: linkColor.critical }} />}
          </motion.div>
        );
      })}
    </div>
  );
}
