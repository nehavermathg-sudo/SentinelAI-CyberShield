import { motion } from "motion/react";
import { CheckCircle2, Package, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { forensicItems } from "@/lib/evidence-data";

export function ForensicPackage() {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {forensicItems.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
            <span className="text-sm">{item}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-cyber-cyan/20 bg-cyber-cyan/5 p-6 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cyber-cyan/10 text-cyber-cyan">
          <Package className="h-7 w-7" />
        </span>
        <div className="mt-3 text-sm font-semibold">Forensic Investigation Package</div>
        <div className="text-xs text-muted-foreground">Signed · Immutable · Audit-ready</div>
        <Button
          className="mt-4 rounded-xl"
          onClick={() => toast.success("Forensic package generated", { description: "Bundling all evidence, timelines and signatures…" })}
        >
          <Download className="mr-2 h-4 w-4" /> Generate Package
        </Button>
      </div>
    </div>
  );
}