import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/reports")({
  head: () => ({ meta: [{ title: "Reports — SentinelAI" }] }),
  component: () => (
    <PlaceholderPage
      icon={FileText}
      title="Reports"
      description="Generate compliance, audit and executive security reports on demand."
    />
  ),
});