import { motion } from "motion/react";
import { watchlist, type WatchlistRow } from "@/lib/predictive-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const priorityColor: Record<WatchlistRow["priority"], string> = {
  Critical: "#ef4444",
  High: "#f59e0b",
  Medium: "#22d3ee",
};

function riskColor(r: number) {
  return r >= 80 ? "#ef4444" : r >= 65 ? "#f59e0b" : "#22c55e";
}

export function CustomerWatchlist() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60 hover:bg-transparent">
            <TableHead>Customer</TableHead>
            <TableHead>Trust</TableHead>
            <TableHead>Predicted Risk</TableHead>
            <TableHead>Expected Attack</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Recommended Action</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.map((r, i) => (
            <motion.tr
              key={r.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-border/50 transition hover:bg-white/5"
            >
              <TableCell>
                <div className="font-medium">{r.customer}</div>
                <div className="text-[11px] text-muted-foreground">{r.id}</div>
              </TableCell>
              <TableCell className="tabular-nums">{r.trust}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full" style={{ width: `${r.risk}%`, background: riskColor(r.risk) }} />
                  </div>
                  <span className="text-xs font-semibold tabular-nums" style={{ color: riskColor(r.risk) }}>{r.risk}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm">{r.attack}</TableCell>
              <TableCell className="tabular-nums text-sm">{r.confidence}%</TableCell>
              <TableCell className="text-sm">{r.action}</TableCell>
              <TableCell>
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  style={{ background: `${priorityColor[r.priority]}1a`, color: priorityColor[r.priority] }}
                >
                  {r.priority}
                </span>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}