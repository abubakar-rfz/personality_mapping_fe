import {
  BarChart3,
  BookOpen,
  Brain,
  Building2,
  ClipboardList,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface SidebarBrand {
  title: string;
  subtitle: string;
  logoInitial: string;
}

export interface SidebarWorkspace {
  name: string;
  subtitle: string;
  initials: string;
}

export interface SidebarUser {
  name: string;
  role: string;
  initials: string;
}

export interface SidebarWorkspaceOption {
  name: string;
  subtitle: string;
  initials: string;
}

export const SIDEBAR_BRAND: SidebarBrand = {
  title: "Personality Mapping",
  subtitle: "AI Workforce Intelligence",
  logoInitial: "P",
};

export const SIDEBAR_WORKSPACE: SidebarWorkspace = {
  name: "TamWork Execute",
  subtitle: "Software House",
  initials: "TE",
};

export const SIDEBAR_WORKSPACE_OPTIONS: SidebarWorkspaceOption[] = [
  SIDEBAR_WORKSPACE,
  {
    name: "TamWork Labs",
    subtitle: "Research Division",
    initials: "TL",
  },
  {
    name: "TamWork Global",
    subtitle: "Enterprise",
    initials: "TG",
  },
];

export const SIDEBAR_USER: SidebarUser = {
  name: "Muhammad Abu Bakar",
  role: "Administrator",
  initials: "MA",
};

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Assessments", href: "/assessments", icon: ClipboardList },
  { label: "Employees", href: "/employees", icon: Users },
  { label: "Personality Reports", href: "/personality-reports", icon: Brain },
  { label: "Team Analytics", href: "/team-analytics", icon: BarChart3 },
  { label: "AI Recommendations", href: "/ai-recommendations", icon: Sparkles },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Clients", href: "/clients", icon: Building2 },
  { label: "Question Bank", href: "/question-bank", icon: BookOpen },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const SIDEBAR_PRIMARY = "#034350";
export const SIDEBAR_SURFACE = "#FCFCFC";
export const SIDEBAR_HOVER = "#F4F6F8";
export const SIDEBAR_TEXT = "#111827";
export const SIDEBAR_MUTED = "#6B7280";
