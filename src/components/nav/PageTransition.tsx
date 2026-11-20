import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";

import { Skeleton } from "@/components/ui/skeleton";
import { navItems } from "@/lib/nav";
import { useRecentActivity } from "@/hooks/useRecentActivity";

function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton className="h-72 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    </div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [loading, setLoading] = useState(false);
  const { track } = useRecentActivity();

  useEffect(() => {
    setLoading(true);
    const id = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    const match = navItems.find((n) =>
      n.to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(n.to),
    );
    if (match) track({ to: match.to, label: match.title, category: "Page" });
  }, [pathname, track]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {loading ? <PageSkeleton /> : children}
    </motion.div>
  );
}