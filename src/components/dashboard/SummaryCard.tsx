import { motion } from "motion/react";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Tone = "blue" | "cyan" | "amber" | "red";

const toneMap: Record<Tone, { icon: string; bar: string }> = {
  blue: { icon: "text-cyber-blue bg-cyber-blue/10", bar: "from-cyber-blue/60" },
  cyan: { icon: "text-cyber-cyan bg-cyber-cyan/10", bar: "from-cyber-cyan/60" },
  amber: { icon: "text-warning bg-warning/10", bar: "from-warning/60" },
  red: { icon: "text-danger bg-danger/10", bar: "from-danger/60" },
};

export function SummaryCard({
  label,
  value,
  delta,
  up,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  icon: LucideIcon;
  tone: Tone;
}) {
  const t = toneMap[tone];
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass group relative overflow-hidden rounded-2xl p-5 shadow-[var(--shadow-premium)]"
    >
      <div className="flex items-start justify-between">
        <div className={cn("grid h-11 w-11 place-items-center rounded-xl", t.icon)}>
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
            up ? "bg-success/10 text-success" : "bg-danger/10 text-danger",
          )}
        >
          {up ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          {delta}
        </span>
      </div>
      <div className="mt-4 text-3xl font-extrabold tracking-tight tabular-nums">
        {value}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>

      {/* sparkline placeholder */}
      <div className="mt-4 flex h-10 items-end gap-1">
        {[35, 55, 40, 70, 50, 80, 62, 90, 74].map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className={cn(
              "flex-1 rounded-sm bg-gradient-to-t to-transparent opacity-70 transition-opacity group-hover:opacity-100",
              t.bar,
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}