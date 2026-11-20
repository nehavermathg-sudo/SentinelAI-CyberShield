import { useNavigate } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { incidents, severityStyles } from "@/lib/soc-data";

export function IncidentsTable() {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
            <th className="pb-2 font-medium">Incident ID</th>
            <th className="pb-2 font-medium">Customer</th>
            <th className="pb-2 font-medium">Risk</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Assigned To</th>
            <th className="pb-2 text-right font-medium">Time</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((i) => {
            const s = severityStyles[i.risk];
            return (
              <tr
                key={i.id}
                onClick={() => navigate({ to: "/dashboard/investigation" })}
                className="cursor-pointer border-t border-border/50 transition-colors hover:bg-white/5"
              >
                <td className="py-3 pr-3 font-semibold text-cyber-cyan">{i.id}</td>
                <td className="py-3 pr-3">{i.customer}</td>
                <td className="py-3 pr-3">
                  <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold uppercase", s.bg, s.text)}>
                    {i.risk}
                  </span>
                </td>
                <td className="py-3 pr-3 text-muted-foreground">{i.status}</td>
                <td className="py-3 pr-3 text-muted-foreground">{i.assignee}</td>
                <td className="py-3 text-right text-[11px] text-muted-foreground">{i.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}