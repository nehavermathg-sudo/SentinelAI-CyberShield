import { navItems } from "@/lib/nav";

export interface Crumb {
  label: string;
  to?: string;
}

const LABELS: Record<string, string> = Object.fromEntries(
  navItems.map((n) => [n.to, n.title]),
);

/** Builds a clickable breadcrumb trail from a dashboard pathname. */
export function buildBreadcrumbs(pathname: string): Crumb[] {
  const crumbs: Crumb[] = [{ label: "Dashboard", to: "/dashboard" }];
  if (pathname === "/dashboard" || pathname === "/dashboard/") return crumbs;

  const segments = pathname.replace(/^\/dashboard\/?/, "").split("/").filter(Boolean);
  let acc = "/dashboard";
  segments.forEach((seg, idx) => {
    acc += `/${seg}`;
    const known = LABELS[acc];
    const label =
      known ??
      seg
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    crumbs.push({ label, to: idx === segments.length - 1 ? undefined : acc });
  });
  return crumbs;
}