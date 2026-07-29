"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Card, CardContent } from "@/components/atoms/card";
import {
  burnoutRisk,
  engagementScore,
} from "@/features/dashboard/data/dashboard.data";
import type { RadialMetricData } from "@/features/dashboard/types/dashboard.types";

function RadialMetricCard({ metric }: { metric: RadialMetricData }) {
  const data = [
    { name: "value", value: metric.value },
    { name: "rest", value: 100 - metric.value },
  ];

  return (
    <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex flex-col items-center p-8">
        <h3 className="text-sm font-semibold text-gray-900">{metric.label}</h3>

        <div className="relative my-4">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={65}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill={metric.statusColor} />
                <Cell fill="#f1f5f9" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">
              {metric.value}%
            </span>
          </div>
        </div>

        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: `${metric.statusColor}15`,
            color: metric.statusColor,
          }}
        >
          {metric.status}
        </span>
        <p className="mt-3 text-center text-xs text-gray-500">
          {metric.description}
        </p>
      </CardContent>
    </Card>
  );
}

export function WorkforceHealth() {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-900">Workforce Health</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <RadialMetricCard metric={burnoutRisk} />
        <RadialMetricCard metric={engagementScore} />
      </div>
    </section>
  );
}
