import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Microscope, FileText, UserSearch, Snowflake, Bot } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

const actions = [
  { label: "Create Investigation", icon: Microscope, run: (nav: ReturnType<typeof useNavigate>) => nav({ to: "/dashboard/investigation" }) },
  { label: "Generate Report", icon: FileText, run: (nav: ReturnType<typeof useNavigate>) => nav({ to: "/dashboard/reports" }) },
  { label: "Search Customer", icon: UserSearch, run: (nav: ReturnType<typeof useNavigate>) => nav({ to: "/dashboard/customers" }) },
  { label: "Freeze Account", icon: Snowflake, run: () => toast.success("Account freeze request submitted", { description: "Fraud team has been notified." }) },
  { label: "Open AI Assistant", icon: Bot, run: (nav: ReturnType<typeof useNavigate>) => nav({ to: "/dashboard/advisor" }) },
];

export function QuickActionFab() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col items-end gap-2"
          >
            {actions.map((a, i) => (
              <motion.button
                key={a.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => {
                  a.run(navigate);
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 rounded-full border border-border bg-card/95 py-2 pl-4 pr-3 text-sm font-medium shadow-[var(--shadow-premium)] backdrop-blur-xl transition-colors hover:border-cyber-cyan/50 hover:text-cyber-cyan"
              >
                {a.label}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-cyber-cyan/10 text-cyber-cyan">
                  <a.icon className="h-4 w-4" />
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Quick actions"
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyber-blue to-cyber-cyan text-[#04121a] shadow-[var(--shadow-premium)] transition-transform hover:scale-105"
      >
        <Plus className={cn("h-6 w-6 transition-transform", open && "rotate-45")} />
      </button>
    </div>
  );
}