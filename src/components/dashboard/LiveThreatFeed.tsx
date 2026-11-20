import { motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { threatFeed, severityStyles } from "@/lib/soc-data";

export function LiveThreatFeed() {
  const navigate = useNavigate();
  return (
    <div className="space-y-2">
      {threatFeed.map((e, i) => {
        const s = severityStyles[e.severity];
        return (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => navigate({ to: "/dashboard/investigation" })}
            className="group flex cursor-pointer items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3 transition-colors hover:border-cyber-cyan/40 hover:bg-white/5"
          >
            <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", s.bg, s.text)}>
              <e.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold">{e.title}</span>
                <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase", s.bg, s.text)}>
                  {e.severity}
                </span>
              </div>
              <div className="truncate text-xs text-muted-foreground">{e.detail}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[11px] font-medium text-muted-foreground">{e.time}</div>
              <div className={cn("text-[11px] font-semibold", s.text)}>{e.status}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}