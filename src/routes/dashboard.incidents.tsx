import { createFileRoute } from "@tanstack/react-router";
import { Siren } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/incidents")({
  head: () => ({ meta: [{ title: "Incident Center — SentinelAI" }] }),
  component: () => (
    <PlaceholderPage
      icon={Siren}
      title="Incident Center"
      description="Coordinate response, ownership and remediation of active security incidents."
    />
  ),
});