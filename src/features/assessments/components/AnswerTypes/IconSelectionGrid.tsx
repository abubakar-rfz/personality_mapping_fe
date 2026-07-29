"use client";

import { Check } from "lucide-react";

import type { ChoiceOption } from "@/features/assessments/types/assessments.types";

interface IconSelectionGridProps {
  options: ChoiceOption[];
  selectedValue?: string;
  onSelect: (id: string) => void;
}

export function IconSelectionGrid({
  options,
  selectedValue,
  onSelect,
}: IconSelectionGridProps) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = selectedValue === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`group relative flex flex-col items-center justify-between rounded-2xl border p-5 text-center transition-all duration-200 ${
              isSelected
                ? "border-[#034350] bg-[#034350]/[0.04] shadow-md ring-1 ring-[#034350]"
                : "border-gray-100 bg-white hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <div className="absolute right-3 top-3">
              <div
                className={`flex size-4 items-center justify-center rounded-full border transition-all ${
                  isSelected
                    ? "border-[#034350] bg-[#034350] text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isSelected && <Check className="size-2.5 stroke-[3]" />}
              </div>
            </div>

            <div
              className={`my-2 flex size-12 items-center justify-center rounded-2xl transition-all ${
                isSelected
                  ? "bg-[#034350] text-white"
                  : "bg-gray-100 text-gray-700 group-hover:bg-[#034350]/10 group-hover:text-[#034350]"
              }`}
            >
              {Icon && <Icon className="size-6" />}
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-gray-900">
                {option.label}
              </h4>
              {option.description && (
                <p className="text-[11px] leading-tight text-gray-500">
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
