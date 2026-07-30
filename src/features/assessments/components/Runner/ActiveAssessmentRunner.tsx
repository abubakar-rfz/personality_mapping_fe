"use client";

import { useMemo, useState } from "react";
import { Clock, Sparkles, X } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Progress } from "@/components/atoms/progress";
import { QuestionRenderer } from "@/features/assessments/components/AnswerTypes/QuestionRenderer";
import { AssessmentBottomNav } from "@/features/assessments/components/Runner/AssessmentBottomNav";
import { AssessmentSidebar } from "@/features/assessments/components/Runner/AssessmentSidebar";
import { SectionTransition } from "@/features/assessments/components/Screens/SectionTransition";
import {
  assessmentQuestions,
  assessmentSections,
} from "@/features/assessments/data/assessments.data";

interface ActiveAssessmentRunnerProps {
  initialSectionId?: number;
  onExit: () => void;
  onFinishAll: () => void;
}

export function ActiveAssessmentRunner({
  initialSectionId = 1,
  onExit,
  onFinishAll,
}: ActiveAssessmentRunnerProps) {
  const [currentSectionId, setCurrentSectionId] = useState(initialSectionId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filter questions for the active section
  const sectionQuestions = useMemo(() => {
    return assessmentQuestions.filter((q) => q.sectionId === currentSectionId);
  }, [currentSectionId]);

  const currentSection = useMemo(() => {
    return assessmentSections.find((s) => s.id === currentSectionId);
  }, [currentSectionId]);

  const currentQuestion = sectionQuestions[currentQuestionIndex];
  const totalQuestions = assessmentQuestions.length;
  const answeredCount = Object.keys(answers).length;

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleAnswerChange = (value: any) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsTransitioning(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionId > 1) {
      const prevSecId = currentSectionId - 1;
      setCurrentSectionId(prevSecId);
      const prevSecQuestionsCount = assessmentQuestions.filter(
        (q) => q.sectionId === prevSecId,
      ).length;
      setCurrentQuestionIndex(prevSecQuestionsCount - 1);
    }
  };

  const handleContinueNextSection = () => {
    if (currentSectionId < 10) {
      setCurrentSectionId((prev) => prev + 1);
      setCurrentQuestionIndex(0);
      setIsTransitioning(false);
    } else {
      onFinishAll();
    }
  };

  if (isTransitioning) {
    const nextSec = assessmentSections.find((s) => s.id === currentSectionId + 1);
    return (
      <SectionTransition
        completedSectionName={currentSection?.name ?? "Section"}
        nextSectionName={nextSec?.name}
        onContinue={handleContinueNextSection}
      />
    );
  }

  if (!currentQuestion) return null;

  const sectionProgressPercent = Math.round(
    ((currentQuestionIndex + 1) / sectionQuestions.length) * 100,
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-[#0a0a0a]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 border-b border-gray-100 dark:border-zinc-800 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" onClick={onExit}>
              <X className="size-4 text-gray-500 dark:text-zinc-400" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#034350] dark:text-[#4da8b5]">
                  Module 0{currentSectionId}: {currentSection?.name}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 dark:text-zinc-500">
                Question {currentQuestionIndex + 1} of {sectionQuestions.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-gray-100 dark:bg-zinc-900 px-3 py-1 text-xs text-gray-600 dark:text-zinc-400">
              <Clock className="size-3.5 text-gray-400 dark:text-zinc-500" />
              <span>~3 mins remaining</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onExit} className="text-xs">
              Exit
            </Button>
          </div>
        </div>

        {/* Top Progress Bar */}
        <Progress value={sectionProgressPercent} className="h-1 rounded-none bg-gray-100 dark:bg-zinc-900" />
      </header>

      {/* Main Grid Content */}
      <div className="flex-1 py-6 sm:py-10 px-4 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_320px]">
          {/* Left: Main Question Experience */}
          <main className="space-y-6">
            <Card className="border-gray-100 dark:border-zinc-800 shadow-xl transition-all">
              <CardContent className="space-y-8 p-6 sm:p-10 md:p-12">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#034350]/5 dark:bg-[#4da8b5]/10 px-3 py-1 text-xs font-semibold text-[#034350] dark:text-[#4da8b5]">
                      <Sparkles className="size-3.5" />
                      Section 0{currentSectionId} of 10
                    </span>
                  </div>

                  <h1 className="text-xl font-bold leading-relaxed tracking-tight text-gray-900 dark:text-zinc-100 sm:text-2xl lg:text-3xl">
                    {currentQuestion.title}
                  </h1>

                  {currentQuestion.subtitle && (
                    <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                      {currentQuestion.subtitle}
                    </p>
                  )}
                </div>

                {/* Question Answer Renderer */}
                <div className="pt-2">
                  <QuestionRenderer
                    question={currentQuestion}
                    value={currentAnswer}
                    onChange={handleAnswerChange}
                  />
                </div>
              </CardContent>
            </Card>
          </main>

          {/* Right Sticky Sidebar */}
          <aside className="order-last">
            <AssessmentSidebar
              currentSectionId={currentSectionId}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              answeredCount={answeredCount}
            />
          </aside>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <AssessmentBottomNav
        hasPrevious={currentQuestionIndex > 0 || currentSectionId > 1}
        hasNext={currentQuestionIndex < sectionQuestions.length - 1}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSaveDraft={onExit}
        onFinish={handleNext}
      />
    </div>
  );
}
