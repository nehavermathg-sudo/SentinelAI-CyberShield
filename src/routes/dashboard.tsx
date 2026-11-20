import { useEffect, useState } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { ProtectedRoute } from "@/auth/ProtectedRoute";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { PageTransition } from "@/components/nav/PageTransition";
import { CommandPalette } from "@/components/nav/CommandPalette";
import { QuickActionFab } from "@/components/nav/QuickActionFab";
import { SessionExpiredModal } from "@/components/nav/SessionExpiredModal";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  // Demo-only: simulate a secure session timeout after prolonged inactivity.
  useEffect(() => {
    const IDLE_MS = 20 * 60 * 1000;
    let timer = window.setTimeout(() => setSessionExpired(true), IDLE_MS);
    const reset = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setSessionExpired(true), IDLE_MS);
    };
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((e) => window.addEventListener(e, reset));
    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, []);

  return (
    <ProtectedRoute>
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavbar onMobileMenu={() => setMobileOpen(true)} />
        <main className="relative flex-1 overflow-x-hidden p-4 md:p-6">
          <div className="cyber-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
          <div className="relative space-y-4">
            <Breadcrumbs />
            <PageTransition>
              <Outlet />
            </PageTransition>
          </div>
        </main>
      </div>

      <CommandPalette />
      <QuickActionFab />
      <SessionExpiredModal open={sessionExpired} onContinue={() => setSessionExpired(false)} />
    </div>
    </ProtectedRoute>
  );
}