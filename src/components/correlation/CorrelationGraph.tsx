import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { graphNodes, graphEdges, type GraphNode } from "@/lib/correlation-data";
import { linkColor } from "./toneColors";
import { NodeDetailDrawer } from "./NodeDetailDrawer";

interface Pos {
  x: number;
  y: number;
}

export function CorrelationGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 560 });
  const [positions, setPositions] = useState<Record<string, Pos>>(() =>
    Object.fromEntries(
      graphNodes.map((n) => [n.id, { x: (n.x / 100) * 800, y: (n.y / 100) * 560 }]),
    ),
  );
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const drag = useRef<{ id: string; moved: boolean } | null>(null);

  // Measure container & lay nodes out in its coordinate space.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const apply = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setSize({ w, h });
      setPositions(
        Object.fromEntries(
          graphNodes.map((n) => [n.id, { x: (n.x / 100) * w, y: (n.y / 100) * h }]),
        ),
      );
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!drag.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(24, Math.min(rect.width - 24, e.clientX - rect.left));
    const y = Math.max(24, Math.min(rect.height - 24, e.clientY - rect.top));
    drag.current.moved = true;
    setPositions((p) => ({ ...p, [drag.current!.id]: { x, y } }));
  }, []);

  const onPointerUp = useCallback(() => {
    if (drag.current && !drag.current.moved) {
      const node = graphNodes.find((n) => n.id === drag.current!.id) ?? null;
      setSelected(node);
    }
    drag.current = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove]);

  const startDrag = (id: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    drag.current = { id, moved: false };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-[440px] w-full touch-none select-none overflow-hidden rounded-xl border border-border/60 bg-background/40 md:h-[560px]"
      >
        <div className="cyber-grid pointer-events-none absolute inset-0 opacity-20" />

        {/* edges */}
        <svg className="absolute inset-0 h-full w-full" width={size.w} height={size.h}>
          <defs>
            {(["safe", "suspicious", "critical"] as const).map((t) => (
              <linearGradient id={`edge-${t}`} key={t} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={linkColor[t]} stopOpacity={0.15} />
                <stop offset="100%" stopColor={linkColor[t]} stopOpacity={0.7} />
              </linearGradient>
            ))}
          </defs>
          {graphEdges.map((e, i) => {
            const a = positions[e.from];
            const b = positions[e.to];
            if (!a || !b) return null;
            const active = hovered === e.from || hovered === e.to;
            return (
              <g key={i}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={`url(#edge-${e.tone})`}
                  strokeWidth={active ? 2.5 : 1.4}
                  strokeOpacity={active ? 1 : 0.6}
                  strokeDasharray="6 6"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.4s" repeatCount="indefinite" />
                </line>
              </g>
            );
          })}
        </svg>

        {/* nodes */}
        {graphNodes.map((n) => {
          const p = positions[n.id] ?? { x: 0, y: 0 };
          const color = linkColor[n.tone];
          const isCenter = n.id === "customer";
          return (
            <motion.button
              key={n.id}
              type="button"
              onPointerDown={startDrag(n.id)}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-grab flex-col items-center gap-1 active:cursor-grabbing"
              style={{ left: p.x, top: p.y }}
            >
              <span
                className="grid place-items-center rounded-full backdrop-blur transition-shadow"
                style={{
                  width: isCenter ? 56 : 40,
                  height: isCenter ? 56 : 40,
                  background: `${color}1f`,
                  color,
                  boxShadow: `0 0 0 1px ${color}55, 0 0 ${hovered === n.id ? 22 : 10}px ${color}66`,
                }}
              >
                <n.icon style={{ width: isCenter ? 26 : 18, height: isCenter ? 26 : 18 }} />
              </span>
              <span className="pointer-events-none whitespace-nowrap rounded-md bg-background/70 px-1.5 py-0.5 text-[10px] font-semibold leading-tight">
                {n.label}
              </span>
            </motion.button>
          );
        })}

        <div className="pointer-events-none absolute bottom-3 left-3 flex gap-3 rounded-lg bg-background/60 px-3 py-1.5 text-[10px] backdrop-blur">
          <Legend color={linkColor.safe} label="Safe" />
          <Legend color={linkColor.suspicious} label="Suspicious" />
          <Legend color={linkColor.critical} label="Critical" />
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-lg bg-background/60 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur">
          Drag nodes · click to inspect
        </div>
      </div>

      <NodeDetailDrawer node={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1 text-muted-foreground">
      <span className="h-2 w-4 rounded-full" style={{ background: color }} /> {label}
    </span>
  );
}
