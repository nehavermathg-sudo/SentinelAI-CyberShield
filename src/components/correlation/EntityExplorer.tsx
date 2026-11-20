import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { entityRows } from "@/lib/correlation-data";
import { severityStyles } from "@/lib/soc-data";
import { cn } from "@/lib/utils";

export function EntityExplorer() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return entityRows;
    return entityRows.filter(
      (r) => r.entity.toLowerCase().includes(t) || r.type.toLowerCase().includes(t) || r.status.toLowerCase().includes(t),
    );
  }, [q]);

  return (
    <div>
      <div className="relative mb-3 max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search entities…"
          className="h-9 rounded-xl border-border bg-background/50 pl-9 text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="py-2 pr-4">Entity</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Risk</th>
              <th className="py-2 pr-4">Confidence</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2">Events</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const s = severityStyles[r.risk];
              return (
                <tr key={r.entity} className="border-b border-border/40 transition-colors hover:bg-white/5">
                  <td className="py-2.5 pr-4 font-medium">{r.entity}</td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{r.type}</td>
                  <td className="py-2.5 pr-4">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", s.bg, s.text)}>
                      {r.risk}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums">{r.confidence}%</td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{r.status}</td>
                  <td className="py-2.5 tabular-nums text-muted-foreground">{r.relatedEvents}</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">No entities match “{q}”.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
