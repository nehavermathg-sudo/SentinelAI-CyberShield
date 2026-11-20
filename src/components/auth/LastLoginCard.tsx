import { Clock, MapPin, Monitor } from "lucide-react";

export function LastLoginCard() {
  return (
    <div className="mt-6 rounded-xl border border-border bg-card/40 px-3.5 py-3">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Clock className="h-3 w-3" /> Last Successful Login
      </div>
      <div className="mt-2 grid grid-cols-1 gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3 w-3 shrink-0 text-cyber-cyan" />
          Yesterday, 09:42 PM
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 shrink-0 text-cyber-cyan" />
          Kanpur, India
        </div>
        <div className="col-span-full flex items-center gap-1.5">
          <Monitor className="h-3 w-3 shrink-0 text-cyber-cyan" />
          Windows 11 • Chrome
        </div>
      </div>
    </div>
  );
}
