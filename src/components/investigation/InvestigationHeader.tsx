import { motion } from "motion/react";
import {
  FileDown,
  UserPlus,
  ArrowUpRight,
  Share2,
  MoreHorizontal,
  ShieldAlert,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { investigationCase } from "@/lib/investigation-data";

const stats = [
  { label: "Investigation ID", value: investigationCase.id },
  { label: "Status", value: investigationCase.status, tone: "danger" },
  { label: "Priority", value: investigationCase.priority, tone: "danger" },
  { label: "Risk Score", value: `${investigationCase.riskScore}/100`, tone: "warning" },
  { label: "Confidence", value: `${investigationCase.confidence}%`, tone: "cyan" },
  { label: "Current Phase", value: investigationCase.phase },
  { label: "Case Owner", value: investigationCase.owner },
  { label: "Created", value: `${investigationCase.createdDate} · ${investigationCase.createdTime}` },
];

const toneClass: Record<string, string> = {
  danger: "text-danger",
  warning: "text-warning",
  cyan: "text-cyber-cyan",
};

export function InvestigationHeader() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-danger/10 text-danger">
            <ShieldAlert className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">AI Investigation Workspace</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Investigate suspicious banking activities using AI-driven behavioral intelligence and cybersecurity telemetry.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" className="gap-1.5">
            <FileDown className="h-4 w-4" /> Export Report
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <UserPlus className="h-4 w-4" /> Assign Case
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5 border-danger/40 text-danger hover:bg-danger/10">
            <ArrowUpRight className="h-4 w-4" /> Escalate
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-9 w-9">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              <DropdownMenuItem>Add to Watchlist</DropdownMenuItem>
              <DropdownMenuItem>Duplicate Case</DropdownMenuItem>
              <DropdownMenuItem>Print Summary</DropdownMenuItem>
              <DropdownMenuItem className="text-danger">Close Investigation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4 xl:grid-cols-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-card/40 p-3">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
            <div className={cn("mt-1 truncate text-sm font-bold", s.tone && toneClass[s.tone])}>{s.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}