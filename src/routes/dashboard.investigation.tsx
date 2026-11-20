import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { LayoutGrid, BrainCircuit, Users, History, Gavel } from "lucide-react";

import { cn } from "@/lib/utils";
import { InvestigationHeader } from "@/components/investigation/InvestigationHeader";
import { CaseSidebar } from "@/components/investigation/CaseSidebar";
import { OverviewTab } from "@/components/investigation/tabs/OverviewTab";
import { AiAnalysisTab } from "@/components/investigation/tabs/AiAnalysisTab";
import { CustomerTab } from "@/components/investigation/tabs/CustomerTab";
import { TimelineTab } from "@/components/investigation/tabs/TimelineTab";
import { ActionsTab } from "@/components/investigation/tabs/ActionsTab";

export const Route = createFileRoute("/dashboard/investigation")({
  head: () => ({ meta: [{ title: "AI Investigation Workspace — SentinelAI" }] }),
  component: InvestigationWorkspace,
});

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutGrid, Component: OverviewTab },
  { id: "ai", label: "AI Analysis", icon: BrainCircuit, Component: AiAnalysisTab },
  { id: "customer", label: "Customer Intelligence", icon: Users, Component: CustomerTab },
  { id: "timeline", label: "Evidence Timeline", icon: History, Component: TimelineTab },
  { id: "actions", label: "Analyst Actions", icon: Gavel, Component: ActionsTab },
] as const;

function InvestigationWorkspace() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("overview");
  const ActiveComponent = tabs.find((t) => t.id === active)!.Component;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-6">
        <InvestigationHeader />

        <div className="glass sticky top-0 z-10 flex gap-1 overflow-x-auto rounded-2xl p-1.5">
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="inv-tab"
                    className="absolute inset-0 rounded-xl bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <t.icon className="relative h-4 w-4" />
                <span className="relative whitespace-nowrap">{t.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="min-w-0">
        <CaseSidebar />
      </div>
    </div>
  );
}