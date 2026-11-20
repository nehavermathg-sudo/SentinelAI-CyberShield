import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, ShieldCheck, Lock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  evidenceRecords,
  riskLevels,
  evidenceTypes,
  type EvidenceRecord,
} from "@/lib/evidence-data";
import { riskBadge } from "./riskColors";
import { EvidenceDrawer } from "./EvidenceDrawer";

export function EvidenceRepository() {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("all");
  const [type, setType] = useState("all");
  const [selected, setSelected] = useState<EvidenceRecord | null>(null);

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    return evidenceRecords.filter((r) => {
      if (risk !== "all" && r.risk !== risk) return false;
      if (type !== "all" && r.type !== type) return false;
      if (!q) return true;
      return [r.id, r.caseId, r.customer, r.analyst, r.type].some((v) => v.toLowerCase().includes(q));
    });
  }, [query, risk, type]);

  return (
    <div>
      <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search evidence, case, customer…"
            className="bg-background/60 pl-9"
          />
        </div>
        <Select value={risk} onValueChange={setRisk}>
          <SelectTrigger className="bg-background/60"><SelectValue placeholder="Risk" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk</SelectItem>
            {riskLevels.map((r) => (
              <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="bg-background/60"><SelectValue placeholder="Evidence Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {evidenceTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center justify-end rounded-lg bg-white/5 px-3 text-xs text-muted-foreground">
          {rows.length} of {evidenceRecords.length} records
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-white/5 text-[11px] uppercase tracking-wide text-muted-foreground">
            <tr>
              {["Evidence ID", "Case ID", "Customer", "Type", "Risk", "Hash", "Timestamp", "Analyst", "Verified", "Anchor", "Status"].map((h) => (
                <th key={h} className="whitespace-nowrap px-3 py-2.5 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelected(r)}
                className="cursor-pointer border-t border-border/50 transition hover:bg-white/5"
              >
                <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs text-cyber-cyan">{r.id}</td>
                <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs">{r.caseId}</td>
                <td className="whitespace-nowrap px-3 py-2.5">{r.customer}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">{r.type}</td>
                <td className="px-3 py-2.5">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${riskBadge[r.risk]}`}>
                    {r.risk}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2.5">
                  <span className={`text-xs ${r.hashStatus === "Matched" ? "text-success" : "text-warning"}`}>
                    {r.hashStatus}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 text-xs text-muted-foreground">{r.timestamp}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-xs">{r.analyst}</td>
                <td className="px-3 py-2.5">
                  {r.verification === "Verified" ? (
                    <span className="flex items-center gap-1 text-xs text-success"><ShieldCheck className="h-3.5 w-3.5" /> Verified</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-cyber-cyan"><Loader2 className="h-3.5 w-3.5 animate-spin" /> {r.verification}</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 font-mono text-[11px] text-muted-foreground">{r.anchor}</td>
                <td className="px-3 py-2.5">
                  <span className="flex items-center gap-1 text-xs">
                    {r.status === "Locked" ? <Lock className="h-3.5 w-3.5 text-success" /> : <Loader2 className="h-3.5 w-3.5 animate-spin text-cyber-cyan" />}
                    {r.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <EvidenceDrawer record={selected} onClose={() => setSelected(null)} />
    </div>
  );
}