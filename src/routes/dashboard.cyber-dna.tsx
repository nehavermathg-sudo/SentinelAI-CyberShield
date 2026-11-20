import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Fingerprint,
  Dna,
  Activity,
  Smartphone,
  MapPin,
  LineChart as LineChartIcon,
  Brain,
  ShieldAlert,
  Sparkles,
  Gauge,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";

import { SectionCard } from "@/components/dashboard/SectionCard";
import { DnaSummaryCards } from "@/components/cyber-dna/DnaSummaryCards";
import { IdentityHero } from "@/components/cyber-dna/IdentityHero";
import { DnaVisualization } from "@/components/cyber-dna/DnaVisualization";
import { BehaviorProfile } from "@/components/cyber-dna/BehaviorProfile";
import { DeviceEcosystem } from "@/components/cyber-dna/DeviceEcosystem";
import { LocationIntelligence } from "@/components/cyber-dna/LocationIntelligence";
import { BehaviorEvolution } from "@/components/cyber-dna/BehaviorEvolution";
import { AiInsights } from "@/components/cyber-dna/AiInsights";
import { AnomalyDetection } from "@/components/cyber-dna/AnomalyDetection";
import { PredictiveBehavior } from "@/components/cyber-dna/PredictiveBehavior";
import { TrustBreakdown } from "@/components/cyber-dna/TrustBreakdown";
import { RiskEvolution } from "@/components/cyber-dna/RiskEvolution";
import { DnaRecommendations } from "@/components/cyber-dna/DnaRecommendations";
import { ExportBar } from "@/components/cyber-dna/ExportBar";

export const Route = createFileRoute("/dashboard/cyber-dna")({
  head: () => ({
    meta: [
      { title: "Cyber DNA™ — SentinelAI" },
      {
        name: "description",
        content:
          "AI-generated behavioral identity built from customer activity, cybersecurity telemetry and transaction intelligence.",
      },
    ],
  }),
  component: CyberDnaPage,
});

function CyberDnaPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyber-cyan/10 text-cyber-cyan">
            <Fingerprint className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Cyber DNA<span className="align-super text-sm text-cyber-cyan">™</span>
          </h1>
        </div>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          AI-generated behavioral identity built from customer activity, cybersecurity telemetry and transaction
          intelligence.
        </p>
      </motion.div>

      <DnaSummaryCards />

      <IdentityHero />

      <SectionCard
        title="Cyber DNA Visualization"
        subtitle="Connected behavioral dimensions forming the customer's digital identity"
        icon={Dna}
      >
        <DnaVisualization />
      </SectionCard>

      <SectionCard title="Behavior Profile" subtitle="Baseline behavioral fingerprint across 15 dimensions" icon={Activity}>
        <BehaviorProfile />
      </SectionCard>

      <SectionCard title="Trusted Device Ecosystem" subtitle="Verified devices bound to this identity" icon={Smartphone}>
        <DeviceEcosystem />
      </SectionCard>

      <SectionCard title="Location Intelligence" subtitle="Geo-spatial behavioral consistency" icon={MapPin}>
        <LocationIntelligence />
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SectionCard title="Behavior Evolution" subtitle="Behavior score · previous 12 months" icon={LineChartIcon}>
          <BehaviorEvolution />
        </SectionCard>
        <SectionCard title="Trust Score Breakdown" subtitle="Contributing trust dimensions" icon={Gauge}>
          <TrustBreakdown />
        </SectionCard>
      </div>

      <SectionCard title="AI Behavior Insights" subtitle="SentinelAI reasoning summary" icon={Brain}>
        <AiInsights />
      </SectionCard>

      <SectionCard title="Anomaly Detection" subtitle="Behavioral deviations against baseline" icon={ShieldAlert}>
        <AnomalyDetection />
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SectionCard title="Predictive Behavior" subtitle="AI-forecasted next activity" icon={Sparkles}>
          <PredictiveBehavior />
        </SectionCard>
        <SectionCard title="Risk Evolution" subtitle="Trust score trend · last 6 months" icon={TrendingDown}>
          <RiskEvolution />
        </SectionCard>
      </div>

      <SectionCard title="AI Recommendations" subtitle="Automated posture guidance" icon={ShieldCheck}>
        <DnaRecommendations />
      </SectionCard>

      <SectionCard title="Export & Share" subtitle="Distribute the behavioral identity report" icon={Fingerprint}>
        <ExportBar />
      </SectionCard>
    </div>
  );
}
