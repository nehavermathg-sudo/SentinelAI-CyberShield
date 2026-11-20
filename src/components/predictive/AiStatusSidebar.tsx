import { motion } from "motion/react";
import { Activity, Cpu, ShieldCheck, Radar, Clock, HeartPulse, FileDown, FileText, Bot, Share2 } from "lucide-react";
import { toast } from "sonner";
import { aiStatus } from "@/lib/predictive-data";
import { Button } from "@/components/ui/button";

const rows = [
  { icon: Cpu, label: "Models Running", value: `${aiStatus.modelsRunning}`, tone: "#22d3ee" },
  { icon: Activity, label: "Prediction Accuracy", value: `${aiStatus.predictionAccuracy}%`, tone: "#22c55e" },
  { icon: Radar, label: "Behavior Models", value: `${aiStatus.behaviorModels}`, tone: "#3b82f6" },
  { icon: ShieldCheck, label: "Threat Models", value: `${aiStatus.threatModels}`, tone: "#a78bfa" },
  { icon: Clock, label: "Latest Update", value: aiStatus.latestUpdate, tone: "#f59e0b" },
  { icon: HeartPulse, label: "System Health", value: `${aiStatus.systemHealth}%`, tone: "#22c55e" },
];

const exportActions = [
  { label: "Generate Executive Report", icon: FileDown },
  { label: "Download Prediction Report", icon: FileText },
  { label: "Export AI Summary", icon: Bot },
  { label: "Share Security Briefing", icon: Share2 },
];

export function AiStatusSidebar() {
  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-5 shadow-[var(--shadow-premium)]">
        <div className="mb-4 flex items-center gap-2">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-cyber-cyan/10 text-cyber-cyan">
            <Activity className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card" />
          </span>
          <div>
            <h3 className="text-sm font-semibold">Current AI Status</h3>
            <p className="text-[11px] text-success">All systems operational</p>
          </div>
        </div>
        <div className="space-y-2">
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-3 py-2.5"
            >
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <r.icon className="h-3.5 w-3.5" style={{ color: r.tone }} />
                {r.label}
              </span>
              <span className="text-sm font-semibold tabular-nums" style={{ color: r.tone }}>{r.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-5 shadow-[var(--shadow-premium)]">
        <h3 className="mb-3 text-sm font-semibold">Export</h3>
        <div className="space-y-2">
          {exportActions.map((a, i) => (
            <Button
              key={a.label}
              variant={i === 0 ? "default" : "outline"}
              className="w-full justify-start rounded-xl"
              onClick={() => toast.success(`${a.label} started`, { description: "Preparing secure export…" })}
            >
              <a.icon className="mr-2 h-4 w-4" />
              {a.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}