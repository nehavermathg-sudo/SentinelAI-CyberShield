import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { dnaRecommendations } from "@/lib/cyber-dna-data";

export function DnaRecommendations() {
  return (
    <div className="space-y-2">
      {dnaRecommendations.map((r, i) => (
        <motion.div
          key={r}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex items-center gap-3 rounded-xl border border-success/20 bg-success/5 p-3"
        >
          <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
          <span className="text-sm font-medium">{r}</span>
        </motion.div>
      ))}
    </div>
  );
}
