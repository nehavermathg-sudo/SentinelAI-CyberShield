import { motion } from "motion/react";
import { Lightbulb } from "lucide-react";
import { insights } from "@/lib/predictive-data";

export function PredictiveInsights() {
  return (
    <div className="space-y-3">
      {insights.map((text, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-3 rounded-xl border border-border/60 bg-background/40 p-4"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cyber-cyan/10 text-cyber-cyan">
            <Lightbulb className="h-4 w-4" />
          </span>
          <p className="text-sm leading-relaxed text-foreground/90">{text}</p>
        </motion.div>
      ))}
    </div>
  );
}