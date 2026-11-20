import { motion } from "motion/react";
import { BrainCircuit, ShieldAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Progress } from "@/components/ui/progress";
import { aiSummary, riskFactors } from "@/lib/investigation-data";
import { severityStyles } from "@/lib/soc-data";

export function AiAnalysisTab() {
  return (
    <div className="space-y-6">
      <SectionCard
        title="SentinelAI AI Investigation Summary"
        subtitle="Explainable behavioral reasoning"
        icon={BrainCircuit}
      >
        <div className="relative overflow-hidden rounded-xl border border-cyber-cyan/20 bg-gradient-to-br from-cyber-cyan/5 to-transparent p-5">
          <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
            {aiSummary.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/60 pt-4">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Estimated fraud probability</span>
            <span className="text-2xl font-extrabold text-danger tabular-nums">98%</span>
            <div className="ml-auto w-full max-w-xs">
              <Progress value={98} className="h-2" />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Risk Factors" subtitle="Correlated signals & business impact" icon={ShieldAlert}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {riskFactors.map((f, i) => {
            const s = severityStyles[f.severity];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-border/60 bg-background/40 p-4 transition-colors hover:border-cyber-cyan/40"
              >
                <div className="flex items-center justify-between">
                  <span className={cn("grid h-9 w-9 place-items-center rounded-lg", s.bg, s.text)}>
                    <f.icon className="h-4 w-4" />
                  </span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", s.bg, s.text)}>
                    {f.severity}
                  </span>
                </div>
                <div className="mt-3 text-sm font-semibold">{f.title}</div>
                <p className="mt-1 text-[11px] text-muted-foreground">{f.description}</p>
                <p className="mt-2 text-[11px] text-muted-foreground/80">
                  <span className="font-semibold text-foreground/70">Impact: </span>
                  {f.impact}
                </p>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Confidence</span>
                    <span className="tabular-nums">{f.confidence}%</span>
                  </div>
                  <Progress value={f.confidence} className="h-1.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}