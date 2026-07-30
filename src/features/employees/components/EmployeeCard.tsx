"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";

import type { Employee } from "@/features/employees/types/employees.types";

interface EmployeeCardProps {
  employee: Employee;
  onSelect: (employee: Employee) => void;
}

function getPersonalityBadgeStyle(type: Employee["personalityType"]) {
  switch (type) {
    case "Analytical":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Amiable":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Driver":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Expressive":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-800";
  }
}

export function EmployeeCard({ employee, onSelect }: EmployeeCardProps) {
  return (
    <Card className="group flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-[#034350]/30 hover:shadow-lg w-full min-w-0 overflow-hidden">
      <CardContent className="flex flex-1 flex-col justify-between space-y-4 p-5 min-w-0">
        <div className="space-y-3 min-w-0">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 min-w-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Avatar className="size-10 shrink-0">
                <AvatarFallback className="bg-[#034350] text-xs font-semibold text-white">
                  {employee.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-gray-900 dark:text-zinc-100">
                  {employee.name}
                </h3>
                <p className="truncate text-xs text-[#034350] dark:text-[#4da8b5] font-medium leading-tight pt-0.5">
                  {employee.role}
                </p>
                <p className="truncate text-[11px] text-gray-400 dark:text-zinc-500 pt-0.5">
                  {employee.department} · {employee.employeeId}
                </p>
              </div>
            </div>

            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-wide whitespace-nowrap self-start ${getPersonalityBadgeStyle(
                employee.personalityType,
              )}`}
            >
              {employee.personalityType}
            </span>
          </div>

          {/* Compatibility & Status */}
          <div className="flex items-center justify-between gap-2 rounded-xl bg-gray-50 dark:bg-zinc-900/50 p-2.5 text-xs min-w-0">
            <div className="flex items-baseline gap-1 min-w-0">
              <span className="font-bold text-[#034350] dark:text-[#4da8b5] shrink-0">
                {employee.compatibilityScore}%
              </span>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400 truncate">Fit Match</span>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                employee.assessmentStatus === "Completed"
                  ? "bg-emerald-50 text-emerald-700"
                  : employee.assessmentStatus === "In Progress"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-gray-200 text-gray-600 dark:text-zinc-400"
              }`}
            >
              {employee.assessmentStatus}
            </span>
          </div>

          {/* Signature AI Snapshot */}
          <div className="flex items-start gap-2 rounded-xl bg-[#034350]/[0.03] dark:bg-[#4da8b5]/[0.05] p-2.5 min-w-0">
            <Sparkles className="size-3.5 shrink-0 text-[#034350] dark:text-[#4da8b5] mt-0.5" />
            <p className="text-[11px] leading-relaxed text-gray-600 dark:text-zinc-400 line-clamp-2 min-w-0">
              {employee.aiSnapshot}
            </p>
          </div>
        </div>

        {/* Footer Quick Action */}
        <Button
          variant="outline"
          className="w-full justify-between text-xs font-semibold mt-2"
          onClick={() => onSelect(employee)}
        >
          <span>View Profile</span>
          <ArrowUpRight className="size-3.5 text-gray-400 dark:text-zinc-500 group-hover:text-[#034350] dark:text-[#4da8b5] shrink-0" />
        </Button>
      </CardContent>
    </Card>
  );
}
