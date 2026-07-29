import { AlertTriangle, ArrowDown, Clock } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Card, CardContent } from "@/components/atoms/card";
import { employeesNeedingAttention } from "@/features/dashboard/data/dashboard.data";
import type { EmployeeAttention } from "@/features/dashboard/types/dashboard.types";

const SEVERITY_CONFIG: Record<
  EmployeeAttention["severity"],
  { color: string; bg: string; icon: typeof AlertTriangle }
> = {
  high: { color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle },
  medium: { color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
  low: { color: "text-blue-600", bg: "bg-blue-50", icon: ArrowDown },
};

export function EmployeesAttention() {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-900">
        Employees Needing Attention
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {employeesNeedingAttention.map((employee) => {
          const config = SEVERITY_CONFIG[employee.severity];
          const Icon = config.icon;
          return (
            <Card
              key={employee.name}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="flex items-center gap-4 p-5">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-gray-100 text-xs font-medium text-gray-600">
                    {employee.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {employee.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${config.bg} ${config.color}`}
                    >
                      <Icon className="size-3" />
                      {employee.issue}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
