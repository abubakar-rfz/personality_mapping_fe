"use client";

import { Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/atoms/card";
import { Progress } from "@/components/atoms/progress";
import { organizationHealth } from "@/features/dashboard/data/dashboard.data";

export function OrganizationHealth() {
  const { score, status, metrics, aiSummary } = organizationHealth;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <section>
      <h2 className="mb-4 text-sm font-semibold text-gray-900">
        Organization Intelligence
      </h2>
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
            {/* Circular Progress */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs font-medium text-gray-500">
                Organization Health
              </p>
              <div className="relative flex items-center justify-center">
                <svg
                  width="160"
                  height="160"
                  viewBox="0 0 120 120"
                  className="-rotate-90"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="#034350"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-gray-900">
                    {score}%
                  </span>
                  <span className="text-[11px] text-gray-500">{status}</span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="w-full flex-1 space-y-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600">
                      {metric.label}
                    </span>
                    <span className="text-xs font-semibold text-gray-900">
                      {metric.value}%
                    </span>
                  </div>
                  <Progress value={metric.value} />
                </div>
              ))}
            </div>
          </div>

          {/* AI Summary */}
          <div className="mt-6 flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-3">
            <Sparkles className="size-3.5 shrink-0 text-[#034350]" />
            <p className="text-xs text-gray-500">{aiSummary}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
