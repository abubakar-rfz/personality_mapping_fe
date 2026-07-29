import {
  BarChart3,
  CheckCircle2,
  RefreshCw,
  Shield,
  TrendingUp,
  ArrowRightLeft,
  UserPlus,
} from "lucide-react";

import type {
  AiInsightOfDay,
  AiRecommendation,
  AssessmentEvent,
  CompatibilityTrendPoint,
  EmployeeAttention,
  OrganizationHealthData,
  PersonalityCategory,
  PersonalityMatch,
  RadialMetricData,
  SkillHeatmapRow,
  TeamCompatibilityData,
  TrendPeriod,
  WorkStyleItem,
} from "@/features/dashboard/types/dashboard.types";

// ─── Section 1: Organization Health ──────────────────────────────────────────

export const organizationHealth: OrganizationHealthData = {
  score: 91,
  status: "Healthy Organization",
  metrics: [
    { label: "Communication", value: 88 },
    { label: "Leadership", value: 92 },
    { label: "Collaboration", value: 85 },
    { label: "Adaptability", value: 90 },
    { label: "Technical Readiness", value: 87 },
  ],
  aiSummary: "Overall workforce health increased by 4% this month.",
};

// ─── Section 2: Analytics ────────────────────────────────────────────────────

export const personalityDistribution: PersonalityCategory[] = [
  { name: "Analytical", value: 35, color: "#034350" },
  { name: "Driver", value: 28, color: "#0a6b7c" },
  { name: "Expressive", value: 22, color: "#4da8b5" },
  { name: "Amiable", value: 15, color: "#9ecfd7" },
];

export const workStyles: WorkStyleItem[] = [
  { name: "Deep Focus", value: 32 },
  { name: "Collaborative", value: 28 },
  { name: "Hybrid", value: 22 },
  { name: "Async", value: 12 },
  { name: "In-office", value: 6 },
];

export const compatibilityTrends: Record<TrendPeriod, CompatibilityTrendPoint[]> = {
  weekly: [
    { label: "Mon", value: 82 },
    { label: "Tue", value: 85 },
    { label: "Wed", value: 83 },
    { label: "Thu", value: 88 },
    { label: "Fri", value: 91 },
    { label: "Sat", value: 89 },
  ],
  monthly: [
    { label: "Week 1", value: 78 },
    { label: "Week 2", value: 82 },
    { label: "Week 3", value: 85 },
    { label: "Week 4", value: 91 },
  ],
  quarterly: [
    { label: "Jan", value: 72 },
    { label: "Feb", value: 76 },
    { label: "Mar", value: 81 },
    { label: "Apr", value: 85 },
    { label: "May", value: 88 },
    { label: "Jun", value: 91 },
  ],
};

// ─── Section 3: AI Insight of the Day ────────────────────────────────────────

export const aiInsightOfDay: AiInsightOfDay = {
  title: "AI Insight",
  subtitle: "Payments Team is showing early burnout indicators.",
  detail: "3 employees have elevated stress levels this week.",
  actions: [
    { label: "Redistribute workload" },
    { label: "Schedule one-to-one meeting" },
    { label: "Move Ahmed to Project Atlas" },
  ],
};

// ─── Section 4: Workforce Health ─────────────────────────────────────────────

export const burnoutRisk: RadialMetricData = {
  label: "Burnout Risk",
  value: 34,
  status: "Medium Risk",
  statusColor: "#d97706",
  description:
    "12 employees showing moderate stress signals across 3 teams.",
};

export const engagementScore: RadialMetricData = {
  label: "Engagement Score",
  value: 89,
  status: "Excellent",
  statusColor: "#059669",
  description:
    "Team engagement has improved by 6% compared to last quarter.",
};

// ─── Section 5: Team Compatibility ───────────────────────────────────────────

export const teamCompatibility: TeamCompatibilityData[] = [
  { name: "Engineering", compatibility: 94, health: "Excellent", employees: 32, trend: 2.1, color: "#034350" },
  { name: "Design", compatibility: 91, health: "Strong", employees: 18, trend: 1.8, color: "#0a6b7c" },
  { name: "QA", compatibility: 87, health: "Good", employees: 14, trend: 0.5, color: "#4da8b5" },
  { name: "HR", compatibility: 85, health: "Good", employees: 12, trend: -0.3, color: "#6b7280" },
  { name: "Management", compatibility: 92, health: "Excellent", employees: 8, trend: 3.2, color: "#034350" },
];

// ─── Section 6: Skill Heatmap ────────────────────────────────────────────────

export const SKILL_COLUMNS = [
  "Leadership",
  "Communication",
  "Problem Solving",
  "Ownership",
  "Technical",
  "Learning",
  "Adaptability",
] as const;

export const skillHeatmapData: SkillHeatmapRow[] = [
  {
    employee: "Ahmed Hassan",
    initials: "AH",
    scores: { Leadership: 85, Communication: 72, "Problem Solving": 91, Ownership: 88, Technical: 95, Learning: 78, Adaptability: 82 },
  },
  {
    employee: "Ahmed Sajid",
    initials: "Ss",
    scores: { Leadership: 92, Communication: 95, "Problem Solving": 78, Ownership: 85, Technical: 70, Learning: 90, Adaptability: 93 },
  },
  {
    employee: "Adnan Malik",
    initials: "AM",
    scores: { Leadership: 68, Communication: 82, "Problem Solving": 88, Ownership: 75, Technical: 92, Learning: 85, Adaptability: 71 },
  },
  {
    employee: "Hamza Khan",
    initials: "HK",
    scores: { Leadership: 78, Communication: 88, "Problem Solving": 82, Ownership: 91, Technical: 65, Learning: 92, Adaptability: 95 },
  },
  {
    employee: "Yasir Hassan",
    initials: "YH",
    scores: { Leadership: 55, Communication: 68, "Problem Solving": 75, Ownership: 62, Technical: 88, Learning: 72, Adaptability: 60 },
  },
  {
    employee: "Abu Bakar Amin",
    initials: "AM",
    scores: { Leadership: 90, Communication: 92, "Problem Solving": 85, Ownership: 88, Technical: 72, Learning: 95, Adaptability: 88 },
  },
];

// ─── Section 7: Personality Matches ──────────────────────────────────────────

export const personalityMatches: PersonalityMatch[] = [
  { name: "Ahmed", initials: "AH", matchPercentage: 95, bestMatchTeam: "Backend Team", recommendedClient: "Microsoft" },
  { name: "Yasir", initials: "YH", matchPercentage: 92, bestMatchTeam: "UX Team", recommendedClient: "Healthcare Project" },
  { name: "Hamza", initials: "HK", matchPercentage: 89, bestMatchTeam: "DevOps Team", recommendedClient: "FinTech Startup" },
  { name: "Adnan", initials: "AM", matchPercentage: 94, bestMatchTeam: "Data Science", recommendedClient: "Government Portal" },
];

// ─── Section 8: Employees Needing Attention ──────────────────────────────────

export const employeesNeedingAttention: EmployeeAttention[] = [
  { name: "Ahmed", initials: "AH", issue: "High Burnout Risk", severity: "high" },
  { name: "Yasir", initials: "YH", issue: "Assessment Pending", severity: "medium" },
  { name: "Adnan", initials: "AM", issue: "Low Collaboration Score", severity: "low" },
];

// ─── Section 9: AI Recommendations ──────────────────────────────────────────

export const aiRecommendations: AiRecommendation[] = [
  { title: "Promote Yasir to Team Lead", confidence: 96, icon: TrendingUp },
  { title: "Assign Ahmed to Project Phoenix", confidence: 94, icon: ArrowRightLeft },
  { title: "Move Adnan to Client ABC", confidence: 91, icon: UserPlus },
];

// ─── Section 10: Recent Assessments ──────────────────────────────────────────

export const assessmentEvents: AssessmentEvent[] = [
  { title: "Assessment Completed", timestamp: "2 hours ago", icon: CheckCircle2 },
  { title: "Leadership Updated", timestamp: "5 hours ago", icon: Shield },
  { title: "Compatibility Recalculated", timestamp: "Yesterday", icon: RefreshCw },
  { title: "Burnout Analysis Completed", timestamp: "2 days ago", icon: BarChart3 },
];
