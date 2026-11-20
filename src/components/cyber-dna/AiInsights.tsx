import { motion } from "motion/react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { aiInsights } from "@/lib/cyber-dna-data";

export function AiInsights() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-cyber-cyan/20 bg-gradient-to-br from-cyber-blue/5 to-cyber-cyan/5 p-5">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyber-cyan/10 blur-3xl" />
      <div className="relative flex items-center gap-2 text-cyber-cyan">
        <Sparkles className="h-5 w-5" />
        <span className="text-sm font-semibold">SentinelAI Reasoning Engine</span>
        <span className="ml-auto rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
          Confidence 98%
        </span>
      </div>
      <ul className="relative mt-4 space-y-3">
        {aiInsights.map((line, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyber-cyan" />
            <span>{line}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
