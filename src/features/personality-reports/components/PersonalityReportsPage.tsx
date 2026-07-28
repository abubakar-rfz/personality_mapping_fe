import { PageHeader } from "@/components/molecules/PageHeader";

export function PersonalityReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Personality Reports"
        description="View detailed personality profiles and downloadable reports."
      />
      <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#FAFBFC] p-8 text-sm text-[#6B7280]">
        Build personality reports here — charts, trait breakdowns, and export options.
      </div>
    </div>
  );
}
