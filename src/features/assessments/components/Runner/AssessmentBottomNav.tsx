"use client";

import { ArrowLeft, ArrowRight, Save, Sparkles } from "lucide-react";

import { Button } from "@/components/atoms/button";

interface AssessmentBottomNavProps {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onFinish: () => void;
}

export function AssessmentBottomNav({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  onSaveDraft,
  onFinish,
}: AssessmentBottomNavProps) {
  return (
    <div className="sticky bottom-0 z-30 border-t border-gray-100 dark:border-zinc-800 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Button
          variant="ghost"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="text-xs"
        >
          <ArrowLeft className="size-3.5" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onSaveDraft} className="text-xs">
            <Save className="size-3.5" />
            Save Draft
          </Button>

          {hasNext ? (
            <Button onClick={onNext} className="text-xs">
              Next Question
              <ArrowRight className="size-3.5" />
            </Button>
          ) : (
            <Button onClick={onFinish} className="text-xs">
              <Sparkles className="size-3.5" />
              Finish Assessment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
