"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Check, CheckCircle2, FileText, Sparkles } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";

interface FinalCompletionScreenProps {
  onReturnHome: () => void;
}

const REPORT_STEPS = [
  "Personality Insights Mapping",
  "Team Compatibility Matrix",
  "Leadership Potential Analysis",
  "Work Style Behavior Vector",
  "Project & Client Fit Matching",
];

export function FinalCompletionScreen({
  onReturnHome,
}: FinalCompletionScreenProps) {
  const [completedStepIndex, setCompletedStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedStepIndex((prev) => {
        if (prev < REPORT_STEPS.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 600);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-xl text-center shadow-2xl transition-all duration-300">
        <CardContent className="space-y-6 p-8 sm:p-12">
          {/* Animated checkmark */}
          <div className="relative mx-auto flex size-20 items-center justify-center rounded-3xl bg-[#034350] text-white shadow-xl shadow-[#034350]/20">
            <Check className="size-10 stroke-[3]" />
            <div className="absolute -right-1 -top-1 size-5 animate-pulse rounded-full bg-teal-400" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Sparkles className="size-3.5" />
              Assessment Completed
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Behavioral Profile Generated
            </h1>
            <p className="text-sm text-gray-500">
              Your responses have been processed through Personality Mapping AI models.
            </p>
          </div>

          {/* Report checklist */}
          <div className="space-y-2.5 rounded-2xl bg-gray-50 p-5 text-left">
            <p className="text-xs font-semibold text-gray-900">
              Generating Workforce Intelligence Reports:
            </p>
            {REPORT_STEPS.map((step, idx) => {
              const isDone = idx < completedStepIndex;

              return (
                <div
                  key={step}
                  className="flex items-center justify-between text-xs transition-opacity duration-300"
                >
                  <span className={isDone ? "font-medium text-gray-800" : "text-gray-400"}>
                    {step}
                  </span>

                  {isDone ? (
                    <span className="flex items-center gap-1 font-semibold text-emerald-600">
                      <CheckCircle2 className="size-3.5" />
                      Generated
                    </span>
                  ) : (
                    <span className="text-[11px] text-gray-400 animate-pulse">
                      Analyzing...
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button variant="outline" onClick={onReturnHome} className="w-full sm:w-auto">
              <ArrowLeft className="size-4" />
              Return to Dashboard
            </Button>
            <Button onClick={onReturnHome} className="w-full sm:w-auto">
              <FileText className="size-4" />
              View Personality Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
