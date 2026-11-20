import { motion } from "motion/react";
import { Smartphone, ShieldCheck, HeartPulse, Clock } from "lucide-react";
import { trustedDevices } from "@/lib/cyber-dna-data";

export function DeviceEcosystem() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {trustedDevices.map((d, i) => (
        <motion.div
          key={d.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ y: -3 }}
          className="rounded-xl border border-border/60 bg-background/40 p-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyber-cyan/10 text-cyber-cyan">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{d.name}</div>
                <div className="text-[11px] text-muted-foreground">{d.os} · {d.browser}</div>
              </div>
            </div>
            {d.primary && (
              <span className="rounded-full bg-cyber-blue/10 px-2 py-0.5 text-[10px] font-semibold text-cyber-blue">
                Primary
              </span>
            )}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <Stat icon={ShieldCheck} label="Fingerprint" value={d.fingerprint} tone="text-success" />
            <Stat icon={HeartPulse} label="Health" value={d.health} tone="text-cyber-cyan" />
            <Stat icon={Clock} label="Last Seen" value={d.lastSeen} />
          </div>
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[11px]">
              <span className="text-muted-foreground">Trust Level</span>
              <span className="font-semibold text-cyber-cyan">{d.trust}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-cyan"
                initial={{ width: 0 }}
                animate={{ width: `${d.trust}%` }}
                transition={{ duration: 0.9 }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone = "text-foreground" }: { icon: typeof Smartphone; label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-border/40 bg-background/40 p-2">
      <Icon className={`mx-auto h-3.5 w-3.5 ${tone}`} />
      <div className="mt-1 text-[9px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={`text-[11px] font-semibold ${tone}`}>{value}</div>
    </div>
  );
}
