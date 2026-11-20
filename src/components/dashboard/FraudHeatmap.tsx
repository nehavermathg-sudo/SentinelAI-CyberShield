import { cn } from "@/lib/utils";
import { heatCities, severityStyles } from "@/lib/soc-data";

export function FraudHeatmap() {
  return (
    <div className="space-y-4">
      <div className="relative h-52 overflow-hidden rounded-xl border border-border/60 bg-background/40">
        <div className="cyber-grid absolute inset-0 opacity-30" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
          <path
            d="M42 12 L58 16 L64 30 L60 42 L66 54 L58 70 L48 88 L40 74 L30 66 L28 52 L22 40 L30 26 Z"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="0.6"
          />
        </svg>
        {heatCities.map((c) => {
          const s = severityStyles[c.level];
          return (
            <div
              key={c.city}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
            >
              <span className="relative flex h-3 w-3">
                <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", s.dot)} />
                <span className={cn("relative inline-flex h-3 w-3 rounded-full", s.dot)} />
              </span>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold text-foreground/80">
                {c.city}
              </span>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {heatCities.map((c) => {
          const s = severityStyles[c.level];
          return (
            <div key={c.city} className="rounded-lg bg-white/5 px-2.5 py-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className={cn("h-2 w-2 rounded-full", s.dot)} />
                {c.city}
              </div>
              <div className="text-[11px] text-muted-foreground">{c.incidents} incidents</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}