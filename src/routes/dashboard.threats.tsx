import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Brain,
  Sparkles,
  CalendarClock,
  Bot,
  Map,
  ListChecks,
  Lightbulb,
  SlidersHorizontal,
  TrendingUp,
  LayoutDashboard,
  Wand2,
} from "lucide-react";

import { SectionCard } from "@/components/dashboard/SectionCard";
import { PredictiveKpis } from "@/components/predictive/PredictiveKpis";
import { ThreatForecastHero } from "@/components/predictive/ThreatForecastHero";
import { AttackForecastTimeline } from "@/components/predictive/AttackForecastTimeline";
import { SecurityCopilot } from "@/components/predictive/SecurityCopilot";
import { PredictiveRiskMap } from "@/components/predictive/PredictiveRiskMap";
import { CustomerWatchlist } from "@/components/predictive/CustomerWatchlist";
import { PredictiveInsights } from "@/components/predictive/PredictiveInsights";
import { PredictiveSimulator } from "@/components/predictive/PredictiveSimulator";
import { ExecutiveDashboard } from "@/components/predictive/ExecutiveDashboard";
import { RecommendationEngine } from "@/components/predictive/RecommendationEngine";
import { AiStatusSidebar } from "@/components/predictive/AiStatusSidebar";
import { predictiveKpis, businessImpact } from "@/lib/predictive-data";

export const Route = createFileRoute("/dashboard/threats")({
  head: () => ({
    meta: [
      { title: "Predictive Threat Intelligence™ — SentinelAI" },
      {
        name: "description",
        content:
          "AI-powered forecasting engine that predicts banking fraud before transactions become successful.",
      },
    ],
  }),
  component: PredictivePage,
});

function PredictivePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyber-cyan/10 text-cyber-cyan">
            <Brain className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Predictive Threat Intelligence
            <span className="align-super text-sm text-cyber-cyan">™</span>
          </h1>
        </div>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          AI-powered forecasting engine that predicts banking fraud before transactions become successful.
        </p>
      </motion.div>

      <PredictiveKpis items={predictiveKpis} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <SectionCard title="AI Prediction Center" subtitle="Forward-looking threat projection" icon={Sparkles}>
            <ThreatForecastHero />
          </SectionCard>

          <SectionCard title="Attack Forecast Timeline" subtitle="Expected threats across the day" icon={CalendarClock}>
            <AttackForecastTimeline />
          </SectionCard>

          <SectionCard
            title="AI Security Copilot"
            subtitle="Conversational assistant · natural-language answers"
            icon={Bot}
          >
            <SecurityCopilot />
          </SectionCard>

          <SectionCard title="Predictive Risk Map" subtitle="Regional fraud density & predicted attacks" icon={Map}>
            <PredictiveRiskMap />
          </SectionCard>

          <SectionCard title="Customer Risk Watchlist" subtitle="Predicted high-risk accounts" icon={ListChecks}>
            <CustomerWatchlist />
          </SectionCard>

          <SectionCard title="Predictive AI Insights" subtitle="Behavioral intelligence narrative" icon={Lightbulb}>
            <PredictiveInsights />
          </SectionCard>

          <SectionCard title="What-If Simulator" subtitle="Test controls, see fraud probability shift" icon={SlidersHorizontal}>
            <PredictiveSimulator />
          </SectionCard>

          <SectionCard title="Business Impact" subtitle="Value delivered by predictive prevention" icon={TrendingUp}>
            <PredictiveKpis items={businessImpact} />
          </SectionCard>

          <SectionCard title="Executive Dashboard" subtitle="Leadership summary" icon={LayoutDashboard}>
            <ExecutiveDashboard />
          </SectionCard>

          <SectionCard title="AI Recommendation Engine" subtitle="Prioritized mitigations" icon={Wand2}>
            <RecommendationEngine />
          </SectionCard>
        </div>

        <aside className="xl:sticky xl:top-6 xl:h-fit">
          <AiStatusSidebar />
        </aside>
      </div>
    </div>
  );
}
