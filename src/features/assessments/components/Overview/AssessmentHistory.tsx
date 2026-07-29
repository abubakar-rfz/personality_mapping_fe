"use client";

import { useMemo, useState } from "react";
import { Filter, MoreHorizontal, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Input } from "@/components/atoms/input";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import { mockAssessmentHistory } from "@/features/assessments/data/assessments.data";

export function AssessmentHistory() {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredHistory = useMemo(() => {
    return mockAssessmentHistory.filter((item) => {
      const matchesSearch =
        item.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        item.employeeRole.toLowerCase().includes(search.toLowerCase());
      const matchesDept =
        departmentFilter === "all" || item.department === departmentFilter;
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [search, departmentFilter, statusFilter]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-5 pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Assessment History</CardTitle>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[180px] flex-1 sm:flex-none">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search employee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pl-8 text-xs"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="h-8 rounded-lg border border-gray-200 bg-white px-2.5 text-xs text-gray-700 outline-none focus:border-[#034350]"
              >
                <option value="all">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="AI & Analytics">AI & Analytics</option>
                <option value="QA">QA</option>
                <option value="Management">Management</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-8 rounded-lg border border-gray-200 bg-white px-2.5 text-xs text-gray-700 outline-none focus:border-[#034350]"
              >
                <option value="all">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="w-full">
          <div className="min-w-[640px]">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-100 bg-gray-50/50 text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Employee</th>
                  <th className="px-5 py-3 font-medium">Department</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Fit Score</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-gray-50/50"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-[#034350] text-[10px] text-white">
                            {item.employeeInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.employeeName}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {item.employeeRole}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-gray-600">
                      {item.department}
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          item.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : item.status === "In Progress"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 font-semibold text-[#034350]">
                      {item.compatibility}%
                    </td>

                    <td className="px-5 py-3.5 text-gray-400">{item.date}</td>

                    <td className="px-5 py-3.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="size-4 text-gray-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View AI Report</DropdownMenuItem>
                          <DropdownMenuItem>Re-assign Assessment</DropdownMenuItem>
                          <DropdownMenuItem>Export PDF Summary</DropdownMenuItem>
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
