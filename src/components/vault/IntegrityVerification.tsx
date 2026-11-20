import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { integrityChecks } from "@/lib/evidence-data";

export function IntegrityVerification() {
  return (
    <div className="grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 p-6">
        <div className="relative grid h-24 w-24 place-items-center rounded-full bg-success/10 text-success">
          <span className="absolute inset-0 animate-pulse-ring rounded-full" />
          <ShieldCheck className="h-10 w-10" />
        </div>
        <div className="mt-3 text-3xl font-extrabold text-success">100%</div>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Verification Score</div>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {integrityChecks.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 rounded-xl border border-success/20 bg-success/5 p-3"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
            <div className="min-w-0 flex-1">
              <div className="text-xs text-muted-foreground">{c.label}</div>
              <div className="text-sm font-semibold text-success">{c.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}