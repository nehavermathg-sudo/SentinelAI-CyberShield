import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronDown, LogOut } from "lucide-react";

import { navSections } from "@/lib/nav";
import { WordMark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/AuthContext";

export function AppSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const isActive = (to: string) =>
    to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(to);
  const toggleSection = (label: string) =>
    setOpenSections((prev) => ({ ...prev, [label]: prev[label] === false }));

  const handleLogout = () => {
    logout();
    navigate({ to: "/", replace: true });
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 76 : 260 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="relative z-30 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex"
    >
      <div className="flex h-16 items-center justify-between px-4">
        <WordMark collapsed={collapsed} />
        <button
          onClick={onToggle}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-sidebar-border bg-card/50 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft
            className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {navSections.map((section) => {
          const expanded = openSections[section.label] !== false;
          return (
            <div key={section.label} className="pb-1">
              {!collapsed && (
                <button
                  onClick={() => toggleSection(section.label)}
                  className="flex w-full items-center justify-between px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  <span>{section.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform",
                      !expanded && "-rotate-90",
                    )}
                  />
                </button>
              )}
              <AnimatePresence initial={false}>
                {(collapsed || expanded) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="space-y-1 overflow-hidden"
                  >
                    {section.items.map((item) => {
                      const active = isActive(item.to);
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          title={collapsed ? item.title : undefined}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                            active
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                          )}
                        >
                          {active && (
                            <motion.span
                              layoutId="sidebar-active"
                              className="absolute left-0 top-1/2 h-6 -translate-y-1/2 w-1 rounded-r-full bg-gradient-to-b from-cyber-blue to-cyber-cyan"
                            />
                          )}
                          <item.icon className="h-[18px] w-[18px] shrink-0" />
                          {!collapsed && <span className="truncate">{item.title}</span>}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl px-2 py-2",
            collapsed && "justify-center px-0",
          )}
        >
          <Avatar className="h-9 w-9 shrink-0 border border-sidebar-border">
            <AvatarFallback className="bg-gradient-to-br from-cyber-blue to-cyber-cyan text-xs font-bold text-[#04121a]">
              {user?.initials ?? "AN"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">
                {user?.name ?? "Admin Name"}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {user?.role ?? "SOC Administrator"}
              </div>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "mt-1 w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
            collapsed && "justify-center px-0",
          )}
        >
          <LogOut className="h-[18px] w-[18px]" />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </motion.aside>
  );
}