import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Vault,
  Database,
  ShieldCheck,
  Boxes,
  FileSearch,
  History,
  Layers,
  BadgeCheck,
  Bot,
  BarChart3,
  Share2,
  ScrollText,
  Package,
} from "lucide-react";

import { SectionCard } from "@/components/dashboard/SectionCard";
import { VaultKpis } from "@/components/vault/VaultKpis";
import { VaultStatusBanner } from "@/components/vault/VaultStatusBanner";
import { EvidenceRepository } from "@/components/vault/EvidenceRepository";
import { ChainOfCustody } from "@/components/vault/ChainOfCustody";
import { EvidenceViewer } from "@/components/vault/EvidenceViewer";
import { IntegrityVerification } from "@/components/vault/IntegrityVerification";
import { BlockchainFlow } from "@/components/vault/BlockchainFlow";
import { ComplianceAssistant } from "@/components/vault/ComplianceAssistant";
import { ComplianceCards } from "@/components/vault/ComplianceCards";
import { AuditDashboard } from "@/components/vault/AuditDashboard";
import { ExportCenter } from "@/components/vault/ExportCenter";
import { AuditLog } from "@/components/vault/AuditLog";
import { ForensicPackage } from "@/components/vault/ForensicPackage";

export const Route = createFileRoute("/dashboard/evidence")({
  head: () => ({
    meta: [
      { title: "Secure Evidence Vault™ — SentinelAI" },
      {
        name: "description",
        content:
          "Tamper-proof storage for cyber investigations, AI decisions and digital forensic evidence with immutable audit trails.",
      },
    ],
  }),
  component: EvidenceVaultPage,
});

function EvidenceVaultPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyber-cyan/10 text-cyber-cyan">
            <Vault className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Secure Evidence Vault<span className="align-super text-sm text-cyber-cyan">™</span>
          </h1>
        </div>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          Tamper-proof storage for cyber investigations, AI decisions and digital forensic evidence.
        </p>
      </motion.div>

      <VaultKpis />
      <VaultStatusBanner />

      <SectionCard title="Evidence Repository" subtitle="Searchable immutable evidence records · click a row for details" icon={Database}>
        <EvidenceRepository />
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SectionCard title="Chain of Custody" subtitle="Signed, timestamped custody trail" icon={History}>
          <ChainOfCustody />
        </SectionCard>
        <SectionCard title="Integrity Verification" subtitle="Evidence integrity verification" icon={ShieldCheck}>
          <IntegrityVerification />
        </SectionCard>
      </div>

      <SectionCard title="Digital Evidence Viewer" subtitle="Preview evidence artifacts by category" icon={FileSearch}>
        <EvidenceViewer />
      </SectionCard>

      <SectionCard title="Evidence Assurance Pipeline" subtitle="From incident to immutable audit trail" icon={Boxes}>
        <BlockchainFlow />
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <SectionCard title="AI Compliance Assistant" subtitle="Audit-ready answers for regulators" icon={Bot}>
          <ComplianceAssistant />
        </SectionCard>
        <SectionCard title="Regulatory Compliance" subtitle="Framework coverage & readiness" icon={BadgeCheck}>
          <ComplianceCards />
        </SectionCard>
      </div>

      <SectionCard title="Executive Audit Dashboard" subtitle="Evidence & compliance at a glance" icon={BarChart3}>
        <AuditDashboard />
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SectionCard title="Export Center" subtitle="Generate audit & compliance reports" icon={Share2}>
          <ExportCenter />
        </SectionCard>
        <SectionCard title="Audit Log" subtitle="Immutable record of every action" icon={ScrollText}>
          <AuditLog />
        </SectionCard>
      </div>

      <SectionCard title="Forensic Package" subtitle="Complete downloadable investigation bundle" icon={Package}>
        <ForensicPackage />
      </SectionCard>
    </div>
  );
}