import { cn } from "@/lib/utils";
import type { SummaryItem } from "@/lib/investigation-data";

const toneClass: Record<NonNullable<SummaryItem["tone"]>, string> = {
  danger: "text-danger",
  warning: "text-warning",
  success: "text-success",
  cyan: "text-cyber-cyan",
  default: "text-foreground",
};

export function InfoGrid({
  items,
  columns = 2,
}: {
  items: SummaryItem[];
  columns?: 2 | 3;
}) {
  return (
    <div className={cn("grid gap-3", columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2")}>
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-border/60 bg-background/40 p-3 transition-colors hover:border-cyber-cyan/30"
        >
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{item.label}</div>
          <div className={cn("mt-1 truncate text-sm font-semibold", toneClass[item.tone ?? "default"])}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}