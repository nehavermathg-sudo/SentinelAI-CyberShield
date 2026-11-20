import { motion } from "motion/react";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { attackTimeline } from "@/lib/predictive-data";
import { toneColor } from "@/components/correlation/toneColors";

const icons = { Morning: Sunrise, Afternoon: Sun, Evening: Sunset, Night: Moon } as const;

export function AttackForecastTimeline() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {attackTimeline.map((slot, i) => {
        const Icon = icons[slot.period];
        return (
          <motion.div
            key={slot.period}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border/60 bg-background/40 p-4"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyber-cyan/10 text-cyber-cyan">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <div className="text-sm font-semibold">{slot.period}</div>
                <div className="text-[11px] text-muted-foreground">{slot.window}</div>
              </div>
            </div>
            <div className="space-y-2">
              {slot.threats.map((t) => {
                const color = toneColor[t.level];
                return (
                  <div key={t.name} className="rounded-lg border border-border/50 bg-card/40 p-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{t.name}</span>
                      <span className="tabular-nums font-semibold" style={{ color }}>{t.likelihood}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${t.likelihood}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}