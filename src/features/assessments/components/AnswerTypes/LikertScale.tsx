"use client";

import { Check } from "lucide-react";

interface LikertScaleProps {
  selectedValue?: number;
  onSelect: (value: number) => void;
}

const LIKERT_STEPS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export function LikertScale({ selectedValue, onSelect }: LikertScaleProps) {
  return (
    <div className="space-y-6">
      {/* 5-step scale */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-5 sm:gap-3">
        {LIKERT_STEPS.map((step) => {
          const isSelected = selectedValue === step.value;
          return (
            <button
              key={step.value}
              type="button"
              onClick={() => onSelect(step.value)}
              className={`group flex items-center justify-between rounded-2xl border p-4 sm:flex-col sm:justify-between sm:p-5 transition-all duration-200 ${
                isSelected
                  ? "border-[#034350] bg-[#034350]/[0.04] shadow-md ring-1 ring-[#034350]"
                  : "border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#121212] hover:-translate-y-0.5 hover:border-gray-300 dark:border-zinc-700 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 sm:flex-col sm:gap-0">
                <span className="text-[11px] font-bold text-gray-400 dark:text-zinc-500">
                  0{step.value}
                </span>

                <div
                  className={`my-0 flex size-9 items-center justify-center rounded-xl text-xs font-bold sm:my-3 sm:size-11 transition-all ${
                    isSelected
                      ? "bg-[#034350] text-white shadow-sm"
                      : "bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 group-hover:bg-[#034350]/10 group-hover:text-[#034350] dark:text-[#4da8b5]"
                  }`}
                >
                  {isSelected ? <Check className="size-4 stroke-[3]" /> : step.value}
                </div>
              </div>

              <span
                className={`text-xs font-medium transition-colors sm:text-center ${
                  isSelected ? "font-semibold text-[#034350] dark:text-[#4da8b5]" : "text-gray-600 dark:text-zinc-400"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hidden sm:flex items-center justify-between px-1 text-xs text-gray-400 dark:text-zinc-500">
        <span>← Strongly Disagree</span>
        <span>Strongly Agree →</span>
      </div>
    </div>
  );
}
