"use client";

import { CheckCircle2, Circle, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/atoms/card";
import { Progress } from "@/components/atoms/progress";
import { assessmentSections } from "@/features/assessments/data/assessments.data";

interface AssessmentSidebarProps {
  currentSectionId: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  answeredCount: number;
}

export function AssessmentSidebar({
  currentSectionId,
  currentQuestionIndex,
  totalQuestions,
  answeredCount,
}: AssessmentSidebarProps) {
  const overallProgress = Math.round((answeredCount / totalQuestions) * 100);
  const questionsRemaining = totalQuestions - answeredCount;

  return (
    <div className="space-y-4 lg:sticky lg:top-6">
      {/* Overall Progress Card */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-900">
              Assessment Progress
            </h3>
            <span className="text-xs font-bold text-[#034350]">
              {overallProgress}%
            </span>
          </div>

          <Progress value={overallProgress} />

          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <span>{answeredCount} of {totalQuestions} Answered</span>
            <span>{questionsRemaining} Remaining</span>
          </div>

          <div className="rounded-xl bg-[#034350]/[0.03] p-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-[#034350]" />
              <span className="text-[11px] font-semibold text-[#034350]">
                Live AI Trait Mapping Active
              </span>
            </div>
            <p className="mt-1 text-[10px] text-gray-500">
              Real-time neural model processing work style & behavioral vectors.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sections Status Checklist */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="space-y-3 p-5">
          <h3 className="text-xs font-semibold text-gray-900">
            Sections Breakdown
          </h3>

          <div className="space-y-2">
            {assessmentSections.map((sec) => {
              const isCurrent = sec.id === currentSectionId;
              const isDone = sec.id < currentSectionId;

              return (
                <div
                  key={sec.id}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${
                    isCurrent
                      ? "bg-[#034350]/10 font-semibold text-[#034350]"
                      : isDone
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isDone ? (
                      <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" />
                    ) : (
                      <Circle className="size-3.5 shrink-0" />
                    )}
                    <span className="truncate">{sec.name}</span>
                  </div>
                  <span className="text-[10px] shrink-0">
                    {sec.questionCount} Qs
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl bg-gray-50 p-3 text-center">
            <p className="text-[11px] font-medium text-gray-600">
              "You're doing great! {questionsRemaining} questions remaining."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
