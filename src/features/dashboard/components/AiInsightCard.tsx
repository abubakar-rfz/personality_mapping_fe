import { ArrowRight, Sparkles } from "lucide-react";

import { aiInsightOfDay } from "@/features/dashboard/data/dashboard.data";

export function AiInsightCard() {
  const { title, subtitle, detail, actions } = aiInsightOfDay;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#034350] via-[#045a6a] to-[#034350] p-8 text-white">
      {/* Glow effects */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 size-80 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="relative space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-teal-300" />
          <h2 className="text-sm font-semibold text-teal-200">{title}</h2>
        </div>

        <div className="space-y-1">
          <p className="text-lg font-semibold">{subtitle}</p>
          <p className="text-sm text-white/70">{detail}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-teal-300">
            Recommended Actions
          </p>
          <div className="flex flex-wrap gap-2">
            {actions.map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {action.label}
                <ArrowRight className="size-3" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
