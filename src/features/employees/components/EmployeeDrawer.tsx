"use client";

import { Building2, Sparkles, UserCheck, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Progress } from "@/components/atoms/progress";
import { ScrollArea } from "@/components/atoms/scroll-area";

import type { Employee } from "@/features/employees/types/employees.types";

interface EmployeeDrawerProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
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

export function EmployeeDrawer({
  employee,
  isOpen,
  onClose,
}: EmployeeDrawerProps) {
  if (!isOpen || !employee) return null;

  const skillList = [
    { label: "Leadership & Ownership", value: employee.skills.leadership },
    { label: "Communication Style", value: employee.skills.communication },
    { label: "Collaboration & Teamwork", value: employee.skills.collaboration },
    { label: "Adaptability & Resilience", value: employee.skills.adaptability },
    { label: "Technical Readiness", value: employee.skills.technicalReadiness },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs animate-in fade-in-0">
      <div className="relative flex h-full w-full max-w-lg flex-col border-l border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#121212] shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#034350] dark:text-[#4da8b5]" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
              Workforce Intelligence Profile
            </h2>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="size-4 text-gray-500 dark:text-zinc-400" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-6">
            {/* Top Identity Block */}
            <div className="flex items-start gap-4">
              <Avatar className="size-16 border-2 border-white shadow-md">
                <AvatarFallback className="bg-[#034350] text-base font-semibold text-white">
                  {employee.initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-zinc-100">
                    {employee.name}
                  </h1>
                  <span className="rounded-md bg-gray-100 dark:bg-zinc-900 px-2 py-0.5 text-[10px] font-mono text-gray-500 dark:text-zinc-400">
                    {employee.employeeId}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#034350] dark:text-[#4da8b5]">
                  {employee.role}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Building2 className="size-3 text-gray-400 dark:text-zinc-500" />
                    {employee.department}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <UserCheck className="size-3 text-gray-400 dark:text-zinc-500" />
                    Manager: {employee.manager}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Status Pills */}
            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-gray-50 dark:bg-zinc-900/50 p-4">
              <div>
                <span className="text-[10px] font-medium text-gray-400 dark:text-zinc-500">
                  Personality Vector
                </span>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getPersonalityBadgeStyle(
                      employee.personalityType,
                    )}`}
                  >
                    {employee.personalityType}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-medium text-gray-400 dark:text-zinc-500">
                  Role Fit Compatibility
                </span>
                <p className="mt-1 text-sm font-bold text-[#034350] dark:text-[#4da8b5]">
                  {employee.compatibilityScore}% ({employee.compatibilityLabel})
                </p>
              </div>
            </div>

            {/* AI Summary Block */}
            <div className="space-y-2 rounded-2xl border border-[#034350]/10 bg-[#034350]/[0.03] dark:bg-[#4da8b5]/[0.05] p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#034350] dark:text-[#4da8b5]" />
                <h3 className="text-xs font-semibold text-[#034350] dark:text-[#4da8b5]">
                  AI Behavioral Assessment
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-zinc-400">
                "{employee.aiSnapshot}"
              </p>
              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-zinc-400 pt-1">
                {employee.aiDetailedSummary}
              </p>
            </div>

            {/* Skill Metrics */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-900 dark:text-zinc-100">
                Core Competencies & Behavioral Radar
              </h3>
              <div className="space-y-3">
                {skillList.map((skill) => (
                  <div key={skill.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600 dark:text-zinc-400">{skill.label}</span>
                      <span className="font-semibold text-gray-900 dark:text-zinc-100">
                        {skill.value}%
                      </span>
                    </div>
                    <Progress value={skill.value} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 dark:border-zinc-800 p-4 space-y-2 bg-gray-50/50">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full text-xs">
              Assign Project
            </Button>
            <Button variant="outline" className="w-full text-xs">
              Assign Client
            </Button>
          </div>
          <Button className="w-full text-xs" onClick={onClose}>
            View Full Personality Report
          </Button>
        </div>
      </div>
    </div>
  );
}
