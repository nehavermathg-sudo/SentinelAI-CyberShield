import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { recommendations } from "@/lib/predictive-data";
import { toneColor } from "@/components/correlation/toneColors";

export function RecommendationEngine() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {recommendations.map((r, i) => {
        const color = toneColor[r.tone];
        return (
          <motion.button
            key={r.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            onClick={() => toast.success(`Applied: ${r.title}`, { description: "Recommendation queued for the fraud team." })}
            className="group relative overflow-hidden rounded-xl border border-border/60 bg-background/40 p-4 text-left"
          >
            <span className="absolute left-0 top-0 h-full w-1" style={{ background: color }} />
            <div className="flex items-center justify-between">
              <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: `${color}1a`, color }}>
                {r.impact}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-cyber-cyan" />
            </div>
            <div className="mt-2 text-sm font-semibold">{r.title}</div>
            <p className="mt-1 text-xs text-muted-foreground">{r.detail}</p>
          </motion.button>
        );
      })}
    </div>
  );
}