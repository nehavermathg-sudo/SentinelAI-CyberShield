import { behaviorProfile } from "@/lib/cyber-dna-data";

export function BehaviorProfile() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {behaviorProfile.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-border/60 bg-background/40 p-3 transition-colors hover:border-cyber-cyan/30"
        >
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{item.label}</div>
          <div className="mt-1 text-sm font-semibold">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
