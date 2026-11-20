import {
  LayoutDashboard,
  Radar,
  ShieldAlert,
  ArrowLeftRight,
  Users,
  Fingerprint,
  Waypoints,
  Siren,
  Bot,
  Microscope,
  FileText,
  BarChart3,
  Settings,
  Vault,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  to: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { title: "Live Monitoring", to: "/dashboard/monitoring", icon: Radar },
  { title: "Predictive Threat Intel", to: "/dashboard/threats", icon: ShieldAlert },
  { title: "Transactions", to: "/dashboard/transactions", icon: ArrowLeftRight },
  { title: "Customers", to: "/dashboard/customers", icon: Users },
  { title: "Cyber DNA", to: "/dashboard/cyber-dna", icon: Fingerprint },
  { title: "AI Correlation", to: "/dashboard/correlation", icon: Waypoints },
  { title: "Incident Center", to: "/dashboard/incidents", icon: Siren },
  { title: "Investigation", to: "/dashboard/investigation", icon: Microscope },
  { title: "Evidence Vault", to: "/dashboard/evidence", icon: Vault },
  { title: "AI Advisor", to: "/dashboard/advisor", icon: Bot },
  { title: "Reports", to: "/dashboard/reports", icon: FileText },
  { title: "Analytics", to: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", to: "/dashboard/settings", icon: Settings },
];

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    label: "Operations",
    items: [
      { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
      { title: "Live Monitoring", to: "/dashboard/monitoring", icon: Radar },
      { title: "Incident Center", to: "/dashboard/incidents", icon: Siren },
      { title: "Investigation", to: "/dashboard/investigation", icon: Microscope },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { title: "Cyber DNA", to: "/dashboard/cyber-dna", icon: Fingerprint },
      { title: "AI Correlation", to: "/dashboard/correlation", icon: Waypoints },
      { title: "Predictive Threat Intel", to: "/dashboard/threats", icon: ShieldAlert },
      { title: "AI Advisor", to: "/dashboard/advisor", icon: Bot },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Transactions", to: "/dashboard/transactions", icon: ArrowLeftRight },
      { title: "Customers", to: "/dashboard/customers", icon: Users },
      { title: "Evidence Vault", to: "/dashboard/evidence", icon: Vault },
      { title: "Reports", to: "/dashboard/reports", icon: FileText },
      { title: "Analytics", to: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [{ title: "Settings", to: "/dashboard/settings", icon: Settings }],
  },
];