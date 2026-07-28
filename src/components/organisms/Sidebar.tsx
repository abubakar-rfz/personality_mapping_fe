"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsUpDown,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from "lucide-react";

import { SidebarItem } from "@/components/molecules/SidebarItem";
import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { Separator } from "@/components/atoms/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet";
import { TooltipProvider } from "@/components/atoms/tooltip";
import {
  SIDEBAR_BRAND,
  SIDEBAR_NAV_ITEMS,
  SIDEBAR_USER,
  SIDEBAR_WORKSPACE,
  SIDEBAR_WORKSPACE_OPTIONS,
} from "@/config/sidebar";
import { cn } from "@/lib/utils";

interface SidebarPanelProps {
  collapsed?: boolean;
  onNavigate?: () => void;
  onToggleCollapse?: () => void;
  showCollapseControl?: boolean;
  className?: string;
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        compact ? "justify-center" : "px-1",
      )}
    >
      <div
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5B8DEF] via-[#7C6CF6] to-[#A78BFA] shadow-[0_8px_24px_rgba(91,141,239,0.28)] ring-1 ring-white/60"
      >
        <span className="text-sm font-bold text-white">
          {SIDEBAR_BRAND.logoInitial}
        </span>
      </div>

      {!compact && (
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold tracking-[-0.02em] text-[#111827]">
            {SIDEBAR_BRAND.title}
          </p>
          <p className="truncate text-[10px] font-semibold tracking-[0.14em] text-[#6B7280] uppercase">
            {SIDEBAR_BRAND.subtitle}
          </p>
        </div>
      )}
    </div>
  );
}

function WorkspaceSwitcher({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const [activeWorkspace, setActiveWorkspace] = useState(SIDEBAR_WORKSPACE.name);

  const workspace =
    SIDEBAR_WORKSPACE_OPTIONS.find((option) => option.name === activeWorkspace) ??
    SIDEBAR_WORKSPACE;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Switch workspace"
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl border border-transparent bg-white p-3 text-left shadow-[0_1px_2px_rgba(17,24,39,0.04),0_8px_24px_rgba(17,24,39,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E5E7EB]/80 hover:bg-[#F4F6F8] focus-visible:ring-2 focus-visible:ring-[#034350]/25 focus-visible:outline-none",
            collapsed && "justify-center p-2.5",
          )}
        >
          <Avatar className="size-9">
            <AvatarFallback className="bg-[#034350] text-xs font-semibold">
              {workspace.initials}
            </AvatarFallback>
          </Avatar>

          {!collapsed && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-[#111827]">
                  {workspace.name}
                </span>
                <span className="block truncate text-xs text-[#6B7280]">
                  {workspace.subtitle}
                </span>
              </span>
              <ChevronsUpDown
                aria-hidden="true"
                className="size-4 shrink-0 text-[#9CA3AF]"
              />
            </>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SIDEBAR_WORKSPACE_OPTIONS.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.name}
            checked={activeWorkspace === option.name}
            onCheckedChange={() => setActiveWorkspace(option.name)}
          >
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-medium">{option.name}</span>
              <span className="truncate text-xs text-[#6B7280]">
                {option.subtitle}
              </span>
            </span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarNavigation({
  collapsed = false,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav aria-label="Main navigation" className="space-y-1 px-2">
      {SIDEBAR_NAV_ITEMS.map((item) => (
        <SidebarItem
          key={item.href}
          item={item}
          isActive={isActive(item.href)}
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}

function SidebarProfile({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  return (
    <div className="px-3 pb-4 pt-2">
      <Separator className="mb-4" />

      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors duration-200 hover:bg-[#F4F6F8]",
          collapsed && "justify-center px-0",
        )}
      >
        <Avatar className="size-10">
          <AvatarFallback className="bg-gradient-to-br from-[#5B8DEF] via-[#7C6CF6] to-[#A78BFA] text-xs font-semibold">
            {SIDEBAR_USER.initials}
          </AvatarFallback>
        </Avatar>

        {!collapsed && (
          <>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#111827]">
                {SIDEBAR_USER.name}
              </p>
              <p className="truncate text-xs text-[#6B7280]">
                {SIDEBAR_USER.role}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon-sm"
              asChild
              className="shrink-0 text-[#6B7280] hover:text-[#111827]"
            >
              <Link href="/settings" aria-label="Account settings">
                <Settings className="size-4" />
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function SidebarPanel({
  collapsed = false,
  onNavigate,
  onToggleCollapse,
  showCollapseControl = false,
  className,
}: SidebarPanelProps) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-[#FCFCFC]",
        className,
      )}
      aria-label="Application sidebar"
    >
      <div className="space-y-5 px-4 pt-5 pb-4">
        <div className="flex items-start justify-between gap-2">
          <BrandMark compact={collapsed} />
          {showCollapseControl && onToggleCollapse && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onToggleCollapse}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="shrink-0 text-[#6B7280] hover:text-[#111827]"
            >
              {collapsed ? (
                <PanelLeftOpen className="size-4" />
              ) : (
                <PanelLeftClose className="size-4" />
              )}
            </Button>
          )}
        </div>

        <WorkspaceSwitcher collapsed={collapsed} />
      </div>

      <ScrollArea className="min-h-0 flex-1 px-2">
        <SidebarNavigation collapsed={collapsed} onNavigate={onNavigate} />
      </ScrollArea>

      <SidebarProfile collapsed={collapsed} />
    </aside>
  );
}

export function SidebarMobileTrigger({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Open navigation menu"
          className={cn("md:hidden", className)}
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" showClose className="p-0">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SidebarPanel onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="hidden md:contents">
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 hidden border-r border-[#E5E7EB]/60 bg-[#FCFCFC] shadow-[4px_0_24px_rgba(17,24,39,0.04)] transition-[width] duration-300 ease-out md:flex",
            collapsed ? "w-[5.25rem]" : "w-72",
          )}
        >
          <SidebarPanel
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((value) => !value)}
            showCollapseControl
            className="w-full"
          />
        </div>

        <div
          aria-hidden="true"
          className={cn(
            "hidden shrink-0 transition-[width] duration-300 ease-out md:block",
            collapsed ? "w-[5.25rem]" : "w-72",
          )}
        />
      </div>
    </TooltipProvider>
  );
}
