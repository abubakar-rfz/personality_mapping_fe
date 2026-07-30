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
        compact ? "justify-center" : "px-2",
      )}
    >
      <div
        aria-hidden="true"
        className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#111827] to-[#374151] dark:from-white dark:to-gray-300 shadow-sm ring-1 ring-black/10 dark:ring-zinc-800"
      >
        <span className="text-sm font-bold text-white dark:text-black">
          {SIDEBAR_BRAND.logoInitial}
        </span>
      </div>

      {!compact && (
        <div className="min-w-0">
          <p className="truncate text-sm font-bold tracking-tight text-gray-900 dark:text-zinc-50">
            {SIDEBAR_BRAND.title}
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
    <div className="px-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Switch workspace"
            className={cn(
              "flex w-full items-center gap-2 rounded-lg border border-transparent p-1.5 text-left transition-all duration-200 hover:bg-gray-100/80 dark:hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-[#034350]/25 focus-visible:outline-none",
              collapsed && "justify-center",
            )}
          >
            <Avatar className="size-6 rounded-md">
              <AvatarFallback className="rounded-md bg-[#034350]/10 text-[#034350] dark:bg-white/10 dark:text-white text-[10px] font-bold">
                {workspace.initials}
              </AvatarFallback>
            </Avatar>

            {!collapsed && (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-gray-700 dark:text-zinc-300">
                    {workspace.name}
                  </span>
                </span>
                <ChevronsUpDown
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-gray-400 dark:text-zinc-500"
                />
              </>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-56 rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212]">
          <DropdownMenuLabel className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Workspaces</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-100 dark:bg-white/10" />
          {SIDEBAR_WORKSPACE_OPTIONS.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.name}
              checked={activeWorkspace === option.name}
              onCheckedChange={() => setActiveWorkspace(option.name)}
              className="rounded-lg text-sm dark:text-zinc-300 dark:focus:bg-zinc-800 dark:focus:text-white"
            >
              <span className="flex min-w-0 flex-col py-0.5">
                <span className="truncate font-medium">{option.name}</span>
                <span className="truncate text-[10px] text-gray-500 dark:text-zinc-500">
                  {option.subtitle}
                </span>
              </span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
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
    <nav aria-label="Main navigation" className="space-y-0.5 px-3">
      <div className="mb-2 px-3 pt-2">
        <p className={cn("text-[10px] font-semibold tracking-wider text-gray-400 uppercase dark:text-zinc-600", collapsed && "sr-only")}>
          Overview
        </p>
      </div>
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
      <Separator className="mb-4 bg-gray-100 dark:bg-white/10" />

      <div
        className={cn(
          "flex items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-gray-100/80 dark:hover:bg-zinc-800",
          collapsed && "justify-center px-0",
        )}
      >
        <Avatar className="size-8">
          <AvatarFallback className="bg-gradient-to-br from-gray-800 to-black text-white dark:from-zinc-100 dark:to-zinc-300 dark:text-black text-xs font-bold">
            {SIDEBAR_USER.initials}
          </AvatarFallback>
        </Avatar>

        {!collapsed && (
          <>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-zinc-100">
                {SIDEBAR_USER.name}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-zinc-500">
                {SIDEBAR_USER.role}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon-sm"
              asChild
              className="shrink-0 text-gray-400 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-zinc-100"
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
        "flex h-full flex-col bg-[#F8FAFC] dark:bg-[#000000]",
        className,
      )}
      aria-label="Application sidebar"
    >
      <div className="space-y-4 px-3 pt-5 pb-2">
        <div className="flex items-center justify-between gap-2 px-1">
          <BrandMark compact={collapsed} />
          {showCollapseControl && onToggleCollapse && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onToggleCollapse}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="shrink-0 text-gray-400 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-zinc-100"
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

      <ScrollArea className="min-h-0 flex-1">
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
          className={cn("md:hidden dark:border-zinc-800 dark:text-white dark:bg-transparent", className)}
        >
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" showClose className="p-0 border-r-0 dark:bg-[#000000]">
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
            "fixed inset-y-0 left-0 z-40 hidden border-r border-gray-200/50 bg-[#F8FAFC] dark:border-zinc-800 dark:bg-[#000000] transition-[width] duration-300 ease-in-out md:flex will-change-width overflow-hidden",
            collapsed ? "w-[4.5rem]" : "w-64",
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
            "hidden shrink-0 transition-[width] duration-300 ease-in-out md:block will-change-width",
            collapsed ? "w-[4.5rem]" : "w-64",
          )}
        />
      </div>
    </TooltipProvider>
  );
}
