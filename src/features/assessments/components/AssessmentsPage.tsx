import { PageHeader } from "@/components/molecules/PageHeader";

export function AssessmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Assessments"
        description="Create, manage, and track personality assessments across your organization."
      />
      <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#FAFBFC] p-8 text-sm text-[#6B7280]">
        Build the assessments feature here — forms, templates, and completion tracking.
      </div>
    </div>
  );
}
