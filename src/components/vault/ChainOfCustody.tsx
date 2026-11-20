import { motion } from "motion/react";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { chainOfCustody } from "@/lib/evidence-data";

export function ChainOfCustody() {
  return (
    <ol className="relative space-y-4 pl-2">
      {chainOfCustody.map((step, i) => {
        const active = step.status === "active";
        return (
          <motion.li
            key={step.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative flex gap-3"
          >
            <div className="flex flex-col items-center">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                  active ? "bg-cyber-cyan/15 text-cyber-cyan" : "bg-success/15 text-success"
                }`}
              >
                {active ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              </span>
              {i < chainOfCustody.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
            </div>
            <div className="min-w-0 flex-1 rounded-xl border border-border/60 bg-background/40 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  {step.label}
                  {!active && <ShieldCheck className="h-3.5 w-3.5 text-success" />}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{step.time}</span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                <span>{step.officer}</span>
                <span className="font-mono text-cyber-cyan/80">{step.signature}</span>
                <span className={active ? "text-cyber-cyan" : "text-success"}>
                  {active ? "In Progress" : "Signed & Verified"}
                </span>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}