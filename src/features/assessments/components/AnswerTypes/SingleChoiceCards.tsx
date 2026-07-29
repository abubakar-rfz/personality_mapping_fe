"use client";

import { Check } from "lucide-react";

import type { ChoiceOption } from "@/features/assessments/types/assessments.types";

interface SingleChoiceCardsProps {
  options: ChoiceOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

export function SingleChoiceCards({
  options,
  selectedValue,
  onSelect,
}: SingleChoiceCardsProps) {
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
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {Icon && (
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isSelected
                        ? "bg-[#034350] text-white"
                        : "bg-gray-100 text-gray-700 group-hover:bg-[#034350]/10 group-hover:text-[#034350]"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                )}
                <h4 className="text-sm font-semibold text-gray-900">
                  {option.label}
                </h4>
              </div>

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

            {option.description && (
              <p className="mt-3 text-xs leading-relaxed text-gray-500">
                {option.description}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
