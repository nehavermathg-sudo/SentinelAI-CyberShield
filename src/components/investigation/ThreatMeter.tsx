import { motion } from "motion/react";

export function ThreatMeter({
  score,
  confidence,
  level = "Critical",
  size = 200,
}: {
  score: number;
  confidence: number;
  level?: string;
  size?: number;
}) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id="meter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#meter-grad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold tabular-nums text-gradient">{score}%</span>
          <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-danger">{level}</span>
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-6 text-center">
        <div>
          <div className="text-lg font-bold tabular-nums">{score}%</div>
          <div className="text-[11px] text-muted-foreground">Risk Score</div>
        </div>
        <div className="h-8 w-px bg-border" />
        <div>
          <div className="text-lg font-bold tabular-nums text-cyber-cyan">{confidence}%</div>
          <div className="text-[11px] text-muted-foreground">Confidence</div>
        </div>
      </div>
    </div>
  );
}