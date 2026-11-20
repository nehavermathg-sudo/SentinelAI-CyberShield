import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { GraphNode } from "@/lib/correlation-data";
import { linkColor } from "./toneColors";

const detailTone: Record<string, string> = {
  danger: "text-danger",
  warning: "text-warning",
  success: "text-success",
  cyan: "text-cyber-cyan",
};

export function NodeDetailDrawer({
  node,
  onClose,
}: {
  node: GraphNode | null;
  onClose: () => void;
}) {
  const color = node ? linkColor[node.tone] : "#3b82f6";
  return (
    <Sheet open={!!node} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full border-border bg-card/95 backdrop-blur-xl sm:max-w-md">
        {node && (
          <>
            <SheetHeader>
              <div className="flex items-center gap-3">
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl"
                  style={{ background: `${color}1a`, color }}
                >
                  <node.icon className="h-6 w-6" />
                </span>
                <div>
                  <SheetTitle className="text-left">{node.label}</SheetTitle>
                  <SheetDescription className="text-left">
                    Status: <span style={{ color }}>{node.status}</span>
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="mt-6 space-y-2 px-4 pb-6">
              {node.details
                .filter((d) => d.label !== "Risk Contribution")
                .map((d) => (
                <div
                  key={d.label}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-3"
                >
                  <span className="text-sm text-muted-foreground">{d.label}</span>
                  <span className={cn("text-sm font-semibold", d.tone && detailTone[d.tone])}>
                    {d.value}
                  </span>
                </div>
              ))}

              {node.riskContribution > 0 && (
                <div className="mt-4 rounded-xl border p-3" style={{ borderColor: `${color}44` }}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-muted-foreground">Risk Contribution</span>
                    <span className="font-semibold" style={{ color }}>{node.riskContribution}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${node.riskContribution}%`, background: color }}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
