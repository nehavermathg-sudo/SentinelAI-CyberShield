import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — SentinelAI" }] }),
  component: () => (
    <PlaceholderPage
      icon={Settings}
      title="Settings"
      description="Configure workspace, alerting thresholds, integrations and team access."
    />
  ),
});