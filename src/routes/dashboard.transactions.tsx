import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/transactions")({
  head: () => ({ meta: [{ title: "Transactions — SentinelAI" }] }),
  component: () => (
    <PlaceholderPage
      icon={ArrowLeftRight}
      title="Transactions"
      description="Inspect, filter and triage monitored banking transactions in one place."
    />
  ),
});