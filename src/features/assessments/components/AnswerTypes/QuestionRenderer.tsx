"use client";

import { DualSlider } from "@/features/assessments/components/AnswerTypes/DualSlider";
import { IconSelectionGrid } from "@/features/assessments/components/AnswerTypes/IconSelectionGrid";
import { LikertScale } from "@/features/assessments/components/AnswerTypes/LikertScale";
import { ScenarioCards } from "@/features/assessments/components/AnswerTypes/ScenarioCards";
import { SingleChoiceCards } from "@/features/assessments/components/AnswerTypes/SingleChoiceCards";
import type { Question } from "@/features/assessments/types/assessments.types";

interface QuestionRendererProps {
  question: Question;
  value: any;
  onChange: (val: any) => void;
}

export function QuestionRenderer({
  question,
  value,
  onChange,
}: QuestionRendererProps) {
  switch (question.type) {
    case "single_choice_cards":
      return (
        <SingleChoiceCards
          options={question.options ?? []}
          selectedValue={value}
          onSelect={onChange}
        />
      );

    case "likert":
      return <LikertScale selectedValue={value} onSelect={onChange} />;

    case "slider":
      return (
        <DualSlider
          leftLabel={question.sliderLabels?.left ?? "Option A"}
          rightLabel={question.sliderLabels?.right ?? "Option B"}
          value={value ?? 50}
          onChange={onChange}
        />
      );

    case "scenario":
      return (
        <ScenarioCards
          options={question.options ?? []}
          selectedValue={value}
          onSelect={onChange}
        />
      );

    case "icon_selection":
      return (
        <IconSelectionGrid
          options={question.options ?? []}
          selectedValue={value}
          onSelect={onChange}
        />
      );

    default:
      return null;
  }
}
