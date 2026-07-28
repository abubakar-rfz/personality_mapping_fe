import { Sparkles } from "lucide-react";

import { Badge } from "@/components/atoms/badge";
import { aiInsights } from "@/features/dashboard/data/dashboard.data";
import type { AiInsight } from "@/features/dashboard/types/dashboard.types";

function PriorityBadge({ priority }: { priority: AiInsight["priority"] }) {
  const styles: Record<AiInsight["priority"], "default" | "secondary" | "outline"> = {
    High: "default",
    Medium: "secondary",
    Low: "outline",
  };

  return <Badge variant={styles[priority]}>{priority}</Badge>;
}

export function AiInsights() {
  return (
    <article className="rounded-2xl border border-[#E5E7EB]/60 xl:col-span-2">
      <div className="border-b border-[#E5E7EB]/60 px-5 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-[#034350]" />
          <h2 className="text-base font-semibold text-[#111827]">AI Insights</h2>
        </div>
        <p className="mt-1 text-xs text-[#6B7280]">
          Recommendations based on team personality data
        </p>
      </div>

      <div className="space-y-4 p-5">
        {aiInsights.map((insight) => (
          <div
            key={insight.title}
            className="rounded-xl bg-[#F8FAFC] p-4 transition-colors hover:bg-[#F4F6F8]"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-[#111827]">
                {insight.title}
              </p>
              <PriorityBadge priority={insight.priority} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
