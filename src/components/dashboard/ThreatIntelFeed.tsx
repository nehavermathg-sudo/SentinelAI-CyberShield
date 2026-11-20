import { Radar } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { threatIntel, severityStyles } from "@/lib/soc-data";

export function ThreatIntelFeed() {
  const navigate = useNavigate();
  return (
    <div className="space-y-2">
      {threatIntel.map((t) => {
        const s = severityStyles[t.severity];
        return (
          <div
            key={t.type}
            onClick={() => navigate({ to: "/dashboard/threats" })}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3 transition-colors hover:bg-white/5"
          >
            <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg", s.bg, s.text)}>
              <Radar className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {t.type}
              </div>
              <div className="truncate text-sm font-medium">{t.label}</div>
            </div>
            <span className="shrink-0 text-[11px] text-muted-foreground">{t.time}</span>
          </div>
        );
      })}
    </div>
  );
}