"use client";

import { Check } from "lucide-react";

import { Badge } from "@/components/atoms/badge";
import type { ChoiceOption } from "@/features/assessments/types/assessments.types";

interface ScenarioCardsProps {
  options: ChoiceOption[];
  selectedValue?: string;
  onSelect: (id: string) => void;
}

export function ScenarioCards({
  options,
  selectedValue,
  onSelect,
}: ScenarioCardsProps) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = selectedValue === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`group relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-200 ${
              isSelected
                ? "border-[#034350] bg-[#034350]/[0.03] shadow-md ring-1 ring-[#034350]"
                : "border-gray-100 bg-white hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                {option.badge && (
                  <Badge variant="secondary" className="text-[#034350]">
                    {option.badge}
                  </Badge>
                )}

                <div
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-[#034350] bg-[#034350] text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="size-3 stroke-[3]" />}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {Icon && (
                  <Icon className="size-4 shrink-0 text-[#034350]" />
                )}
                <h4 className="text-sm font-semibold text-gray-900">
                  {option.label}
                </h4>
              </div>

              {option.description && (
                <p className="text-xs leading-relaxed text-gray-500">
                  {option.description}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
