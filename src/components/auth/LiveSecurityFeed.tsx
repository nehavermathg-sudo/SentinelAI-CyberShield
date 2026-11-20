import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const messages = [
  "Threat Intelligence Updated",
  "AI Engine Operational",
  "No Critical Incidents",
  "Security Rules Synced",
  "Behavioral Models Loaded",
];

export function LiveSecurityFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % messages.length),
      3000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="glass flex h-11 max-w-md items-center gap-2 overflow-hidden rounded-xl px-4">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-cyber-cyan">
        Live
      </span>
      <span className="h-4 w-px bg-border" />
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
          {messages[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
