import { motion } from "motion/react";
import { type LucideIcon } from "lucide-react";

import { EmptyState } from "@/components/dashboard/EmptyState";

export function PlaceholderPage({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="glass rounded-2xl p-6 shadow-[var(--shadow-premium)]">
        <EmptyState
          icon={Icon}
          title={`${title} module is ready`}
          description="Data will appear here when connected."
          className="py-20"
        />
      </div>
    </motion.div>
  );
}