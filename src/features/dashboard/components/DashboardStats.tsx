import { ArrowUpRight } from "lucide-react";

import { dashboardStats } from "@/features/dashboard/data/dashboard.data";

export function DashboardStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className="group rounded-2xl border border-[#E5E7EB]/60 bg-[#FAFBFC] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#034350]/15 hover:shadow-[0_8px_24px_rgba(3,67,80,0.06)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#034350]/10 text-[#034350] transition-colors group-hover:bg-[#034350]/15">
                <Icon className="size-5" />
              </div>
              <ArrowUpRight className="size-4 text-[#D1D5DB] transition-colors group-hover:text-[#034350]" />
            </div>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[#111827]">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-[#111827]">
              {stat.label}
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">{stat.change}</p>
          </article>
        );
      })}
    </section>
  );
}
