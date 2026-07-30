"use client";

import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";

import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Progress } from "@/components/atoms/progress";
import { assessmentSections } from "@/features/assessments/data/assessments.data";

interface AssessmentLibraryProps {
  onStartSection: (sectionId: number) => void;
}

export function AssessmentLibrary({ onStartSection }: AssessmentLibraryProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {assessmentSections.map((section) => {
          const Icon = section.icon;
          const progressPercent = Math.round(
            (section.completedQuestionsCount / section.questionCount) * 100,
          );

          let statusBadgeText = "Not Started";
          let statusBadgeClass = "bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 border-gray-200 dark:border-zinc-800";

          if (section.status === "completed") {
            statusBadgeText = "Completed";
            statusBadgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
          } else if (section.status === "in_progress") {
            statusBadgeText = "In Progress";
            statusBadgeClass = "bg-[#034350]/10 text-[#034350] dark:text-[#4da8b5] border-[#034350]/20";
          }

          return (
            <Card
              key={section.id}
              className="group flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-[#034350]/30 hover:shadow-lg"
            >
              <CardContent className="flex flex-1 flex-col justify-between space-y-5 p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#034350]/5 dark:bg-[#4da8b5]/10 text-[#034350] dark:text-[#4da8b5] transition-colors group-hover:bg-[#034350] group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusBadgeClass}`}
                    >
                      {section.status === "in_progress" && (
                        <span className="size-1.5 animate-pulse rounded-full bg-[#034350]" />
                      )}
                      {statusBadgeText}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-gray-400 dark:text-zinc-500">
                        0{section.id}
                      </span>
                      <h3 className="text-base font-semibold tracking-tight text-gray-900 dark:text-zinc-100">
                        {section.name}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-zinc-400 line-clamp-2">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400 border-t border-gray-100 dark:border-zinc-800 pt-3">
                    <span>{section.questionCount} Questions</span>
                    <span className="font-medium">~{section.estimatedMinutes} mins</span>
                  </div>

                  {section.status === "in_progress" && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-medium text-gray-500 dark:text-zinc-400">
                        <span>Module Progress</span>
                        <span className="font-semibold text-[#034350] dark:text-[#4da8b5]">
                          {progressPercent}%
                        </span>
                      </div>
                      <Progress value={progressPercent} />
                    </div>
                  )}

                  <Button
                    variant={section.status === "completed" ? "outline" : "default"}
                    className="w-full justify-between text-xs font-semibold py-2.5"
                    onClick={() => onStartSection(section.id)}
                  >
                    <span>
                      {section.status === "completed"
                        ? "Review Answers"
                        : section.status === "in_progress"
                        ? "Continue Section"
                        : "Start Assessment"}
                    </span>

                    {section.status === "completed" ? (
                      <CheckCircle2 className="size-4 text-emerald-600" />
                    ) : section.status === "in_progress" ? (
                      <ArrowRight className="size-4" />
                    ) : (
                      <Play className="size-3.5 fill-current" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
