import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/customers")({
  head: () => ({ meta: [{ title: "Customers — SentinelAI" }] }),
  component: () => (
    <PlaceholderPage
      icon={Users}
      title="Customers"
      description="Customer risk profiles, behavior baselines and protection status."
    />
  ),
});