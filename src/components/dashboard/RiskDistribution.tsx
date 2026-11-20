import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { riskDistribution } from "@/lib/soc-data";

export function RiskDistribution() {
  const total = riskDistribution.reduce((s, d) => s + d.value, 0);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-40 w-40 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riskDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={52}
              outerRadius={72}
              paddingAngle={3}
              stroke="none"
            >
              {riskDistribution.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold tabular-nums">{total.toLocaleString("en-IN")}</span>
          <span className="text-[11px] text-muted-foreground">Assessed</span>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        {riskDistribution.map((d) => (
          <div key={d.name} className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2">
            <span className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
              {d.name}
            </span>
            <span className="text-sm font-semibold tabular-nums">
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}