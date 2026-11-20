import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";

import { Logo } from "@/components/brand/Logo";

const steps = [
  "Connecting to Secure Gateway",
  "Loading Threat Intelligence",
  "Loading Behavioral Models",
  "Synchronizing AI Engine",
  "Preparing SOC Workspace",
];

export function AuthLoadingOverlay({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const each = 600;
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= steps.length - 1) {
          window.clearInterval(id);
          window.setTimeout(onDone, each);
          return s;
        }
        return s + 1;
      });
    }, each);
    return () => window.clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div className="cyber-grid animate-grid-pan pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0 [background:var(--gradient-glow)]" />

      <div className="relative flex flex-col items-center">
        <Logo className="h-16 w-16 animate-pulse-ring" />
        <h2 className="mt-5 text-2xl font-extrabold tracking-tight">
          Sentinel<span className="text-gradient">AI</span>
        </h2>

        <Loader2 className="mt-6 h-6 w-6 animate-spin text-cyber-cyan" />

        <div className="mt-4 h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium text-muted-foreground"
            >
              {steps[step]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-4 h-1 w-56 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-cyan"
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
