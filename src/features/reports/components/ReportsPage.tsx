import { PageHeader } from "@/components/molecules/PageHeader";

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate and export organization-wide workforce intelligence reports."
      />
      <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#FAFBFC] p-8 text-sm text-[#6B7280]">
        Build reports here — report builder, templates, and scheduled exports.
      </div>
    </div>
  );
}
