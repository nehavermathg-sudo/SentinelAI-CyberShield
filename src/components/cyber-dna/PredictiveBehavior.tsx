import { motion } from "motion/react";
import { Sparkles, Clock, Wallet, CreditCard, MapPin, Smartphone, Store } from "lucide-react";
import { predictiveBehavior } from "@/lib/cyber-dna-data";

const icons = [Clock, Wallet, CreditCard, MapPin, Smartphone, Store];

export function PredictiveBehavior() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-cyber-cyan/20 bg-cyber-cyan/5 p-3">
        <Sparkles className="h-4 w-4 text-cyber-cyan" />
        <span className="text-sm font-semibold">Predicted next activity</span>
        <span className="ml-auto text-sm font-bold text-cyber-cyan">{predictiveBehavior.confidence}% confidence</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {predictiveBehavior.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-border/60 bg-background/40 p-3"
            >
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-cyber-cyan" /> {item.label}
              </div>
              <div className="mt-1 text-sm font-semibold">{item.value}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
