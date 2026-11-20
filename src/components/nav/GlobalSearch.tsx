import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { searchAll } from "@/lib/search-index";
import { useRecentActivity } from "@/hooks/useRecentActivity";

const SUGGESTIONS = [
  { label: "Critical incidents", to: "/dashboard/incidents", category: "Incidents" },
  { label: "High-value transactions", to: "/dashboard/transactions", category: "Transactions" },
  { label: "Predictive threat forecast", to: "/dashboard/threats", category: "Intelligence" },
  { label: "Open investigations", to: "/dashboard/investigation", category: "Investigation" },
];

export function GlobalSearch({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { items: recent, track } = useRecentActivity();

  const results = useMemo(() => searchAll(query), [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const go = (to: string, label: string, category: string) => {
    track({ to, label, category });
    navigate({ to });
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        placeholder="Search incidents, transactions, customers, devices, IP addresses, investigation IDs…"
        className="h-10 rounded-xl border-border bg-card/60 pl-9 pr-8 text-sm focus-visible:ring-primary/40"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {open && !query.trim() && (
        <div className="absolute left-0 right-0 top-12 z-50 max-h-96 overflow-y-auto rounded-2xl border border-border bg-popover/95 p-2 shadow-[var(--shadow-premium)] backdrop-blur-xl animate-fade-in">
          {recent.length > 0 && (
            <>
              <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                Recent Searches
              </div>
              {recent.slice(0, 4).map((r) => (
                <button
                  key={`recent-${r.to}-${r.label}`}
                  onClick={() => go(r.to, r.label, r.category)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{r.label}</span>
                  <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {r.category}
                  </span>
                </button>
              ))}
            </>
          )}
          <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
            Suggestions
          </div>
          {SUGGESTIONS.map((s) => (
            <button
              key={`sugg-${s.to}`}
              onClick={() => go(s.to, s.label, s.category)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/5"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cyber-cyan/10 text-cyber-cyan">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{s.label}</span>
              <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {s.category}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-12 z-50 max-h-96 overflow-y-auto rounded-2xl border border-border bg-popover/95 p-2 shadow-[var(--shadow-premium)] backdrop-blur-xl animate-fade-in">
          {results.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for “{query}”.
            </div>
          ) : (
            results.map((r) => (
              <button
                key={`${r.category}-${r.id}`}
                onClick={() => go(r.to, r.label, r.category)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cyber-cyan/10 text-cyber-cyan">
                  <r.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{r.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">{r.sublabel}</span>
                </span>
                <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {r.category}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}