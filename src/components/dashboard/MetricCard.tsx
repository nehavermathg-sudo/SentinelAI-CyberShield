import { motion } from "motion/react";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./AnimatedCounter";

type Tone = "blue" | "cyan" | "amber" | "red" | "green" | "violet";

const toneMap: Record<Tone, { icon: string; stroke: string; fill: string; glow: string }> = {
  blue: { icon: "text-cyber-blue bg-cyber-blue/10", stroke: "#3b82f6", fill: "#3b82f6", glow: "from-cyber-blue/40" },
  cyan: { icon: "text-cyber-cyan bg-cyber-cyan/10", stroke: "#22d3ee", fill: "#22d3ee", glow: "from-cyber-cyan/40" },
  amber: { icon: "text-warning bg-warning/10", stroke: "#f59e0b", fill: "#f59e0b", glow: "from-warning/40" },
  red: { icon: "text-danger bg-danger/10", stroke: "#ef4444", fill: "#ef4444", glow: "from-danger/40" },
  green: { icon: "text-success bg-success/10", stroke: "#22c55e", fill: "#22c55e", glow: "from-success/40" },
  violet: { icon: "text-[#a78bfa] bg-[#a78bfa]/10", stroke: "#a78bfa", fill: "#a78bfa", glow: "from-[#a78bfa]/40" },
};

export interface MetricCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta?: string;
  up?: boolean;
  badge?: string;
  icon: LucideIcon;
  tone: Tone;
  spark: number[];
  format?: (n: number) => string;
}

export function MetricCard({
  label,
  value,
  prefix = "",
  suffix = "",
  delta,
  up = true,
  badge,
  icon: Icon,
  tone,
  spark,
  format,
}: MetricCardProps) {
  const t = toneMap[tone];
  const data = spark.map((v, i) => ({ i, v }));
  const gid = `spark-${tone}-${label.replace(/\W/g, "")}`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl p-[1px]"
    >
      <div
        className={cn(
          "absolute inset-0 rounded-2xl bg-gradient-to-br to-transparent opacity-60 transition-opacity group-hover:opacity-100",
          t.glow,
        )}
      />
      <div className="glass relative rounded-2xl p-5 shadow-[var(--shadow-premium)]">
        <div className="flex items-start justify-between">
          <div className={cn("grid h-11 w-11 place-items-center rounded-xl", t.icon)}>
            <Icon className="h-5 w-5" />
          </div>
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                up ? "bg-success/10 text-success" : "bg-danger/10 text-danger",
              )}
            >
              {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {delta}
            </span>
          )}
          {badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2 py-1 text-xs font-semibold text-danger">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-danger" />
              {badge}
            </span>
          )}
        </div>
        <div className="mt-4 text-3xl font-extrabold tracking-tight tabular-nums">
          {prefix}
          <AnimatedCounter value={value} format={format} />
          {suffix}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
        <div className="mt-3 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, bottom: 0, left: 0, right: 0 }}>
              <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={t.fill} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={t.fill} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={t.stroke} strokeWidth={2} fill={`url(#${gid})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}