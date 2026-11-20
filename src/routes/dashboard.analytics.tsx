import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — SentinelAI" }] }),
  component: () => (
    <PlaceholderPage
      icon={BarChart3}
      title="Analytics"
      description="Deep-dive metrics on detection performance, risk trends and SOC efficiency."
    />
  ),
});