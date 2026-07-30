import {
  Bell,
  Building2,
  Cpu,
  FileText,
  Fingerprint,
  Grid,
  Layers,
  Palette,
  ShieldAlert,
  Sliders,
  Sparkles,
} from "lucide-react";

import type {
  AssessmentConfigItem,
  DepartmentSetting,
  PermissionRow,
  SettingsNavItem,
} from "@/features/settings/types/settings.types";

// ─── Settings Sidebar Navigation Items ───────────────────────────────────────

export const settingsNavItems: SettingsNavItem[] = [
  {
    id: "general",
    label: "General",
    description: "Workspace details, default language & system preferences.",
    icon: Grid,
  },
  {
    id: "organisation",
    label: "Organisation",
    description: "Corporate parameters, industry size & operating hours.",
    icon: Building2,
  },
  {
    id: "departments",
    label: "Departments & Teams",
    description: "Structure employee directories & operational units.",
    icon: Layers,
  },
  {
    id: "assessment",
    label: "Assessment Config",
    description: "Custom duration thresholds & active modules.",
    icon: Sliders,
  },
  {
    id: "personality",
    label: "Personality Model",
    description: "Manage cognitive & behavioral framework algorithms.",
    icon: Sparkles,
  },
  {
    id: "ai",
    label: "AI Configuration",
    description: "Fine-tune matching matrices & burnout sensitivity.",
    icon: Cpu,
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    description: "Define granular access control matrices across profiles.",
    icon: ShieldAlert,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alert parameters for reports & system evaluations.",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    description: "Multi-factor verification, policy guidelines & audits.",
    icon: Fingerprint,
  },
  {
    id: "branding",
    label: "Branding",
    description: "Upload corporate logo assets & tailor application preview.",
    icon: Palette,
  },
  {
    id: "reports",
    label: "Reports",
    description: "Export parameters & scheduled summary templates.",
    icon: FileText,
  },
];

// ─── Department Profiles ─────────────────────────────────────────────────────

export const initialDepartments: DepartmentSetting[] = [
  { id: "dept_1", name: "Engineering", employeeCount: 32, manager: "Ayesha Tariq" },
  { id: "dept_2", name: "Design", employeeCount: 18, manager: "Sarah Mitchell" },
  { id: "dept_3", name: "QA", employeeCount: 14, manager: "Bilal Raza" },
  { id: "dept_4", name: "DevOps", employeeCount: 8, manager: "Omar Ali" },
  { id: "dept_5", name: "HR", employeeCount: 12, manager: "Zainab Malik" },
  { id: "dept_6", name: "Management", employeeCount: 6, manager: "Muhammad Abu Bakar" },
];

// ─── 10 Assessment Configuration Modules ──────────────────────────────────────

export const initialAssessments: AssessmentConfigItem[] = [
  { id: "ac_1", name: "Personal Work Style", questionCount: 6, estimatedMinutes: 3, enabled: true },
  { id: "ac_2", name: "Communication & Collaboration", questionCount: 6, estimatedMinutes: 3, enabled: true },
  { id: "ac_3", name: "Problem Solving & Decisions", questionCount: 6, estimatedMinutes: 4, enabled: true },
  { id: "ac_4", name: "Technical Work Behaviour", questionCount: 6, estimatedMinutes: 3, enabled: true },
  { id: "ac_5", name: "Leadership & Ownership", questionCount: 6, estimatedMinutes: 4, enabled: true },
  { id: "ac_6", name: "Adaptability & Learning", questionCount: 6, estimatedMinutes: 3, enabled: true },
  { id: "ac_7", name: "Stress & Burnout Indicators", questionCount: 6, estimatedMinutes: 3, enabled: true },
  { id: "ac_8", name: "Client & Project Compatibility", questionCount: 6, estimatedMinutes: 4, enabled: true },
  { id: "ac_9", name: "Innovation & Creativity", questionCount: 6, estimatedMinutes: 3, enabled: true },
  { id: "ac_10", name: "Values & Workplace Culture", questionCount: 6, estimatedMinutes: 3, enabled: true },
];

// ─── Roles & Permissions Matrix Rows ──────────────────────────────────────────

export const initialPermissions: PermissionRow[] = [
  { permission: "View Organization Health Score", admin: true, hr: true, manager: true, employee: true },
  { permission: "Configure AI Recommendation Thresholds", admin: true, hr: false, manager: false, employee: false },
  { permission: "Access Employee Burnout Warnings", admin: true, hr: true, manager: true, employee: false },
  { permission: "Download Global Custom PDF Reports", admin: true, hr: true, manager: true, employee: false },
  { permission: "Edit Company Branding & Logo Assets", admin: true, hr: false, manager: false, employee: false },
  { permission: "Invite New Corporate Workspace Profiles", admin: true, hr: true, manager: false, employee: false },
  { permission: "Take Self-Assessment Modules", admin: true, hr: true, manager: true, employee: true },
  { permission: "Assign Employees to Client Projects", admin: true, hr: true, manager: true, employee: false },
];
