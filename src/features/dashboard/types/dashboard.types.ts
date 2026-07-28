import type { LucideIcon } from "lucide-react";

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

export interface RecentAssessment {
  name: string;
  role: string;
  type: string;
  status: "Completed" | "In Progress" | "Pending";
  date: string;
}

export interface AiInsight {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
}
