import {
  Brain,
  ClipboardCheck,
  TrendingUp,
  Users,
} from "lucide-react";

import type { AiInsight, DashboardStat, RecentAssessment } from "@/features/dashboard/types/dashboard.types";

export const dashboardStats: DashboardStat[] = [
  {
    label: "Total Employees",
    value: "1,248",
    change: "+12 this month",
    icon: Users,
  },
  {
    label: "Assessments Completed",
    value: "892",
    change: "71% completion rate",
    icon: ClipboardCheck,
  },
  {
    label: "Personality Profiles",
    value: "756",
    change: "+48 this week",
    icon: Brain,
  },
  {
    label: "Team Fit Score",
    value: "87%",
    change: "+3.2% vs last quarter",
    icon: TrendingUp,
  },
];

export const recentAssessments: RecentAssessment[] = [
  {
    name: "Sarah Mitchell",
    role: "Product Designer",
    type: "DISC Assessment",
    status: "Completed",
    date: "2 hours ago",
  },
  {
    name: "James Rodriguez",
    role: "Engineering Lead",
    type: "Big Five Profile",
    status: "In Progress",
    date: "5 hours ago",
  },
  {
    name: "Emily Chen",
    role: "HR Manager",
    type: "Team Dynamics",
    status: "Completed",
    date: "Yesterday",
  },
  {
    name: "David Park",
    role: "Sales Director",
    type: "Leadership Style",
    status: "Pending",
    date: "Yesterday",
  },
];

export const aiInsights: AiInsight[] = [
  {
    title: "Engineering team collaboration gap detected",
    description:
      "3 members show complementary but underutilized communication styles.",
    priority: "High",
  },
  {
    title: "Optimal project pairing available",
    description:
      "AI identified 5 employee pairs with 92%+ personality compatibility.",
    priority: "Medium",
  },
  {
    title: "Assessment completion reminder",
    description:
      "42 employees have pending personality assessments due this week.",
    priority: "Low",
  },
];
