"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import {
  compatibilityTrends,
  personalityDistribution,
  workStyles,
} from "@/features/dashboard/data/dashboard.data";
import type { TrendPeriod } from "@/features/dashboard/types/dashboard.types";

const TREND_PERIODS: TrendPeriod[] = ["weekly", "monthly", "quarterly"];

function ChartTooltip({
  active,
  payload,
  labelKey,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; payload?: Record<string, unknown> }>;
  labelKey?: string;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const label = labelKey && item.payload ? (item.payload[labelKey] as string) : item.name;
  return (
    <div className="rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#121212] px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-gray-900 dark:text-zinc-100">{label}</p>
      <p className="text-xs text-gray-500 dark:text-zinc-400">{item.value}%</p>
    </div>
  );
}

export function AnalyticsCards() {
  const [trendPeriod, setTrendPeriod] = useState<TrendPeriod>("monthly");

  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Personality Distribution — Donut */}
      <Card className="flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader className="px-5 pt-5 pb-2 sm:px-6 sm:pt-6">
          <CardTitle className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
            Personality Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between px-4 pb-5 pt-0 sm:px-6 sm:pb-6">
          <div className="h-[200px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={personalityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {personalityDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {personalityDistribution.map((cat) => (
              <div key={cat.name} className="flex items-center gap-1.5">
                <div
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-[11px] font-medium text-gray-500 dark:text-zinc-400">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Work Style Breakdown — Bar */}
      <Card className="flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader className="px-5 pt-5 pb-2 sm:px-6 sm:pt-6">
          <CardTitle className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
            Work Style Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-5 pt-0 sm:px-6 sm:pb-6">
          <div className="h-[220px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={workStyles}
                layout="vertical"
                margin={{ top: 10, left: 0, right: 16, bottom: 0 }}
              >
                <CartesianGrid
                  horizontal={false}
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={85}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <RechartsTooltip content={<ChartTooltip labelKey="name" />} />
                <Bar
                  dataKey="value"
                  fill="#034350"
                  radius={[0, 6, 6, 0]}
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Compatibility Trend — Line */}
      <Card className="flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:col-span-2 lg:col-span-1">
        <CardHeader className="px-5 pt-5 pb-2 sm:px-6 sm:pt-6">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="truncate text-sm font-semibold text-gray-900 dark:text-zinc-100">
              Compatibility Trend
            </CardTitle>
            <div className="flex shrink-0 items-center rounded-lg bg-gray-100 dark:bg-zinc-900 p-0.5 self-start sm:self-auto">
              {TREND_PERIODS.map((period) => (
                <button
                  key={period}
                  onClick={() => setTrendPeriod(period)}
                  className={`rounded-md px-2.5 py-1 text-[10px] font-medium capitalize transition-all ${
                    trendPeriod === period
                      ? "bg-white dark:bg-[#121212] text-gray-900 dark:text-zinc-100 shadow-sm"
                      : "text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:text-zinc-300"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-3 pb-5 pt-2 sm:px-6 sm:pb-6">
          <div className="h-[200px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={compatibilityTrends[trendPeriod]}
                margin={{ top: 10, right: 16, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[60, 100]}
                />
                <RechartsTooltip content={<ChartTooltip labelKey="label" />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#034350"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#034350" }}
                  activeDot={{ r: 5, fill: "#034350" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
