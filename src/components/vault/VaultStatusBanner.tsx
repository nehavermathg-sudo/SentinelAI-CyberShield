import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { vaultStatus } from "@/lib/evidence-data";

const toneCls: Record<string, string> = {
  green: "bg-success/10 text-success",
  cyan: "bg-cyber-cyan/10 text-cyber-cyan",
  blue: "bg-cyber-blue/10 text-cyber-blue",
  amber: "bg-warning/10 text-warning",
};

export function VaultStatusBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass relative overflow-hidden rounded-2xl p-5 shadow-[var(--shadow-premium)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "var(--gradient-glow)" }} />
      <div className="relative grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
        <div className="flex items-center gap-4">
          <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-success/15 text-success">
            <span className="absolute inset-0 animate-pulse-ring rounded-2xl" />
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-widest text-cyber-cyan">Vault Integrity</div>
            <div className="truncate text-lg font-extrabold">All Evidence Immutable & Verified</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {vaultStatus.map((s) => (
            <div key={s.label} className="flex min-w-0 items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${toneCls[s.tone]}`}>
                <s.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
                <div className="truncate text-sm font-bold">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}