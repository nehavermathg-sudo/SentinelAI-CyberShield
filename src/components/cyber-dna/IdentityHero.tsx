import { motion } from "motion/react";
import { Fingerprint, ShieldCheck, Smartphone, MapPin, Wallet, Activity, BadgeCheck, CalendarClock } from "lucide-react";
import { digitalIdentity } from "@/lib/cyber-dna-data";

const stats = [
  { label: "Customer ID", value: digitalIdentity.customerId, icon: BadgeCheck },
  { label: "Relationship Since", value: digitalIdentity.relationshipSince, icon: CalendarClock },
  { label: "Trusted Devices", value: String(digitalIdentity.trustedDevices), icon: Smartphone },
  { label: "Trusted Locations", value: String(digitalIdentity.trustedLocations), icon: MapPin },
  { label: "Preferred Payment", value: digitalIdentity.preferredPayment, icon: Wallet },
  { label: "Behavior Status", value: digitalIdentity.behaviorStatus, icon: Activity },
];

export function IdentityHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass relative overflow-hidden rounded-2xl p-6 shadow-[var(--shadow-premium)]"
    >
      <div className="cyber-grid animate-grid-pan pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyber-cyan/10 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">
          <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyber-blue/20 to-cyber-cyan/20">
            <span className="absolute inset-0 rounded-2xl animate-pulse-ring" />
            <Fingerprint className="h-10 w-10 text-cyber-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight">{digitalIdentity.customer}</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                <ShieldCheck className="h-3 w-3" /> {digitalIdentity.aiIdentity}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">AI Generated Digital Identity · continuously evolving</p>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border/60 bg-background/40 p-3">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                <s.icon className="h-3.5 w-3.5 text-cyber-cyan" /> {s.label}
              </div>
              <div className="mt-1 text-sm font-semibold">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
