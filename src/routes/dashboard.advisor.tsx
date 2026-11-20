import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/advisor")({
  head: () => ({ meta: [{ title: "AI Advisor — SentinelAI" }] }),
  component: () => (
    <PlaceholderPage
      icon={Bot}
      title="AI Advisor"
      description="Explainable AI guidance and recommended next actions for your SOC team."
    />
  ),
});