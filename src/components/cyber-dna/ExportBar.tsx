import { FileDown, FileText, Share2, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const actions = [
  { label: "Export Cyber DNA Report", icon: FileDown },
  { label: "Generate PDF", icon: FileText },
  { label: "Share With Fraud Team", icon: Share2 },
  { label: "Download Behavioral Summary", icon: Download },
];

export function ExportBar() {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((a, i) => (
        <Button
          key={a.label}
          variant={i === 0 ? "default" : "outline"}
          className="rounded-xl"
          onClick={() => toast.success(`${a.label} started`, { description: "Preparing secure behavioral export…" })}
        >
          <a.icon className="mr-2 h-4 w-4" />
          {a.label}
        </Button>
      ))}
    </div>
  );
}
