import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { riskEvolution } from "@/lib/cyber-dna-data";

export function RiskEvolution() {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={riskEvolution} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="month" stroke="#8b8b96" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis domain={[88, 100]} stroke="#8b8b96" fontSize={12} tickLine={false} axisLine={false} width={40} />
          <Tooltip
            contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
            formatter={(v: number) => [`${v}`, "Trust Score"]}
          />
          <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: "#22d3ee" }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
