"use client";

import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import {
  SKILL_COLUMNS,
  skillHeatmapData,
} from "@/features/dashboard/data/dashboard.data";

function getScoreColor(score: number): string {
  if (score >= 90) return "bg-[#034350]";
  if (score >= 75) return "bg-[#0a6b7c]";
  if (score >= 60) return "bg-[#4da8b5]";
  if (score >= 40) return "bg-[#9ecfd7]";
  return "bg-gray-200";
}

function getScoreTextColor(score: number): string {
  if (score >= 60) return "text-white";
  return "text-gray-600";
}

export function SkillHeatmap() {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-900">Skill Heatmap</h2>
      <Card>
        <CardContent className="p-6">
          <ScrollArea className="w-full">
            <div className="min-w-[640px]">
              {/* Header row */}
              <div className="mb-2 grid grid-cols-[180px_repeat(7,1fr)] gap-1.5">
                <div />
                {SKILL_COLUMNS.map((skill) => (
                  <div
                    key={skill}
                    className="px-1 text-center text-[10px] font-medium text-gray-500"
                  >
                    {skill}
                  </div>
                ))}
              </div>

              {/* Data rows */}
              <div className="space-y-1.5">
                {skillHeatmapData.map((row) => (
                  <div
                    key={row.employee}
                    className="grid grid-cols-[180px_repeat(7,1fr)] items-center gap-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarFallback className="bg-gray-100 text-[10px] font-medium text-gray-600">
                          {row.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate text-xs font-medium text-gray-700">
                        {row.employee}
                      </span>
                    </div>

                    {SKILL_COLUMNS.map((skill) => {
                      const score = row.scores[skill] ?? 0;
                      return (
                        <TooltipProvider key={skill}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={`flex h-8 items-center justify-center rounded-lg text-[11px] font-semibold transition-transform hover:scale-105 ${getScoreColor(score)} ${getScoreTextColor(score)}`}
                              >
                                {score}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {row.employee} — {skill}: {score}/100
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </section>
  );
}
