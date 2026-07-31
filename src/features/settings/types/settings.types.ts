import type { LucideIcon } from "lucide-react";

export type SettingsSectionId =
  | "general"
  | "organisation"
  | "departments"
  | "assessment"
  | "personality"
  | "ai"
  | "roles"
  | "notifications"
  | "security"
  | "branding"
  | "reports";

export interface SettingsNavItem {
  id: SettingsSectionId;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface DepartmentTeam {
  id: string;
  name: string;
  lead: string;
  memberCount: number;
}

export interface DepartmentSetting {
  id: string;
  name: string;
  description?: string;
  head?: string;
  employeeCount: number;
  manager: string;
  teamCount?: number;
  status?: "active" | "archived";
  color?: string;
  icon?: string;
  createdDate?: string;
  assessmentCompletion?: number;
  avgCompatibility?: number;
  memberIds?: string[];
  teams?: DepartmentTeam[];
  recentActivity?: string[];
}

export interface AssessmentConfigItem {
  id: string;
  name: string;
  questionCount: number;
  estimatedMinutes: number;
  enabled: boolean;
}

export interface PermissionRow {
  permission: string;
  admin: boolean;
  hr: boolean;
  manager: boolean;
  employee: boolean;
}
