import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Bell, CheckCheck, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { initialNotifications } from "@/lib/notifications";
import { severityStyles } from "@/lib/soc-data";

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    initialNotifications.map((n) => ({ ...n, read: false })),
  );
  const navigate = useNavigate();

  const unread = items.filter((i) => !i.read).length;
  const markAllRead = () => setItems((prev) => prev.map((i) => ({ ...i, read: true })));
  const clearAll = () => setItems([]);

  const openItem = (id: string, to: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: true } : i)));
    setOpen(false);
    navigate({ to });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl text-muted-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold text-white ring-2 ring-background">
              {unread}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full border-border bg-sidebar p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-cyber-cyan" /> Notifications
            {unread > 0 && (
              <span className="rounded-full bg-danger/10 px-2 py-0.5 text-xs font-semibold text-danger">
                {unread} new
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex items-center gap-2 border-b border-border px-5 py-2.5">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={markAllRead}>
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground" onClick={clearAll}>
            <Trash2 className="h-3.5 w-3.5" /> Clear all
          </Button>
        </div>

        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto p-3">
          {items.length === 0 ? (
            <div className="grid place-items-center gap-2 py-20 text-center">
              <Bell className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm font-semibold">You're all caught up</p>
              <p className="text-xs text-muted-foreground">No new notifications.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((n) => {
                const s = severityStyles[n.priority];
                return (
                  <button
                    key={n.id}
                    onClick={() => openItem(n.id, n.to)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors hover:bg-white/5",
                      n.read ? "border-border/50 opacity-70" : "border-border bg-background/40",
                    )}
                  >
                    <span className={cn("mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg", s.bg, s.text)}>
                      <n.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold">{n.title}</span>
                        <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase", s.bg, s.text)}>
                          {n.priority}
                        </span>
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">{n.detail}</span>
                      <span className="mt-0.5 block text-[11px] text-muted-foreground/70">{n.time}</span>
                    </span>
                    {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyber-cyan" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}