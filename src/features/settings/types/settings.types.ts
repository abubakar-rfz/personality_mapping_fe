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

export interface DepartmentSetting {
  id: string;
  name: string;
  employeeCount: number;
  manager: string;
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
