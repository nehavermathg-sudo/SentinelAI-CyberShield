import { motion } from "motion/react";
import { Fingerprint } from "lucide-react";
import { dnaNodes } from "@/lib/cyber-dna-data";

const toneColor: Record<string, string> = {
  cyan: "#22d3ee",
  blue: "#3b82f6",
  green: "#22c55e",
  amber: "#f59e0b",
  violet: "#a78bfa",
  red: "#ef4444",
};

export function DnaVisualization() {
  const count = dnaNodes.length;
  const cx = 50;
  const cy = 50;
  const radius = 38;

  const positioned = dnaNodes.map((node, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return {
      ...node,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  return (
    <div className="relative aspect-square w-full max-w-2xl mx-auto">
      {/* connection lines */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {positioned.map((n, i) => (
          <motion.line
            key={n.label}
            x1={cx}
            y1={cy}
            x2={n.x}
            y2={n.y}
            stroke={toneColor[n.tone] ?? toneColor.cyan}
            strokeWidth={0.4}
            strokeOpacity={0.35}
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.8 }}
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1.2s" repeatCount="indefinite" />
          </motion.line>
        ))}
      </svg>

      {/* center identity */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-cyber-blue/30 to-cyber-cyan/30 shadow-[var(--shadow-glow)]">
          <span className="absolute inset-0 rounded-full animate-pulse-ring" />
          <div className="grid h-16 w-16 place-items-center rounded-full bg-background/70 backdrop-blur">
            <Fingerprint className="h-8 w-8 text-cyber-cyan" />
          </div>
        </div>
        <div className="mt-2 text-center text-[11px] font-semibold text-cyber-cyan">Customer Identity</div>
      </motion.div>

      {/* nodes */}
      {positioned.map((n, i) => {
        const color = toneColor[n.tone] ?? toneColor.cyan;
        return (
          <motion.div
            key={n.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 220, damping: 18 }}
            whileHover={{ scale: 1.12, zIndex: 20 }}
            className="group absolute z-[15] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div
              className="glass flex w-28 flex-col items-center gap-1 rounded-xl p-2 text-center transition-shadow"
              style={{ boxShadow: `0 0 0 1px ${color}33` }}
            >
              <div
                className="grid h-9 w-9 place-items-center rounded-lg transition-all group-hover:shadow-[0_0_16px] "
                style={{ background: `${color}1a`, color, boxShadow: `0 0 0px ${color}` }}
              >
                <n.icon className="h-4 w-4" />
              </div>
              <div className="text-[10px] font-semibold leading-tight">{n.label}</div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${n.progress}%` }}
                  transition={{ delay: 0.6 + i * 0.07, duration: 0.9 }}
                />
              </div>
              <div className="text-[9px] text-muted-foreground">{n.status} · {n.progress}%</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
