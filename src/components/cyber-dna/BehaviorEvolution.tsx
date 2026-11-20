import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { behaviorEvolution } from "@/lib/cyber-dna-data";

export function BehaviorEvolution() {
  return (
    <>
      <div className="mb-3 flex flex-wrap gap-4 text-xs">
        <Legend color="#22c55e" label="Stable" />
        <Legend color="#22d3ee" label="Improving" />
        <Legend color="#f59e0b" label="Drifting" />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={behaviorEvolution} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="evo-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" stroke="#8b8b96" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis domain={[80, 100]} stroke="#8b8b96" fontSize={12} tickLine={false} axisLine={false} width={40} />
            <Tooltip
              contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
              formatter={(v: number) => [`${v}`, "Behavior Score"]}
            />
            <Area type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2.5} fill="url(#evo-grad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} /> {label}
    </span>
  );
}
