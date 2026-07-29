"use client";

import { useState } from "react";
import { BookOpen, History } from "lucide-react";

import { ActiveAssessmentRunner } from "@/features/assessments/components/Runner/ActiveAssessmentRunner";
import { AssessmentHeader } from "@/features/assessments/components/Overview/AssessmentHeader";
import { AssessmentHistory } from "@/features/assessments/components/Overview/AssessmentHistory";
import { AssessmentLibrary } from "@/features/assessments/components/Overview/AssessmentLibrary";
import { AssessmentStats } from "@/features/assessments/components/Overview/AssessmentStats";
import { FinalCompletionScreen } from "@/features/assessments/components/Screens/FinalCompletionScreen";

type PageViewMode = "overview" | "active_runner" | "final_completed";
type OverviewTab = "library" | "history";

export function AssessmentsPage() {
  const [viewMode, setViewMode] = useState<PageViewMode>("overview");
  const [selectedSectionId, setSelectedSectionId] = useState(1);
  const [activeTab, setActiveTab] = useState<OverviewTab>("library");

  const handleStartSection = (sectionId: number) => {
    setSelectedSectionId(sectionId);
    setViewMode("active_runner");
  };

  const handleStartNew = () => {
    setSelectedSectionId(1);
    setViewMode("active_runner");
  };

  const handleFinishAll = () => {
    setViewMode("final_completed");
  };

  const handleReturnOverview = () => {
    setViewMode("overview");
  };

  if (viewMode === "active_runner") {
    return (
      <ActiveAssessmentRunner
        initialSectionId={selectedSectionId}
        onExit={handleReturnOverview}
        onFinishAll={handleFinishAll}
      />
    );
  }

  if (viewMode === "final_completed") {
    return <FinalCompletionScreen onReturnHome={handleReturnOverview} />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Top Header */}
      <AssessmentHeader onStartNew={handleStartNew} />

      {/* 4 Stats Cards */}
      <AssessmentStats />

      {/* View Mode Segmented Controls */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4">
          <div className="inline-flex rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab("library")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "library"
                  ? "bg-white text-[#034350] shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <BookOpen className="size-3.5" />
              Assessment Modules (10)
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "history"
                  ? "bg-white text-[#034350] shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <History className="size-3.5" />
              Assessment History
            </button>
          </div>

          <p className="text-xs text-gray-500">
            {activeTab === "library"
              ? "Select any module to start or continue evaluation"
              : "Track and review completed employee assessments"}
          </p>
        </div>

        {/* Tab Content */}
        {activeTab === "library" ? (
          <AssessmentLibrary onStartSection={handleStartSection} />
        ) : (
          <AssessmentHistory />
        )}
      </div>
    </div>
  );
}
