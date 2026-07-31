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
  {
    id: "dept_1", name: "Engineering", description: "Core product development and backend systems.", manager: "Tamoor Hayat", head: "Tamoor Hayat",
    employeeCount: 32, teamCount: 4, status: "active", color: "#034350", createdDate: "Jan 2022",
    assessmentCompletion: 91, avgCompatibility: 93, memberIds: ["emp_1", "emp_6", "emp_9"],
    teams: [
      { id: "t1", name: "Backend Core", lead: "Ahmed Khan", memberCount: 8 },
      { id: "t2", name: "Frontend Guild", lead: "Hassan Raza", memberCount: 6 },
    ],
    recentActivity: ["Ahmed Khan completed assessment", "Hassan Raza added to Frontend Guild", "Sprint 42 velocity report generated"],
  },
  {
    id: "dept_2", name: "Design", description: "Product design, UX research, and brand identity.", manager: "Yasir Hassan", head: "Yasir Hassan",
    employeeCount: 18, teamCount: 2, status: "active", color: "#7c3aed", createdDate: "Mar 2022",
    assessmentCompletion: 88, avgCompatibility: 90, memberIds: ["emp_2"],
    teams: [{ id: "t3", name: "UX Research", lead: "Yasir Hassan", memberCount: 5 }],
    recentActivity: ["Design system v2 shipped", "Yasir Hassan updated team roster"],
  },
  {
    id: "dept_3", name: "QA", description: "Quality assurance and automated testing pipelines.", manager: "Bilal Raza", head: "Bilal Raza",
    employeeCount: 14, teamCount: 2, status: "active", color: "#b45309", createdDate: "Nov 2021",
    assessmentCompletion: 79, avgCompatibility: 85, memberIds: ["emp_5"],
    teams: [{ id: "t4", name: "Automation", lead: "Bilal Raza", memberCount: 7 }],
    recentActivity: ["Test coverage reached 84%", "Bilal Raza completed assessment"],
  },
  {
    id: "dept_4", name: "DevOps", description: "Infrastructure, CI/CD, and platform reliability.", manager: "Hamza Khan", head: "Adnan Malik",
    employeeCount: 8, teamCount: 1, status: "active", color: "#0369a1", createdDate: "Feb 2022",
    assessmentCompletion: 100, avgCompatibility: 94, memberIds: ["emp_3"],
    teams: [{ id: "t5", name: "Platform SRE", lead: "Adnan Malik", memberCount: 8 }],
    recentActivity: ["Zero-downtime deploy achieved", "Adnan Malik onboarded"],
  },
  {
    id: "dept_5", name: "HR", description: "People operations, hiring, and culture programs.", manager: "Waleed Asghar", head: "Waleed Asghar",
    employeeCount: 12, teamCount: 2, status: "active", color: "#be185d", createdDate: "May 2021",
    assessmentCompletion: 95, avgCompatibility: 92, memberIds: ["emp_8"],
    teams: [{ id: "t6", name: "Talent Acquisition", lead: "Waleed Asghar", memberCount: 5 }],
    recentActivity: ["Q3 hiring plan approved", "Waleed Asghar ran culture survey"],
  },
  {
    id: "dept_6", name: "Management", description: "Executive leadership and strategic direction.", manager: "Tamoor Hayat", head: "Tamoor Hayat",
    employeeCount: 6, teamCount: 1, status: "active", color: "#065f46", createdDate: "Aug 2020",
    assessmentCompletion: 100, avgCompatibility: 96, memberIds: ["emp_6"],
    teams: [{ id: "t7", name: "Executive Committee", lead: "Tamoor Hayat", memberCount: 6 }],
    recentActivity: ["Q3 OKRs reviewed", "Board presentation delivered"],
  },
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
