import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/dashboard/AnimatedCounter";

const toneColor: Record<string, string> = {
  cyan: "#22d3ee",
  blue: "#3b82f6",
  green: "#22c55e",
  amber: "#f59e0b",
  violet: "#a78bfa",
  red: "#ef4444",
};

export function TrustRing({
  value,
  size = 96,
  stroke = 8,
  tone = "cyan",
  display,
  suffix = "",
  label,
}: {
  value: number;
  size?: number;
  stroke?: number;
  tone?: string;
  display?: string;
  suffix?: string;
  label?: string;
}) {
  const color = toneColor[tone] ?? toneColor.cyan;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const gid = `ring-${tone}-${label?.replace(/\W/g, "") ?? value}`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {display ? (
          <span className="text-lg font-extrabold" style={{ color }}>
            {display}
          </span>
        ) : (
          <span className="text-xl font-extrabold tabular-nums">
            <AnimatedCounter value={value} />
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
