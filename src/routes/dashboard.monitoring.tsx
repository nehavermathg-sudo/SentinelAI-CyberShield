import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/monitoring")({
  head: () => ({ meta: [{ title: "Live Monitoring — SentinelAI" }] }),
  component: () => (
    <PlaceholderPage
      icon={Radar}
      title="Live Monitoring"
      description="Real-time surveillance of banking transactions and network events across the SOC."
    />
  ),
});