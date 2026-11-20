import { motion } from "motion/react";
import { ClipboardList, Gauge, GitBranch, Sparkles, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { InfoGrid } from "@/components/investigation/InfoGrid";
import { ThreatMeter } from "@/components/investigation/ThreatMeter";
import {
  incidentSummary,
  quickTimeline,
  immediateRecommendations,
  investigationCase,
} from "@/lib/investigation-data";
import { severityStyles } from "@/lib/soc-data";

export function OverviewTab() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <SectionCard
        title="Incident Summary"
        subtitle="Executive overview"
        icon={ClipboardList}
        className="xl:col-span-2"
      >
        <InfoGrid items={incidentSummary} columns={3} />
      </SectionCard>

      <SectionCard title="Threat Severity Meter" subtitle="AI risk assessment" icon={Gauge}>
        <div className="py-2">
          <ThreatMeter score={investigationCase.riskScore} confidence={investigationCase.confidence} />
        </div>
      </SectionCard>

      <SectionCard
        title="Quick Incident Timeline"
        subtitle="Attack progression"
        icon={GitBranch}
        className="xl:col-span-2"
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {quickTimeline.map((node, i) => {
            const s = severityStyles[node.severity];
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3"
              >
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", s.bg, s.text)}>
                  <node.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{node.label}</div>
                  <div className="text-[11px] text-muted-foreground">{node.time}</div>
                </div>
                <span className={cn("h-2 w-2 rounded-full", s.dot)} />
              </motion.div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Immediate Recommendations" subtitle="AI next actions" icon={Sparkles}>
        <div className="space-y-2">
          {immediateRecommendations.map((r, i) => {
            const s = severityStyles[r.severity];
            return (
              <motion.button
                key={r.action}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3 text-left transition-colors hover:border-cyber-cyan/40 hover:bg-white/5"
              >
                <span className={cn("h-2 w-2 shrink-0 rounded-full", s.dot)} />
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{r.action}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-cyber-cyan" />
              </motion.button>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}