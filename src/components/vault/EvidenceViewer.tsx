import { useState } from "react";
import { motion } from "motion/react";
import { Download, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { viewerTabs } from "@/lib/evidence-data";

export function EvidenceViewer() {
  const [active, setActive] = useState(viewerTabs[0].id);
  const tab = viewerTabs.find((t) => t.id === active)!;
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {viewerTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
              active === t.id
                ? "bg-cyber-cyan/15 text-cyber-cyan"
                : "border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      <motion.div
        key={tab.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border/60 bg-background/40 p-4"
      >
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyber-cyan/10 text-cyber-cyan">
                <tab.icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold">{tab.label}</span>
              <span className="flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                <ShieldCheck className="h-3 w-3" /> Integrity Verified
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{tab.summary}</p>
          </div>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => toast.success(`${tab.label} download started`, { description: "Preparing signed evidence artifact…" })}
          >
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tab.meta.map((m) => (
            <div key={m.label} className="rounded-lg bg-white/5 p-3">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.label}</div>
              <div className="mt-0.5 text-sm font-semibold">{m.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}