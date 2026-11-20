import { motion } from "motion/react";
import { auditLog } from "@/lib/evidence-data";

const statusCls: Record<string, string> = {
  Success: "border-success/30 bg-success/10 text-success",
  Approved: "border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue",
  Anchored: "border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan",
};

export function AuditLog() {
  return (
    <ol className="space-y-2.5">
      {auditLog.map((l, i) => (
        <motion.li
          key={l.action + l.time}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-border/60 bg-background/40 p-3"
        >
          <span className="font-mono text-[11px] text-muted-foreground">{l.time}</span>
          <span className="text-sm font-semibold">{l.action}</span>
          <span className="text-xs text-muted-foreground">· {l.user}</span>
          <span className={`ml-auto rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusCls[l.status]}`}>
            {l.status}
          </span>
        </motion.li>
      ))}
    </ol>
  );
}