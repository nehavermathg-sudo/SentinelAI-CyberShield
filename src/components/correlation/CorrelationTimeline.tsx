import { motion } from "motion/react";
import { correlationTimeline } from "@/lib/correlation-data";
import { severityStyles } from "@/lib/soc-data";
import { cn } from "@/lib/utils";

export function CorrelationTimeline() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-3">
      {correlationTimeline.map((e, i) => {
        const s = e.severity === "resolved" ? severityStyles.low : severityStyles[e.severity];
        const resolved = e.severity === "resolved";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="relative w-56 shrink-0 rounded-xl border border-border/60 bg-background/40 p-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-cyber-cyan">{e.time}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize",
                  resolved ? "bg-success/10 text-success" : cn(s.bg, s.text),
                )}
              >
                {resolved ? "resolved" : e.severity}
              </span>
            </div>
            <div className="mt-1 text-sm font-semibold">{e.title}</div>
            <p className="mt-1 text-[11px] text-muted-foreground">{e.details}</p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{e.evidence}</span>
              <span className="font-semibold text-foreground">{e.confidence}%</span>
            </div>
            {i < correlationTimeline.length - 1 && (
              <span className="absolute -right-4 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-border md:block" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
