import type { LucideIcon } from "lucide-react";

// Section 1: Organization Health
export interface HealthMetric {
  label: string;
  value: number;
}

export interface OrganizationHealthData {
  score: number;
  status: string;
  metrics: HealthMetric[];
  aiSummary: string;
}

// Section 2: Analytics
export interface PersonalityCategory {
  name: string;
  value: number;
  color: string;
}

export interface WorkStyleItem {
  name: string;
  value: number;
}

export interface CompatibilityTrendPoint {
  label: string;
  value: number;
}

export type TrendPeriod = "weekly" | "monthly" | "quarterly";

// Section 3: AI Insight of the Day
export interface RecommendedAction {
  label: string;
}

export interface AiInsightOfDay {
  title: string;
  subtitle: string;
  detail: string;
  actions: RecommendedAction[];
}

// Section 4: Workforce Health
export interface RadialMetricData {
  label: string;
  value: number;
  status: string;
  statusColor: string;
  description: string;
}

// Section 5: Team Compatibility
export interface TeamCompatibilityData {
  name: string;
  compatibility: number;
  health: string;
  employees: number;
  trend: number;
  color: string;
}

// Section 6: Skill Heatmap
export interface SkillHeatmapRow {
  employee: string;
  initials: string;
  scores: Record<string, number>;
}

// Section 7: Personality Matches
export interface PersonalityMatch {
  name: string;
  initials: string;
  matchPercentage: number;
  bestMatchTeam: string;
  recommendedClient: string;
}

// Section 8: Employees Needing Attention
export interface EmployeeAttention {
  name: string;
  initials: string;
  issue: string;
  severity: "high" | "medium" | "low";
}

// Section 9: AI Recommendations
export interface AiRecommendation {
  title: string;
  confidence: number;
  icon: LucideIcon;
}

// Section 10: Recent Assessment Events
export interface AssessmentEvent {
  title: string;
  timestamp: string;
  icon: LucideIcon;
}
