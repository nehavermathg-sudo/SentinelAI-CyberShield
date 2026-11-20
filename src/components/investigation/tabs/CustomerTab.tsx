import { motion } from "motion/react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { UserCircle, Activity, LineChart, MonitorSmartphone, MapPin, Plane } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { InfoGrid } from "@/components/investigation/InfoGrid";
import { behaviorIntel, endpointIntel, geoIntel, identityIntel, spendingHistory } from "@/lib/investigation-data";

export function CustomerTab() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <SectionCard title="Identity Intelligence" subtitle="KYC & relationship profile" icon={UserCircle}>
        <InfoGrid items={identityIntel} />
      </SectionCard>

      <SectionCard title="Behavior Intelligence" subtitle="Baseline spending profile" icon={Activity}>
        <InfoGrid items={behaviorIntel} />
      </SectionCard>

      <SectionCard
        title="Behavior History"
        subtitle="Spending pattern · last 7 days"
        icon={LineChart}
        className="xl:col-span-2"
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={spendingHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="spend-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#8b8b96" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8b8b96" fontSize={12} tickLine={false} axisLine={false} width={48} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Spend"]}
              />
              <Area type="monotone" dataKey="amount" stroke="#22d3ee" strokeWidth={2} fill="url(#spend-grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Sunday spend is <span className="font-semibold text-danger">24x</span> above the weekly average — a severe anomaly.
        </p>
      </SectionCard>

      <SectionCard title="Endpoint Intelligence" subtitle="Device & session forensics" icon={MonitorSmartphone}>
        <InfoGrid items={endpointIntel} />
      </SectionCard>

      <SectionCard title="Geo-Spatial Intelligence" subtitle="Location & travel analysis" icon={MapPin}>
        <div className="relative overflow-hidden rounded-xl border border-border/60 bg-background/40 p-4">
          <div className="cyber-grid absolute inset-0 opacity-20" />
          <div className="relative h-40">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute left-[22%] top-[62%] flex flex-col items-center"
            >
              <span className="h-3 w-3 rounded-full bg-cyber-cyan animate-pulse-ring" />
              <span className="mt-1 text-[10px] text-muted-foreground">Mumbai</span>
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute right-[22%] top-[24%] flex flex-col items-center"
            >
              <span className="h-3 w-3 rounded-full bg-danger animate-pulse-ring" />
              <span className="mt-1 text-[10px] text-muted-foreground">Delhi</span>
            </motion.span>
            <Plane className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-danger" />
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <Row label="Current Location" value={geoIntel.current} tone="danger" />
          <Row label="Previous Location" value={geoIntel.previous} />
          <Row label="Distance Travelled" value={geoIntel.distance} tone="warning" />
          <Row label="Expected Travel Time" value={geoIntel.expectedTravel} />
          <Row label="Impossible Travel" value={geoIntel.impossibleTravel ? "Detected" : "None"} tone="danger" />
        </div>
      </SectionCard>
    </div>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone?: "danger" | "warning" }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "font-semibold",
          tone === "danger" && "text-danger",
          tone === "warning" && "text-warning",
        )}
      >
        {value}
      </span>
    </div>
  );
}