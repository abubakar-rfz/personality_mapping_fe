"use client";

import { FileText, Plus } from "lucide-react";

import { Button } from "@/components/atoms/button";

interface AssessmentHeaderProps {
  onStartNew: () => void;
}

export function AssessmentHeader({ onStartNew }: AssessmentHeaderProps) {
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100">
          Employee Assessment
        </h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Evaluate employees through AI-powered personality and workplace behaviour analysis.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline">
          <FileText className="size-4" />
          Assessment Templates
        </Button>
        <Button onClick={onStartNew}>
          <Plus className="size-4" />
          New Assessment
        </Button>
      </div>
    </section>
  );
}
