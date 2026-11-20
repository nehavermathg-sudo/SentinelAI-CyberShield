import { motion } from "motion/react";
import { ShieldCheck, Fingerprint, Boxes } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { EvidenceRecord } from "@/lib/evidence-data";
import { chainOfCustody } from "@/lib/evidence-data";
import { riskBadge } from "./riskColors";

export function EvidenceDrawer({
  record,
  onClose,
}: {
  record: EvidenceRecord | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={!!record} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto border-border/60 bg-card/95 backdrop-blur-xl sm:max-w-md">
        {record && (
          <>
            <SheetHeader className="text-left">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyber-cyan/10 text-cyber-cyan">
                  <Fingerprint className="h-4 w-4" />
                </span>
                <div>
                  <SheetTitle className="font-mono text-base">{record.id}</SheetTitle>
                  <SheetDescription>Immutable evidence record</SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="mt-4 space-y-4 px-4 pb-6">
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${riskBadge[record.risk]}`}>
                  {record.risk} risk
                </span>
                <span className="flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
                  <ShieldCheck className="h-3 w-3" /> {record.verification}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Incident ID", record.incidentId],
                  ["Transaction ID", record.transactionId],
                  ["Customer ID", record.customerId],
                  ["Risk Score", `${record.riskScore} / 100`],
                  ["Recorded By", record.recordedBy],
                  ["Timestamp", record.timestamp],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-lg bg-white/5 p-2.5">
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{l}</div>
                    <div className="mt-0.5 truncate text-sm font-semibold">{v}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-cyber-cyan/20 bg-cyber-cyan/5 p-3">
                <div className="text-[10px] uppercase tracking-wide text-cyber-cyan">AI Decision</div>
                <div className="mt-0.5 text-sm font-semibold">{record.aiDecision}</div>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Hash Value (SHA-256)</div>
                  <div className="mt-1 break-all rounded-lg bg-background/60 p-2 font-mono text-[11px] text-cyber-cyan">
                    {record.hash}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Digital Signature</div>
                  <div className="mt-1 rounded-lg bg-background/60 p-2 font-mono text-[11px]">{record.signature}</div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-background/60 p-2">
                  <Boxes className="h-4 w-4 text-cyber-blue" />
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Block Reference</span>
                  <span className="ml-auto font-mono text-xs">{record.block}</span>
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Chain of Custody
                </div>
                <ol className="space-y-2">
                  {chainOfCustody.map((s, i) => (
                    <motion.li
                      key={s.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1.5"
                    >
                      <ShieldCheck className={`h-3.5 w-3.5 ${s.status === "active" ? "text-cyber-cyan" : "text-success"}`} />
                      <span className="text-xs">{s.label}</span>
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">{s.time}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}