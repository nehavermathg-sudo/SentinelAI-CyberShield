import { FileDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { exportActions } from "@/lib/evidence-data";

export function ExportCenter() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {exportActions.map((a, i) => (
        <Button
          key={a}
          variant={i === 0 ? "default" : "outline"}
          className="justify-start rounded-xl"
          onClick={() => toast.success(`${a} started`, { description: "Compiling signed audit-ready package…" })}
        >
          <FileDown className="mr-2 h-4 w-4" />
          {a}
        </Button>
      ))}
    </div>
  );
}