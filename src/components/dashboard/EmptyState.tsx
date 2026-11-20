import { motion } from "motion/react";
import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description = "Data will appear here when connected.",
  className,
  compact = false,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-background/40 text-center",
        compact ? "gap-2 px-6 py-8" : "gap-3 px-6 py-12",
        className,
      )}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyber-blue/15 to-cyber-cyan/15"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-2xl" />
        <Icon className="h-6 w-6 text-cyber-cyan" />
      </motion.div>
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <div className="max-w-xs text-xs text-muted-foreground">{description}</div>
    </div>
  );
}