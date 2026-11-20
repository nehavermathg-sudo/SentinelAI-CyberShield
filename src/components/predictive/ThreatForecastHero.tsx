import { motion } from "motion/react";
import { AlertTriangle, MapPin, Users, Crosshair, IndianRupee, Gauge } from "lucide-react";
import { AnimatedCounter } from "@/components/dashboard/AnimatedCounter";
import { forecast } from "@/lib/predictive-data";

const rows = [
  { icon: AlertTriangle, label: "Expected Fraud Attempts", value: `${forecast.expectedAttempts}`, tone: "#ef4444" },
  { icon: MapPin, label: "Highest Risk Region", value: forecast.highestRiskRegion, tone: "#f59e0b" },
  { icon: Users, label: "Most Vulnerable Customers", value: forecast.vulnerableCustomers, tone: "#a78bfa" },
  { icon: Crosshair, label: "Likely Attack Method", value: forecast.likelyAttackMethod, tone: "#22d3ee" },
  { icon: IndianRupee, label: "Expected Financial Impact", value: forecast.expectedImpact, tone: "#3b82f6" },
];

export function ThreatForecastHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyber-cyan/20 bg-gradient-to-br from-cyber-blue/10 via-card/60 to-card/40 p-6 shadow-[var(--shadow-glow)]">
      <div className="pointer-events-none absolute inset-0 cyber-grid animate-grid-pan opacity-40" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Next 24-Hour Threat Forecast</h3>
            <p className="text-xs text-muted-foreground">AI forward projection · updated continuously</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-3 py-1">
            <Gauge className="h-4 w-4 text-cyber-cyan" />
            <span className="text-sm font-bold text-cyber-cyan tabular-nums">
              <AnimatedCounter value={forecast.confidence} />%
            </span>
            <span className="text-[11px] text-muted-foreground">confidence</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ background: `${r.tone}1a`, color: r.tone }}>
                <r.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{r.label}</div>
                <div className="mt-0.5 text-sm font-semibold" style={{ color: r.tone }}>{r.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}