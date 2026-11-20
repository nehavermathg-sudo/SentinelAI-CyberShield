import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Waypoints,
  Network,
  Clock,
  BrainCircuit,
  Grid3x3,
  BarChart3,
  Table2,
  GitBranch,
  Swords,
  TrendingUp,
  SlidersHorizontal,
} from "lucide-react";

import { SectionCard } from "@/components/dashboard/SectionCard";
import { KpiCards } from "@/components/correlation/KpiCards";
import { CorrelationGraph } from "@/components/correlation/CorrelationGraph";
import { CorrelationTimeline } from "@/components/correlation/CorrelationTimeline";
import { AiExplanation } from "@/components/correlation/AiExplanation";
import { CorrelationMatrix } from "@/components/correlation/CorrelationMatrix";
import { SignalContribution } from "@/components/correlation/SignalContribution";
import { EntityExplorer } from "@/components/correlation/EntityExplorer";
import { DecisionPath } from "@/components/correlation/DecisionPath";
import { AttackGraph } from "@/components/correlation/AttackGraph";
import { RiskPropagation } from "@/components/correlation/RiskPropagation";
import { WhatIfSimulator } from "@/components/correlation/WhatIfSimulator";
import { CaseSidebar } from "@/components/correlation/CaseSidebar";

export const Route = createFileRoute("/dashboard/correlation")({
  head: () => ({
    meta: [
      { title: "AI Correlation Engine™ — SentinelAI" },
      {
        name: "description",
        content:
          "Visualize relationships between customer behavior, cybersecurity telemetry and banking transactions using explainable AI.",
      },
    ],
  }),
  component: CorrelationPage,
});

function CorrelationPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyber-cyan/10 text-cyber-cyan">
            <Waypoints className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            AI Correlation Engine<span className="align-super text-sm text-cyber-cyan">™</span>
          </h1>
        </div>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          Visualize relationships between customer behavior, cybersecurity telemetry and banking transactions using
          explainable AI.
        </p>
      </motion.div>

      <KpiCards />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <SectionCard
            title="Correlation Graph"
            subtitle="Interactive relationship graph · drag nodes, click to inspect"
            icon={Network}
          >
            <CorrelationGraph />
          </SectionCard>

          <SectionCard title="Correlation Timeline" subtitle="Chronological attack reconstruction" icon={Clock}>
            <CorrelationTimeline />
          </SectionCard>

          <SectionCard title="AI Correlation Explanation" subtitle="Why SentinelAI reached its decision" icon={BrainCircuit}>
            <AiExplanation />
          </SectionCard>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SectionCard title="Correlation Matrix" subtitle="Entity relationship strength" icon={Grid3x3}>
              <CorrelationMatrix />
            </SectionCard>
            <SectionCard title="Signal Contribution" subtitle="Weighted risk drivers" icon={BarChart3}>
              <SignalContribution />
            </SectionCard>
          </div>

          <SectionCard title="Entity Explorer" subtitle="Searchable correlated entities" icon={Table2}>
            <EntityExplorer />
          </SectionCard>

          <SectionCard title="AI Decision Path" subtitle="From telemetry to verdict" icon={GitBranch}>
            <DecisionPath />
          </SectionCard>

          <SectionCard title="Attack Graph" subtitle="Reconstructed attack chain" icon={Swords}>
            <AttackGraph />
          </SectionCard>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SectionCard title="Risk Propagation" subtitle="How each signal escalated risk" icon={TrendingUp}>
              <RiskPropagation />
            </SectionCard>
            <SectionCard title="What-If Simulator" subtitle="Toggle signals to test the AI decision" icon={SlidersHorizontal}>
              <WhatIfSimulator />
            </SectionCard>
          </div>
        </div>

        <aside className="xl:sticky xl:top-6 xl:h-fit">
          <CaseSidebar />
        </aside>
      </div>
    </div>
  );
}
