import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const crumbs = buildBreadcrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <span key={`${c.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />}
            {c.to && !last ? (
              <Link
                to={c.to}
                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {c.label}
              </Link>
            ) : (
              <span className={cn("font-semibold", last ? "text-foreground" : "text-muted-foreground")}>
                {c.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}