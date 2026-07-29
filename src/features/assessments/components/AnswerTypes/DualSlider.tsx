"use client";

interface DualSliderProps {
  leftLabel: string;
  rightLabel: string;
  value?: number; // 0 to 100
  onChange: (value: number) => void;
}

export function DualSlider({
  leftLabel,
  rightLabel,
  value = 50,
  onChange,
}: DualSliderProps) {
  return (
    <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="size-2.5 rounded-full bg-[#034350]" />
          <span className="text-xs font-semibold text-gray-900">
            {leftLabel}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:justify-end">
          <span className="text-xs font-semibold text-[#0a6b7c]">
            {rightLabel}
          </span>
          <div className="size-2.5 rounded-full bg-[#0a6b7c]" />
        </div>
      </div>

      <div className="relative pt-2">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-100 accent-[#034350] focus:outline-none"
        />

        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
          <span>0% ({leftLabel})</span>
          <span className="font-semibold text-[#034350]">
            {value}% Lean
          </span>
          <span>100% ({rightLabel})</span>
        </div>
      </div>
    </div>
  );
}
