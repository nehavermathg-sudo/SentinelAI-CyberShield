import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { transactions, type Decision } from "@/lib/soc-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const decisionStyles: Record<Decision, string> = {
  Allow: "bg-success/10 text-success",
  Verify: "bg-warning/10 text-warning",
  Blocked: "bg-danger/10 text-danger",
};

function riskColor(r: number) {
  if (r >= 80) return "bg-danger";
  if (r >= 50) return "bg-warning";
  if (r >= 25) return "bg-cyber-cyan";
  return "bg-success";
}

const PAGE_SIZE = 6;

export function TransactionMonitor() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter(
      (t) =>
        t.customer.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q),
    );
  }, [query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages - 1);
  const rows = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search customer, location, ID…"
            className="h-9 rounded-xl border-border bg-background/50 pl-9 text-sm"
          />
        </div>
        <Button variant="outline" size="sm" className="h-9 shrink-0 gap-1.5 rounded-xl border-border">
          <SlidersHorizontal className="h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Location</th>
              <th className="pb-2 font-medium">Device</th>
              <th className="pb-2 font-medium">AI Risk</th>
              <th className="pb-2 text-right font-medium">Decision</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr
                key={t.id}
                onClick={() => navigate({ to: "/dashboard/investigation" })}
                className="cursor-pointer border-t border-border/50 transition-colors hover:bg-white/5"
              >
                <td className="py-3 pr-3">
                  <div className="font-semibold">{t.customer}</div>
                  <div className="text-[11px] text-muted-foreground">{t.id}</div>
                </td>
                <td className="py-3 pr-3 font-semibold tabular-nums">{t.amount}</td>
                <td className="py-3 pr-3 text-muted-foreground">{t.location}</td>
                <td className="py-3 pr-3 text-muted-foreground">{t.device}</td>
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                      <div className={cn("h-full rounded-full", riskColor(t.risk))} style={{ width: `${t.risk}%` }} />
                    </div>
                    <span className="tabular-nums text-xs font-semibold">{t.risk}</span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", decisionStyles[t.decision])}>
                    {t.decision}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  No transactions match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-muted-foreground">
          Page {safePage + 1} of {pages} · {filtered.length} results
        </span>
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg border-border"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg border-border"
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={safePage >= pages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}