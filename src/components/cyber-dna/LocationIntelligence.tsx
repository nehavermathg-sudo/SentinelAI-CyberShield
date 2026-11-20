import { motion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";
import { locationIntel } from "@/lib/cyber-dna-data";

const pins = [
  { city: "Kanpur", x: 50, y: 55, current: true },
  { city: "Lucknow", x: 62, y: 42 },
  { city: "Delhi", x: 34, y: 30 },
  { city: "Noida", x: 40, y: 34 },
  { city: "Prayagraj", x: 58, y: 66 },
  { city: "Agra", x: 30, y: 48 },
];

export function LocationIntelligence() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-background/40 p-4">
        <div className="cyber-grid absolute inset-0 opacity-20" />
        <div className="relative h-56">
          {pins.map((p, i) => (
            <motion.span
              key={p.city}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="absolute flex flex-col items-center"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className={`h-3 w-3 rounded-full ${p.current ? "bg-cyber-cyan animate-pulse-ring" : "bg-cyber-blue"}`} />
              <span className="mt-1 text-[10px] text-muted-foreground">{p.city}</span>
            </motion.span>
          ))}
          <Navigation className="absolute left-[50%] top-[52%] h-5 w-5 -translate-x-1/2 text-cyber-cyan" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Item label="Current City" value={locationIntel.currentCity} tone="text-cyber-cyan" />
        <Item label="Travel Radius" value={locationIntel.travelRadius} />
        <Item label="Frequently Visited" value={locationIntel.frequentlyVisited} />
        <Item label="Geo Stability" value={locationIntel.geoStability} tone="text-success" />
        <Item label="Impossible Travel" value={locationIntel.impossibleTravel} tone="text-success" />
        <Item label="Trusted Cities" value={`${locationIntel.trustedCities.length} verified`} />
      </div>
    </div>
  );
}

function Item({ label, value, tone = "text-foreground" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-3">
      <div className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-muted-foreground">
        <MapPin className="h-3 w-3" /> {label}
      </div>
      <div className={`mt-1 text-sm font-semibold ${tone}`}>{value}</div>
    </div>
  );
}
