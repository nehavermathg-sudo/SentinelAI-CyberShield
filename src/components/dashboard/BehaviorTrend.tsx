import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { behaviorTrend } from "@/lib/soc-data";

export function BehaviorTrend() {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={behaviorTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="bt-normal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="bt-anomaly" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: "#8b8b96", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#8b8b96", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "#18181b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              fontSize: 12,
            }}
            labelStyle={{ color: "#f4f4f5" }}
          />
          <Area type="monotone" dataKey="normal" stroke="#22d3ee" strokeWidth={2} fill="url(#bt-normal)" name="Normal" />
          <Area type="monotone" dataKey="anomaly" stroke="#ef4444" strokeWidth={2} fill="url(#bt-anomaly)" name="Anomaly" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}