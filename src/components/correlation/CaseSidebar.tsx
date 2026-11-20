import { Siren } from "lucide-react";
import { FileDown, Share2, Download, UserPlus, FileText } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { caseMeta } from "@/lib/correlation-data";

const meta = [
  { label: "Current Case", value: caseMeta.id },
  { label: "Risk", value: caseMeta.risk, tone: "text-danger" },
  { label: "Evidence Count", value: String(caseMeta.evidenceCount) },
  { label: "Signals", value: caseMeta.signals },
  { label: "Analyst", value: caseMeta.analyst },
  { label: "Investigation Time", value: caseMeta.investigationTime },
];

const actions = [
  { label: "Generate AI Report", icon: FileText },
  { label: "Export Correlation Graph", icon: FileDown },
  { label: "Download Evidence", icon: Download },
  { label: "Assign Case", icon: UserPlus },
  { label: "Share Investigation", icon: Share2 },
];

export function CaseSidebar() {
  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-5 shadow-[var(--shadow-premium)]">
        <div className="mb-4 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-danger/10 text-danger">
            <Siren className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-semibold">Active Investigation</h3>
            <p className="text-xs text-muted-foreground">Live correlation case</p>
          </div>
        </div>
        <div className="space-y-2">
          {meta.map((m) => (
            <div key={m.label} className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <span className={`text-sm font-semibold ${m.tone ?? ""}`}>{m.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-danger/30 bg-danger/5 p-3">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Recommended Action</div>
          <div className="mt-1 text-sm font-semibold text-danger">{caseMeta.recommendedAction}</div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 shadow-[var(--shadow-premium)]">
        <h3 className="mb-3 text-sm font-semibold">Action Panel</h3>
        <div className="space-y-2">
          {actions.map((a, i) => (
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
