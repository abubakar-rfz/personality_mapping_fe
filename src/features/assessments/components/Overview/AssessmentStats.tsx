"use client";

import { Card, CardContent } from "@/components/atoms/card";
import { assessmentStats } from "@/features/assessments/data/assessments.data";

export function AssessmentStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {assessmentStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="flex flex-col justify-between p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                  {stat.label}
                </span>
                <div className="flex size-8 items-center justify-center rounded-xl bg-[#034350]/5 dark:bg-[#4da8b5]/10">
                  <Icon className="size-4 text-[#034350] dark:text-[#4da8b5]" />
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
                  {stat.value}
                </span>
                <p className="text-[11px] font-medium text-[#034350] dark:text-[#4da8b5]">
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
