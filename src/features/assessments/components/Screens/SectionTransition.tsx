"use client";

import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";

interface SectionTransitionProps {
  completedSectionName: string;
  nextSectionName?: string;
  onContinue: () => void;
}

export function SectionTransition({
  completedSectionName,
  nextSectionName,
  onContinue,
}: SectionTransitionProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center transition-all duration-300 shadow-xl">
        <CardContent className="space-y-6 p-8 sm:p-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#034350]/10">
            <CheckCircle2 className="size-8 text-[#034350]" />
          </div>

          <div className="space-y-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Section Completed
            </span>
            <h2 className="text-xl font-bold text-gray-900">
              {completedSectionName}
            </h2>
          </div>

          <div className="rounded-2xl bg-[#034350]/[0.03] p-4 text-left space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-[#034350]" />
              <p className="text-xs font-semibold text-[#034350]">
                AI Trait Analysis Update
              </p>
            </div>
            <p className="text-xs leading-relaxed text-gray-600">
              AI model has processed responses for "{completedSectionName}" and updated behavioral alignment vectors.
            </p>
          </div>

          {nextSectionName ? (
            <div className="space-y-4 pt-2">
              <p className="text-xs text-gray-500">
                Up next: <span className="font-semibold text-gray-900">{nextSectionName}</span>
              </p>
              <Button onClick={onContinue} className="w-full justify-center">
                Continue to {nextSectionName}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={onContinue} className="w-full justify-center">
              Generate Final AI Report
              <ArrowRight className="size-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
