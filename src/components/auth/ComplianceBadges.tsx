import { Badge } from "@/components/ui/badge";

const badges = ["ISO 27001", "PCI DSS", "RBI Guidelines", "Zero Trust"];

export function ComplianceBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => (
        <Badge
          key={b}
          variant="outline"
          className="border-border bg-card/40 text-[10px] font-semibold tracking-wide text-muted-foreground"
        >
          {b}
        </Badge>
      ))}
    </div>
  );
}
