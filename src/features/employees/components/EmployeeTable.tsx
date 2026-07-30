"use client";

import { MoreHorizontal, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";

import type { Employee } from "@/features/employees/types/employees.types";

interface EmployeeTableProps {
  employees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
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

function getEmploymentStatusStyle(status: Employee["employmentStatus"]) {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-700";
    case "Training":
      return "bg-blue-50 text-blue-700";
    case "On Leave":
      return "bg-amber-50 text-amber-700";
    case "Inactive":
      return "bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400";
  }
}

export function EmployeeTable({
  employees,
  onSelectEmployee,
}: EmployeeTableProps) {
  return (
    <Card className="flex flex-col">
      <CardContent className="p-0">
        <ScrollArea className="w-full">
          <div className="min-w-[1000px]">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/60 dark:bg-zinc-900/60 text-gray-500 dark:text-zinc-400 font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Employee</th>
                  <th className="px-4 py-3.5">Department</th>
                  <th className="px-4 py-3.5">Role</th>
                  <th className="px-4 py-3.5">Personality</th>
                  <th className="px-4 py-3.5">Compatibility</th>
                  <th className="px-4 py-3.5">Assessment</th>
                  <th className="px-4 py-3.5">Employment</th>
                  <th className="px-5 py-3.5">AI Snapshot</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    onClick={() => onSelectEmployee(employee)}
                    className="cursor-pointer transition-colors hover:bg-gray-50/70"
                  >
                    {/* Employee Identity */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9 shrink-0">
                          <AvatarFallback className="bg-[#034350] text-xs font-semibold text-white">
                            {employee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-gray-900 dark:text-zinc-100 truncate">
                              {employee.name}
                            </span>
                            <span className="rounded bg-gray-100 dark:bg-zinc-900 px-1.5 py-0.5 text-[9px] font-mono text-gray-500 dark:text-zinc-400">
                              {employee.employeeId}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 dark:text-zinc-500 truncate">
                            {employee.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-4 py-3.5 font-medium text-gray-700 dark:text-zinc-300">
                      {employee.department}
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3.5 text-gray-600 dark:text-zinc-400">
                      {employee.role}
                    </td>

                    {/* Personality Badge */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${getPersonalityBadgeStyle(
                          employee.personalityType,
                        )}`}
                      >
                        {employee.personalityType}
                      </span>
                    </td>

                    {/* Compatibility */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#034350] dark:text-[#4da8b5]">
                          {employee.compatibilityScore}%
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-zinc-500">
                          ({employee.compatibilityLabel})
                        </span>
                      </div>
                    </td>

                    {/* Assessment */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          employee.assessmentStatus === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : employee.assessmentStatus === "In Progress"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400"
                        }`}
                      >
                        {employee.assessmentStatus}
                      </span>
                    </td>

                    {/* Employment */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${getEmploymentStatusStyle(
                          employee.employmentStatus,
                        )}`}
                      >
                        {employee.employmentStatus}
                      </span>
                    </td>

                    {/* AI Snapshot */}
                    <td className="px-5 py-3.5 max-w-[280px]">
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-zinc-400">
                        <Sparkles className="size-3.5 shrink-0 text-[#034350] dark:text-[#4da8b5]" />
                        <span className="truncate text-[11px] leading-tight">
                          {employee.aiSnapshot}
                        </span>
                      </div>
                    </td>

                    {/* Actions Menu */}
                    <td
                      className="px-4 py-3.5 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="size-4 text-gray-400 dark:text-zinc-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onSelectEmployee(employee)}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>Personality Report</DropdownMenuItem>
                          <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
