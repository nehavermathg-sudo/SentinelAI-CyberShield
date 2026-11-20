import { motion } from "motion/react";
import {
  Briefcase,
  Clock,
  Link2,
  Files,
  StickyNote,
  ScrollText,
  Paperclip,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  investigationCase,
  activityLog,
  relatedCases,
  caseNotes,
  caseDocuments,
} from "@/lib/investigation-data";
import { severityStyles } from "@/lib/soc-data";

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Briefcase;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-cyber-cyan" />
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h4>
      </div>
      {children}
    </div>
  );
}

export function CaseSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass sticky top-4 space-y-4 rounded-2xl p-4 shadow-[var(--shadow-premium)]"
    >
      <Block icon={Briefcase} title="Case Information">
        <dl className="space-y-2 text-sm">
          {[
            ["Assigned Analyst", investigationCase.analyst],
            ["Priority", investigationCase.priority],
            ["Evidence Count", String(investigationCase.evidenceCount)],
            ["Documents", String(investigationCase.documents)],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-border/40 pt-2">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> SLA Remaining
            </dt>
            <dd className="font-semibold text-warning">{investigationCase.sla}</dd>
          </div>
        </dl>
      </Block>

      <Block icon={Link2} title="Related Cases">
        <div className="space-y-2">
          {relatedCases.map((c) => {
            const s = severityStyles[c.severity];
            return (
              <div key={c.id} className="flex items-center gap-2 rounded-lg bg-white/5 p-2">
                <span className={cn("h-2 w-2 shrink-0 rounded-full", s.dot)} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold">{c.id}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{c.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Block>

      <Block icon={Files} title="Documents">
        <div className="space-y-1.5">
          {caseDocuments.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <Paperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate font-medium">{d.name}</span>
              <span className="shrink-0 text-[10px] text-muted-foreground">{d.size}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block icon={StickyNote} title="Notes">
        <div className="space-y-3">
          {caseNotes.map((n, i) => (
            <div key={i} className="rounded-lg bg-white/5 p-2.5">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="font-semibold text-foreground/80">{n.who}</span>
                <span>{n.time}</span>
              </div>
              <p className="mt-1 text-xs text-foreground/80">{n.text}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block icon={ScrollText} title="Activity Log">
        <ScrollArea className="h-44 pr-3">
          <ol className="relative space-y-3 pl-4">
            <div className="absolute bottom-1 left-[3px] top-1 w-px bg-border" />
            {activityLog.map((a, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[13px] top-1 h-2 w-2 rounded-full bg-cyber-cyan" />
                <div className="text-[10px] text-muted-foreground">{a.time} · {a.who}</div>
                <div className="text-xs text-foreground/80">{a.text}</div>
              </li>
            ))}
          </ol>
        </ScrollArea>
      </Block>
    </motion.aside>
  );
}