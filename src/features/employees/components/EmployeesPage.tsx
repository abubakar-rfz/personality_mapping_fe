"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Filter,
  FilterX,
  LayoutGrid,
  Plus,
  Search,
  Table as TableIcon,
  Users,
} from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { EmployeeCard } from "@/features/employees/components/EmployeeCard";
import { EmployeeDrawer } from "@/features/employees/components/EmployeeDrawer";
import { EmployeeTable } from "@/features/employees/components/EmployeeTable";
import {
  employeeOverviewStats,
  mockEmployees,
} from "@/features/employees/data/employees.data";
import type { Employee } from "@/features/employees/types/employees.types";

export function EmployeesPage() {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [search, setSearch] = useState("");

  // Filters
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [assessmentFilter, setAssessmentFilter] = useState("all");
  const [personalityFilter, setPersonalityFilter] = useState("all");
  const [employmentFilter, setEmploymentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Selected Employee for Drawer
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = (emp: Employee) => {
    setSelectedEmployee(emp);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const resetFilters = () => {
    setSearch("");
    setDepartmentFilter("all");
    setAssessmentFilter("all");
    setPersonalityFilter("all");
    setEmploymentFilter("all");
    setSortBy("default");
  };

  const filteredEmployees = useMemo(() => {
    let result = mockEmployees.filter((emp) => {
      const query = search.toLowerCase();
      const matchesSearch =
        emp.name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.employeeId.toLowerCase().includes(query) ||
        emp.role.toLowerCase().includes(query);

      const matchesDept =
        departmentFilter === "all" || emp.department === departmentFilter;
      const matchesAssessment =
        assessmentFilter === "all" || emp.assessmentStatus === assessmentFilter;
      const matchesPersonality =
        personalityFilter === "all" || emp.personalityType === personalityFilter;
      const matchesEmployment =
        employmentFilter === "all" || emp.employmentStatus === employmentFilter;

      return (
        matchesSearch &&
        matchesDept &&
        matchesAssessment &&
        matchesPersonality &&
        matchesEmployment
      );
    });

    if (sortBy === "compatibility") {
      result = [...result].sort(
        (a, b) => b.compatibilityScore - a.compatibilityScore,
      );
    } else if (sortBy === "department") {
      result = [...result].sort((a, b) =>
        a.department.localeCompare(b.department),
      );
    }

    return result;
  }, [
    search,
    departmentFilter,
    assessmentFilter,
    personalityFilter,
    employmentFilter,
    sortBy,
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8 overflow-x-hidden">
      {/* Page Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-3xl">
            Employees
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Explore your workforce through AI-powered personality insights and workplace intelligence.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <Button variant="outline" className="w-full sm:w-auto text-xs justify-center">
            <Download className="size-3.5" />
            Import Employees
          </Button>
          <Button className="w-full sm:w-auto text-xs justify-center">
            <Plus className="size-3.5" />
            Add Employee
          </Button>
        </div>
      </section>

      {/* 5 Top Overview Stats (Horizontal Scroll on Mobile, Grid on Tablet/Desktop) */}
      <div className="flex w-full gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-x-visible sm:pb-0 lg:grid-cols-5">
        {employeeOverviewStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="min-w-[200px] shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:min-w-0"
            >
              <CardContent className="flex flex-col justify-between p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                    {stat.label}
                  </span>
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#034350]/5 dark:bg-[#4da8b5]/10">
                    <Icon className="size-4 text-[#034350] dark:text-[#4da8b5]" />
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
                    {stat.value}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
                    <span
                      className={`font-semibold shrink-0 ${
                        stat.trendUp ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      {stat.trend}
                    </span>
                    <span className="text-gray-400 dark:text-zinc-500 truncate">
                      {stat.description}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search & Multi-Filter Control Bar */}
      <div className="space-y-4 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#121212] p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
            <Input
              placeholder="Search employee, email or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 pl-9 text-xs w-full"
            />
          </div>

          {/* Desktop/Tablet View Mode Toggle (Hidden on Mobile) */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="inline-flex rounded-xl bg-gray-100 dark:bg-zinc-900 p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === "table"
                    ? "bg-white dark:bg-[#121212] text-[#034350] dark:text-[#4da8b5] shadow-sm"
                    : "text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:text-zinc-100"
                }`}
              >
                <TableIcon className="size-3.5" />
                Table
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === "card"
                    ? "bg-white dark:bg-[#121212] text-[#034350] dark:text-[#4da8b5] shadow-sm"
                    : "text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:text-zinc-100"
                }`}
              >
                <LayoutGrid className="size-3.5" />
                Cards
              </button>
            </div>
          </div>
        </div>

        {/* Filters Row (Horizontal scroll list on Mobile, flex-wrap on desktop) */}
        <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 border-t border-gray-100 dark:border-zinc-800 pt-3 text-xs scrollbar-none sm:flex-wrap sm:overflow-x-visible sm:pb-0">
          <div className="flex items-center gap-2 shrink-0 sm:shrink">
            {/* Department */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="h-8 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2 text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350] text-[11px]"
            >
              <option value="all">Department: All</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="AI & Analytics">AI & Analytics</option>
              <option value="QA">QA</option>
              <option value="Management">Management</option>
              <option value="Product">Product</option>
              <option value="HR & People">HR & People</option>
              <option value="Security">Security</option>
            </select>

            {/* Assessment */}
            <select
              value={assessmentFilter}
              onChange={(e) => setAssessmentFilter(e.target.value)}
              className="h-8 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2 text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350] text-[11px]"
            >
              <option value="all">Assessment: All</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Needs Review">Needs Review</option>
            </select>

            {/* Personality */}
            <select
              value={personalityFilter}
              onChange={(e) => setPersonalityFilter(e.target.value)}
              className="h-8 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2 text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350] text-[11px]"
            >
              <option value="all">Personality: All</option>
              <option value="Analytical">🟦 Analytical</option>
              <option value="Amiable">🟩 Amiable</option>
              <option value="Driver">🟨 Driver</option>
              <option value="Expressive">🟪 Expressive</option>
            </select>

            {/* Employment */}
            <select
              value={employmentFilter}
              onChange={(e) => setEmploymentFilter(e.target.value)}
              className="h-8 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2 text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350] text-[11px]"
            >
              <option value="all">Employment: All</option>
              <option value="Active">Active</option>
              <option value="Training">Training</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-8 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2 text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350] text-[11px]"
            >
              <option value="default">Sort By: Default</option>
              <option value="compatibility">Highest Compatibility</option>
              <option value="department">Department</option>
            </select>
          </div>

          {/* Reset Filters button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-8 text-xs text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:text-zinc-100 ml-auto shrink-0"
          >
            <FilterX className="size-3.5" />
            Reset
          </Button>
        </div>
      </div>

      {/* Main Employee Content (Force stacked Card view on mobile, toggleable on larger screens) */}
      {filteredEmployees.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-gray-100 dark:border-zinc-800 shadow-sm">
          <div className="flex size-16 items-center justify-center rounded-3xl bg-gray-100 dark:bg-zinc-900 text-gray-400 dark:text-zinc-500 mb-4">
            <Users className="size-8" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">No employees found</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400 max-w-sm">
            Adjust your search filters or clear your selection to view workforce profiles.
          </p>
          <Button className="mt-6 text-xs" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Card>
      ) : (
        <>
          {/* Desktop/Tablet: Show view mode selection */}
          <div className="hidden sm:block">
            {viewMode === "table" ? (
              <EmployeeTable
                employees={filteredEmployees}
                onSelectEmployee={handleOpenDrawer}
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredEmployees.map((emp) => (
                  <EmployeeCard
                    key={emp.id}
                    employee={emp}
                    onSelect={handleOpenDrawer}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Mobile Only: Force responsive card layout */}
          <div className="block sm:hidden space-y-4">
            {filteredEmployees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onSelect={handleOpenDrawer}
              />
            ))}
          </div>
        </>
      )}

      {/* Profile Drawer */}
      <EmployeeDrawer
        employee={selectedEmployee}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
