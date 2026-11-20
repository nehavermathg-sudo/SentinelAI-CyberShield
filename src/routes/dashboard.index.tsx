import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Gauge,
  BrainCircuit,
  Radar,
  Activity,
  PieChart,
  Map,
  Siren,
  Sparkles,
  LineChart,
  ShieldHalf,
} from "lucide-react";

import { MetricCard, type MetricCardProps } from "@/components/dashboard/MetricCard";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SecurityStatusBanner } from "@/components/dashboard/SecurityStatusBanner";
import { LiveThreatFeed } from "@/components/dashboard/LiveThreatFeed";
import { TransactionMonitor } from "@/components/dashboard/TransactionMonitor";
import { RiskDistribution } from "@/components/dashboard/RiskDistribution";
import { FraudHeatmap } from "@/components/dashboard/FraudHeatmap";
import { IncidentsTable } from "@/components/dashboard/IncidentsTable";
import { AiRecommendations } from "@/components/dashboard/AiRecommendations";
import { BehaviorTrend } from "@/components/dashboard/BehaviorTrend";
import { ThreatIntelFeed } from "@/components/dashboard/ThreatIntelFeed";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [{ title: "SOC Overview — SentinelAI" }],
  }),
  component: DashboardHome,
});

const metrics: MetricCardProps[] = [
  {
    label: "Today's Transactions",
    value: 128542,
    delta: "+12%",
    up: true,
    icon: ArrowLeftRight,
    tone: "blue",
    spark: [40, 55, 48, 62, 58, 74, 80, 92],
  },
  {
    label: "High Risk Transactions",
    value: 248,
    delta: "+8%",
    up: false,
    icon: AlertTriangle,
    tone: "amber",
    spark: [20, 28, 24, 35, 42, 38, 46, 52],
  },
  {
    label: "Blocked Fraud Attempts",
    value: 81,
    delta: "+22%",
    up: true,
    icon: ShieldCheck,
    tone: "cyan",
    spark: [10, 18, 15, 28, 32, 40, 55, 62],
  },
  {
    label: "Active Security Alerts",
    value: 17,
    badge: "Critical",
    icon: ShieldAlert,
    tone: "red",
    spark: [30, 22, 34, 28, 40, 36, 44, 48],
  },
  {
    label: "Average AI Risk Score",
    value: 18,
    suffix: "%",
    delta: "Healthy",
    up: true,
    icon: Gauge,
    tone: "green",
    spark: [26, 24, 22, 20, 21, 19, 18, 18],
  },
  {
    label: "Behavior Models",
    value: 98.9,
    suffix: "%",
    delta: "Learning",
    up: true,
    icon: BrainCircuit,
    tone: "violet",
    spark: [88, 90, 92, 94, 95, 97, 98, 99],
    format: (n) => n.toString(),
  },
];

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium text-cyber-cyan">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-cyan/70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-cyan" />
      </span>
      Live
    </span>
  );
}

function DashboardHome() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <SecurityStatusBanner />

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Main 3-column grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <SectionCard
          title="Live Threat Feed"
          subtitle="Streaming detections"
          icon={Radar}
          action={<LiveBadge />}
          className="xl:col-span-3"
        >
          <LiveThreatFeed />
        </SectionCard>

        <SectionCard
          title="Live Transaction Monitoring"
          subtitle="Real-time banking activity & AI decisions"
          icon={ArrowLeftRight}
          className="xl:col-span-6"
        >
          <TransactionMonitor />
        </SectionCard>

        <div className="space-y-6 xl:col-span-3">
          <SectionCard title="AI Risk Distribution" subtitle="Population risk split" icon={PieChart}>
            <RiskDistribution />
          </SectionCard>
          <SectionCard title="Fraud Heatmap" subtitle="Geographic risk · India" icon={Map}>
            <FraudHeatmap />
          </SectionCard>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard
          title="Recent Security Incidents"
          subtitle="Active investigations"
          icon={Siren}
          className="lg:col-span-2 xl:col-span-1"
        >
          <IncidentsTable />
        </SectionCard>
        <SectionCard title="AI Recommendations" subtitle="Explainable next actions" icon={Sparkles}>
          <AiRecommendations />
        </SectionCard>
        <SectionCard title="Behavioral Trends" subtitle="Customer behavior · last 7 days" icon={LineChart}>
          <BehaviorTrend />
        </SectionCard>
        <SectionCard title="Threat Intelligence Feed" subtitle="Latest global signals" icon={ShieldHalf}>
          <ThreatIntelFeed />
        </SectionCard>
      </div>
    </div>
  );
}