import { matrixRows, matrixCols, matrixValues } from "@/lib/correlation-data";

function cellColor(v: number) {
  // blue -> cyan -> red heat
  if (v >= 85) return "rgba(239,68,68,0.85)";
  if (v >= 70) return "rgba(245,158,11,0.75)";
  if (v >= 50) return "rgba(34,211,238,0.55)";
  if (v >= 30) return "rgba(59,130,246,0.4)";
  return "rgba(255,255,255,0.06)";
}

export function CorrelationMatrix() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="w-28" />
            {matrixCols.map((c) => (
              <th key={c} className="px-1 pb-2 text-[10px] font-semibold text-muted-foreground">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrixRows.map((r, ri) => (
            <tr key={r}>
              <td className="pr-2 text-right text-[11px] font-semibold text-muted-foreground">{r}</td>
              {matrixCols.map((_, ci) => {
                const v = matrixValues[ri][ci];
                return (
                  <td key={ci} className="p-0">
                    <div
                      className="group relative grid h-9 place-items-center rounded-md text-[10px] font-semibold text-foreground/90 transition-transform hover:scale-105"
                      style={{ background: cellColor(v) }}
                      title={`${r} ↔ ${matrixCols[ci]}: ${v}%`}
                    >
                      {v}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex items-center gap-3 text-[10px] text-muted-foreground">
        <span>Relationship strength</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded" style={{ background: "rgba(59,130,246,0.4)" }} /> Low</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded" style={{ background: "rgba(34,211,238,0.55)" }} /> Medium</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded" style={{ background: "rgba(245,158,11,0.75)" }} /> High</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded" style={{ background: "rgba(239,68,68,0.85)" }} /> Critical</span>
      </div>
    </div>
  );
}
