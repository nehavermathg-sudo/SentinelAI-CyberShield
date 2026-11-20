import { motion } from "motion/react";
import { Activity, Radar, BrainCircuit, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatusItem {
  icon: LucideIcon;
  title: string;
  value: string;
  sub: string;
}

const items: StatusItem[] = [
  { icon: Activity, title: "System Health", value: "99.98%", sub: "Operational" },
  { icon: Radar, title: "Threat Intelligence", value: "Updated", sub: "2 minutes ago" },
  { icon: BrainCircuit, title: "AI Detection Engine", value: "Active", sub: "Monitoring" },
  { icon: Server, title: "247 Secure Gateway", value: "Online", sub: "Connected" },
];

export function SystemStatusCards() {
  return (
    <div className="grid max-w-md grid-cols-2 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
          className="glass rounded-xl p-3.5"
        >
          <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
            <item.icon className="h-3.5 w-3.5 text-cyber-cyan" />
            <span className="truncate">{item.title}</span>
          </div>
          <div className="mt-1.5 text-base font-bold tracking-tight text-foreground">
            {item.value}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {item.sub}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
