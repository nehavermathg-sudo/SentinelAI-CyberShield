import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, History } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { evidenceEvents } from "@/lib/investigation-data";
import { severityStyles } from "@/lib/soc-data";

const resolvedStyle = { text: "text-success", bg: "bg-success/10", dot: "bg-success" };

export function TimelineTab() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionCard title="Evidence Timeline" subtitle="Forensic event reconstruction" icon={History}>
      <div className="relative space-y-3 pl-6">
        <div className="absolute bottom-2 left-[11px] top-2 w-px bg-border" />
        {evidenceEvents.map((ev, i) => {
          const s = ev.severity === "resolved" ? resolvedStyle : severityStyles[ev.severity];
          const isOpen = open === i;
          return (
            <motion.div
              key={ev.time + ev.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              <span className={cn("absolute -left-[22px] top-3 h-3 w-3 rounded-full ring-4 ring-background", s.dot)} />
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3 text-left transition-colors hover:border-cyber-cyan/40"
              >
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", s.bg, s.text)}>
                  <ev.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{ev.title}</span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", s.bg, s.text)}>
                      {ev.severity === "resolved" ? "Resolved" : `${ev.severity} risk`}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">{ev.time}</div>
                </div>
                <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-xl border border-border/40 bg-background/30 p-3">
                      <p className="text-xs text-foreground/80">{ev.details}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {ev.meta.map((m) => (
                          <div key={m.label} className="rounded-lg bg-white/5 p-2">
                            <div className="text-[10px] uppercase text-muted-foreground">{m.label}</div>
                            <div className="truncate text-xs font-semibold">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionCard>
  );
}