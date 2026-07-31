import { apiClient } from "@/lib/api-client";
import type { DepartmentSetting, AssessmentConfigItem, PermissionRow } from "@/features/settings/types/settings.types";

// ─── Default userId ───────────────────────────────────────────────────────────
const DEFAULT_USER_ID = "workspace-apex-enterprises";

// ─── Payload type — mirrors the backend model exactly ────────────────────────
export interface SettingsPayload {
  // General
  workspaceName?: string;
  language?: string;
  timezone?: string;
  theme?: "light" | "dark" | "system";

  // Organisation
  corporateName?: string;
  industry?: string;
  corporateSize?: string;
  websiteUrl?: string;
  workingDays?: string;
  operatingHours?: string;

  // Departments — full rich type
  departments?: DepartmentSetting[];

  // Assessment Config
  maxTimePerModule?: number;
  reassessmentIntervalDays?: number;
  assessmentModules?: AssessmentConfigItem[];

  // Personality Model
  personalityModel?: string;

  // AI Config
  aiRecommendations?: boolean;
  projectClientMatching?: boolean;
  burnoutRiskDetection?: boolean;
  confidenceThreshold?: number;
  recommendationSensitivity?: number;

  // Roles & Permissions
  permissions?: PermissionRow[];

  // Notifications
  emailNotifications?: boolean;
  browserAlerts?: boolean;

  // Security
  twoFactorEnabled?: boolean;

  // Branding
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;

  // Reports
  reportFormat?: string;
  scheduleFrequency?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ─── API Functions ────────────────────────────────────────────────────────────

export async function fetchSettings(
  userId: string = DEFAULT_USER_ID,
): Promise<SettingsPayload> {
  const res = await apiClient.get<ApiResponse<SettingsPayload>>(`/settings/${userId}`);
  return res.data;
}

export async function updateSettings(
  payload: Partial<SettingsPayload>,
  userId: string = DEFAULT_USER_ID,
): Promise<SettingsPayload> {
  const res = await apiClient.put<ApiResponse<SettingsPayload>>(`/settings/${userId}`, payload);
  return res.data;
}
