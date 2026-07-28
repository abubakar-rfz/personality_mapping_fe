import { PageHeader } from "@/components/molecules/PageHeader";

export function QuestionBankPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Question Bank"
        description="Manage assessment questions, categories, and scoring templates."
      />
      <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#FAFBFC] p-8 text-sm text-[#6B7280]">
        Build the question bank here — question editor, categories, and versioning.
      </div>
    </div>
  );
}
