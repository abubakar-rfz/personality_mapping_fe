import type { LucideIcon } from "lucide-react";

export type PersonalityType = "Analytical" | "Amiable" | "Driver" | "Expressive";

export type AssessmentStatus = "Completed" | "Pending" | "In Progress" | "Needs Review";

export type EmploymentStatus = "Active" | "Training" | "On Leave" | "Inactive";

export interface EmployeeSkillScores {
  leadership: number;
  communication: number;
  collaboration: number;
  adaptability: number;
  technicalReadiness: number;
}

export interface Employee {
  id: string;
  employeeId: string; // e.g. EMP-1024
  name: string;
  initials: string;
  email: string;
  avatarUrl?: string;
  department: string;
  role: string;
  manager: string;
  personalityType: PersonalityType;
  compatibilityScore: number;
  compatibilityLabel: string;
  assessmentStatus: AssessmentStatus;
  employmentStatus: EmploymentStatus;
  aiSnapshot: string;
  aiDetailedSummary: string;
  skills: EmployeeSkillScores;
  joinedDate: string;
}

export interface EmployeeStat {
  label: string;
  value: string;
  description: string;
  trend: string;
  icon: LucideIcon;
  trendUp?: boolean;
}
