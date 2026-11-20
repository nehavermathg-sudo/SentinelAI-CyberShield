import {
  Users,
  ArrowLeftRight,
  Siren,
  Microscope,
  ShieldAlert,
  MapPin,
  Store,
  Smartphone,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import { transactions, incidents, threatIntel } from "@/lib/soc-data";

export interface SearchResult {
  id: string;
  label: string;
  sublabel: string;
  category: string;
  icon: LucideIcon;
  to: string;
}

/** A flat, searchable index built from the existing dummy data (frontend-only). */
export const searchIndex: SearchResult[] = [
  // Customers
  ...Array.from(new Set(transactions.map((t) => t.customer))).map((name, i) => ({
    id: `cust-${i}`,
    label: name,
    sublabel: `Customer ID · CUST-${(10234 + i).toString()}`,
    category: "Customer",
    icon: Users,
    to: "/dashboard/customers",
  })),
  // Transactions
  ...transactions.map((t) => ({
    id: t.id,
    label: t.id,
    sublabel: `${t.customer} · ${t.amount} · ${t.location}`,
    category: "Transaction",
    icon: ArrowLeftRight,
    to: "/dashboard/investigation",
  })),
  // Incidents / Cases
  ...incidents.map((inc) => ({
    id: inc.id,
    label: inc.id,
    sublabel: `${inc.customer} · ${inc.status}`,
    category: "Incident",
    icon: Siren,
    to: "/dashboard/incidents",
  })),
  {
    id: "INC-2026-10421",
    label: "INC-2026-10421",
    sublabel: "Account Takeover · P1 Critical",
    category: "Case",
    icon: Microscope,
    to: "/dashboard/investigation",
  },
  // Threat intel
  ...threatIntel.map((t, i) => ({
    id: `ti-${i}`,
    label: t.label,
    sublabel: t.type,
    category: "Threat Intel",
    icon: ShieldAlert,
    to: "/dashboard/threats",
  })),
  // Devices
  { id: "DEV-8841", label: "DEV-8841", sublabel: "Rooted Android · flagged", category: "Device", icon: Smartphone, to: "/dashboard/cyber-dna" },
  { id: "DEV-2290", label: "DEV-2290", sublabel: "iPhone 15 · trusted", category: "Device", icon: Smartphone, to: "/dashboard/cyber-dna" },
  // IPs
  { id: "103.21.44.12", label: "103.21.44.12", sublabel: "Brute force source · blocked", category: "IP Address", icon: Wifi, to: "/dashboard/threats" },
  { id: "45.148.10.7", label: "45.148.10.7", sublabel: "VPN exit · Amsterdam", category: "IP Address", icon: Wifi, to: "/dashboard/threats" },
  // Locations
  { id: "loc-mumbai", label: "Mumbai, MH", sublabel: "61 incidents · critical zone", category: "Location", icon: MapPin, to: "/dashboard/monitoring" },
  { id: "loc-lagos", label: "Lagos, NG", sublabel: "Impossible travel origin", category: "Location", icon: MapPin, to: "/dashboard/monitoring" },
  // Merchants
  { id: "merch-quickpay", label: "QuickPay Online", sublabel: "Merchant · high chargeback", category: "Merchant", icon: Store, to: "/dashboard/transactions" },
  { id: "merch-goldbazaar", label: "Gold Bazaar Jewellers", sublabel: "Merchant · flagged purchase", category: "Merchant", icon: Store, to: "/dashboard/transactions" },
];

export function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex
    .filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        r.sublabel.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q),
    )
    .slice(0, 12);
}