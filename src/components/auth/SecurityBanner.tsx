import { ShieldCheck, Lock } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SecurityBanner() {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-card/50 px-3.5 py-2.5">
      <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-muted-foreground">
        <ShieldCheck className="h-4 w-4 shrink-0 text-cyber-cyan" />
        <span className="truncate">Enterprise Security Portal</span>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-success">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Secure Connection
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex items-center gap-1.5">
            <Lock className="h-3 w-3" /> TLS 1.3 Encrypted Connection
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
