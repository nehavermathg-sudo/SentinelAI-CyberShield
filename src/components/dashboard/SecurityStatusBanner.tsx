import { motion } from "motion/react";
import { ShieldCheck, HeartPulse, Gauge, Activity } from "lucide-react";

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${accent}`}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="truncate text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-bold">{value}</div>
      </div>
    </div>
  );
}

export function SecurityStatusBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass relative overflow-hidden rounded-2xl p-5 shadow-[var(--shadow-premium)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="flex items-center gap-4">
          <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-success/15 text-success">
            <span className="absolute inset-0 animate-pulse-ring rounded-2xl" />
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-widest text-cyber-cyan">
              Security Posture
            </div>
            <div className="truncate text-lg font-extrabold">
              All Core Banking Services Operational
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat icon={ShieldCheck} label="Security Level" value="Protected" accent="bg-success/10 text-success" />
          <Stat icon={HeartPulse} label="System Health" value="99.98%" accent="bg-cyber-cyan/10 text-cyber-cyan" />
          <Stat icon={Gauge} label="Threat Level" value="Low" accent="bg-warning/10 text-warning" />
        </div>
      </div>
    </motion.div>
  );
}