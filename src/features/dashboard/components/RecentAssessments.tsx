import { Button } from "@/components/atoms/button";
import { recentAssessments } from "@/features/dashboard/data/dashboard.data";
import type { RecentAssessment } from "@/features/dashboard/types/dashboard.types";

function StatusBadge({ status }: { status: RecentAssessment["status"] }) {
  const styles: Record<RecentAssessment["status"], string> = {
    Completed: "bg-emerald-50 text-emerald-700",
    "In Progress": "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function RecentAssessments() {
  return (
    <article className="rounded-2xl border border-[#E5E7EB]/60 xl:col-span-3">
      <div className="flex items-center justify-between border-b border-[#E5E7EB]/60 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#111827]">
            Recent Assessments
          </h2>
          <p className="text-xs text-[#6B7280]">
            Latest personality mapping activity
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-[#034350]">
          View all
        </Button>
      </div>

      <div className="divide-y divide-[#E5E7EB]/60">
        {recentAssessments.map((item) => (
          <div
            key={item.name}
            className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-[#F8FAFC] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-[#111827]">{item.name}</p>
              <p className="truncate text-sm text-[#6B7280]">
                {item.role} · {item.type}
              </p>
            </div>

            <div className="flex items-center gap-3 sm:shrink-0">
              <StatusBadge status={item.status} />
              <span className="text-xs text-[#9CA3AF]">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
