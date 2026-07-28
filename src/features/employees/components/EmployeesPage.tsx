import { PageHeader } from "@/components/molecules/PageHeader";

export function EmployeesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Browse employee profiles, roles, and personality mapping status."
      />
      <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#FAFBFC] p-8 text-sm text-[#6B7280]">
        Build the employees directory here — search, filters, and profile cards.
      </div>
    </div>
  );
}
