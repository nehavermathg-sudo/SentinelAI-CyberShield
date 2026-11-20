import { AlertTriangle } from "lucide-react";

export function SecurityNotice() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-warning/25 bg-warning/5 px-3 py-2.5">
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        <span className="font-semibold text-warning">Authorized Personnel Only.</span>{" "}
        This system contains confidential banking security information.
        Unauthorized access is strictly prohibited and monitored.
      </p>
    </div>
  );
}
