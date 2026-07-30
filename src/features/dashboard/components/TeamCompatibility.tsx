"use client";

import { TrendingDown, TrendingUp, Users } from "lucide-react";

import { Card, CardContent } from "@/components/atoms/card";
import { teamCompatibility } from "@/features/dashboard/data/dashboard.data";

export function TeamCompatibility() {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
        Team Compatibility
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {teamCompatibility.map((team) => (
          <Card
            key={team.name}
            className="cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="flex flex-col justify-between space-y-3 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-zinc-100">
                  {team.name}
                </h3>
                <div
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg sm:size-8"
                  style={{ backgroundColor: `${team.color}15` }}
                >
                  <Users className="size-3.5 sm:size-4" style={{ color: team.color }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline gap-1">
                  <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
                    {team.compatibility}%
                  </span>
                  <span className="text-[10px] font-medium text-gray-500 dark:text-zinc-400">
                    compatibility
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 text-xs text-gray-500 dark:text-zinc-400">
                  <span className="font-medium">{team.health}</span>
                  <span className="shrink-0">{team.employees} members</span>
                </div>

                <div className="flex items-center gap-1">
                  {team.trend > 0 ? (
                    <TrendingUp className="size-3 shrink-0 text-emerald-500" />
                  ) : (
                    <TrendingDown className="size-3 shrink-0 text-red-400" />
                  )}
                  <span
                    className={`text-[11px] font-semibold ${
                      team.trend > 0 ? "text-emerald-500" : "text-red-400"
                    }`}
                  >
                    {team.trend > 0 ? "+" : ""}
                    {team.trend}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
