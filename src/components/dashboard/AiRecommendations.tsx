import { motion } from "motion/react";
import { AlertOctagon, AlertTriangle, Lightbulb, Info, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { recommendations, recKindStyles, type RecKind } from "@/lib/soc-data";

const kindIcon: Record<RecKind, typeof Info> = {
  critical: AlertOctagon,
  warning: AlertTriangle,
  recommendation: Lightbulb,
  information: Info,
};

export function AiRecommendations() {
  const navigate = useNavigate();
  return (
    <div className="space-y-2">
      {recommendations.map((r, i) => {
        const s = recKindStyles[r.kind];
        const Icon = kindIcon[r.kind];
        return (
          <motion.div
            key={r.action}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate({ to: "/dashboard/investigation" })}
            className={cn(
              "group flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-lg",
              s.border,
              s.bg,
            )}
          >
            <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg", s.icon)}>
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold">{r.action}</span>
                <span className={cn("hidden shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide sm:inline", s.badge)}>
                  {s.label}
                </span>
              </div>
              <div className="truncate text-[11px] text-muted-foreground">{r.target}</div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-cyber-cyan" />
          </motion.div>
        );
      })}
    </div>
  );
}