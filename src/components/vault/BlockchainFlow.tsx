import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { blockchainFlow } from "@/lib/evidence-data";

export function BlockchainFlow() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {blockchainFlow.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12 }}
            className="relative overflow-hidden rounded-xl border border-cyber-cyan/25 bg-cyber-cyan/5 px-3.5 py-2.5 text-center text-xs font-semibold text-cyber-cyan"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-cyan/15 to-transparent"
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
            <span className="relative">{step}</span>
          </motion.div>
          {i < blockchainFlow.length - 1 && (
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  );
}