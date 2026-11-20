import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Gavel } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { analystActions, type AnalystAction } from "@/lib/investigation-data";

const toneRing: Record<AnalystAction["tone"], string> = {
  danger: "hover:border-danger/50 hover:text-danger",
  warning: "hover:border-warning/50 hover:text-warning",
  success: "hover:border-success/50 hover:text-success",
  cyan: "hover:border-cyber-cyan/50 hover:text-cyber-cyan",
  default: "hover:border-foreground/30",
};

const toneIcon: Record<AnalystAction["tone"], string> = {
  danger: "text-danger bg-danger/10",
  warning: "text-warning bg-warning/10",
  success: "text-success bg-success/10",
  cyan: "text-cyber-cyan bg-cyber-cyan/10",
  default: "text-muted-foreground bg-white/5",
};

export function ActionsTab() {
  const [active, setActive] = useState<AnalystAction | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const confirm = () => {
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      toast.success(`${active?.label} executed`, { description: "Action recorded to the case activity log." });
      setActive(null);
      setNote("");
    }, 900);
  };

  return (
    <SectionCard title="Analyst Action Center" subtitle="Decision & response controls" icon={Gavel}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {analystActions.map((a, i) => (
          <motion.button
            key={a.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ y: -2 }}
            onClick={() => setActive(a)}
            className={cn(
              "flex items-center gap-3 rounded-2xl border border-border/60 bg-background/40 p-4 text-left transition-colors",
              toneRing[a.tone],
            )}
          >
            <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", toneIcon[a.tone])}>
              <a.icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold">{a.label}</span>
          </motion.button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>{active?.label}</DialogTitle>
            <DialogDescription>{active?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Analyst note (optional)</label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add context for the audit trail…"
              className="min-h-[90px] resize-none bg-background/50"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActive(null)}>
              Cancel
            </Button>
            <Button onClick={confirm} disabled={busy}>
              {busy ? "Processing…" : "Confirm Action"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SectionCard>
  );
}