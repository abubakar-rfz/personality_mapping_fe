import type { LucideIcon } from "lucide-react";

export type QuestionType =
  | "single_choice_cards"
  | "likert"
  | "slider"
  | "scenario"
  | "icon_selection";

export interface ChoiceOption {
  id: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
}

export interface Question {
  id: string;
  sectionId: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: ChoiceOption[];
  sliderLabels?: {
    left: string;
    right: string;
  };
}

export interface AssessmentSection {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
  questionCount: number;
  estimatedMinutes: number;
  status: "not_started" | "in_progress" | "completed";
  completedQuestionsCount: number;
}

export interface AssessmentStat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
}

export interface AssessmentHistoryItem {
  id: string;
  employeeName: string;
  employeeInitials: string;
  employeeRole: string;
  department: string;
  status: "Completed" | "In Progress" | "Pending";
  compatibility: number;
  date: string;
  assessmentType: string;
}
