import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
  const [now, setNow] = useState(new Date());
  const [spin, setSpin] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setLastRefresh((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const date = now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  const badges = [
    { label: "PRODUCTION", tone: "bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30" },
    { label: "LIVE", tone: "bg-success/10 text-success border-success/30", pulse: true },
    { label: "SOC CONNECTED", tone: "bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 xl:items-center"
    >
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-cyan">
          Security Operations Center
        </p>
        <h1 className="mt-1 truncate text-2xl font-extrabold tracking-tight sm:text-3xl">
          SOC Dashboard
        </h1>
        <p className="mt-0.5 max-w-2xl text-sm text-muted-foreground">
          Real-time AI-powered Banking Cyber Defense Platform
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {badges.map((b) => (
            <span
              key={b.label}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
                b.tone,
              )}
            >
              {b.pulse && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
              )}
              {b.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="hidden rounded-2xl border border-border bg-card/60 p-3 text-right backdrop-blur-sm sm:block">
          <div className="grid grid-cols-2 gap-x-5 gap-y-2 text-right">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Current Time</div>
              <div className="font-mono text-base font-bold tabular-nums text-foreground">{time}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Timezone</div>
              <div className="font-mono text-base font-bold tabular-nums text-foreground">UTC +05:30</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Last Refresh</div>
              <div className="text-sm font-semibold text-foreground">{lastRefresh}s ago</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Auto Refresh</div>
              <div className="inline-flex items-center gap-1 text-sm font-bold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> ON
              </div>
            </div>
          </div>
          <div className="mt-2 border-t border-border pt-2 text-xs text-muted-foreground">{date}</div>
        </div>
        <Button
          variant="outline"
          className="h-9 shrink-0 gap-2 rounded-xl border-border"
          aria-label="Refresh data"
          onClick={() => {
            setSpin(true);
            setLastRefresh(0);
            window.setTimeout(() => setSpin(false), 800);
          }}
        >
          <RefreshCw className={`h-4 w-4 ${spin ? "animate-spin" : ""}`} />
          <span className="text-sm font-medium">Refresh</span>
        </Button>
      </div>
    </motion.div>
  );
}