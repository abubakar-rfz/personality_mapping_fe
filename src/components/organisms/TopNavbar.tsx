"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronRight,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
} from "lucide-react";

import { SearchCommand } from "@/components/molecules/SearchCommand";
import { SidebarMobileTrigger } from "@/components/organisms/Sidebar";
import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Input } from "@/components/atoms/input";
import {
  SIDEBAR_BRAND,
  SIDEBAR_NAV_ITEMS,
  SIDEBAR_USER,
  SIDEBAR_WORKSPACE,
} from "@/config/sidebar";
import { cn } from "@/lib/utils";

const SEARCH_INPUT_ID = "global-search";
const APP_SCROLL_ID = "app-scroll";

function BrandMarkCompact() {
  return (
    <div className="flex items-center gap-2.5 md:hidden">
      <div
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5B8DEF] via-[#7C6CF6] to-[#A78BFA] shadow-[0_4px_16px_rgba(91,141,239,0.25)]"
      >
        <span className="text-xs font-bold text-white">
          {SIDEBAR_BRAND.logoInitial}
        </span>
      </div>
      <span className="truncate text-sm font-semibold tracking-[-0.02em] text-[#111827]">
        {SIDEBAR_BRAND.title}
      </span>
    </div>
  );
}

function NavbarBreadcrumbs() {
  const pathname = usePathname();

  const currentPage = useMemo(() => {
    const match = SIDEBAR_NAV_ITEMS.find((item) => {
      if (item.href === "/") {
        return pathname === "/";
      }

      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    });

    if (match) {
      return match.label;
    }

    const segment = pathname.split("/").filter(Boolean).at(-1);
    if (!segment) {
      return "Dashboard";
    }

    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [pathname]);

  return (
    <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-2 md:flex">
      <span className="truncate text-sm text-[#6B7280]">
        {SIDEBAR_WORKSPACE.name}
      </span>
      <ChevronRight
        aria-hidden="true"
        className="size-3.5 shrink-0 text-[#D1D5DB]"
      />
      <span className="truncate text-sm font-semibold text-[#111827]">
        {currentPage}
      </span>
    </nav>
  );
}

function NavbarSearch() {
  return (
    <div className="relative hidden min-w-0 flex-1 md:block md:max-w-[18rem] lg:max-w-xl">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#9CA3AF]"
      />
      <Input
        id={SEARCH_INPUT_ID}
        type="search"
        placeholder="Search employees, projects..."
        aria-label="Search employees, projects"
        className="h-11 w-full rounded-full border-[#E5E7EB] bg-[#F9FAFB] pr-24 pl-11 text-sm shadow-[0_1px_2px_rgba(17,24,39,0.04)] focus-visible:border-[#034350]/30 focus-visible:ring-[#034350]/20 lg:pr-28"
      />
      <kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-2 py-0.5 text-[10px] font-medium text-[#9CA3AF] lg:inline-flex">
        Ctrl K
      </kbd>
    </div>
  );
}

function NavbarMobileSearch() {
  return (
    <div className="mt-3 flex items-center gap-2 md:hidden">
      <div className="relative min-w-0 flex-1">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#9CA3AF]"
        />
        <Input
          id={SEARCH_INPUT_ID}
          type="search"
          placeholder="Search employees, projects..."
          aria-label="Search employees, projects"
          className="h-11 w-full rounded-full border-[#E5E7EB] bg-[#F9FAFB] pl-11 pr-3 text-sm shadow-[0_1px_2px_rgba(17,24,39,0.04)] focus-visible:border-[#034350]/30 focus-visible:ring-[#034350]/20"
        />
      </div>

      <Button
        type="button"
        className="h-11 rounded-full bg-[#034350] px-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(3,67,80,0.24)] transition-all duration-200 hover:scale-[1.01] hover:bg-[#034350]/90"
      >
        <Sparkles className="size-4" />
        <span className="hidden sm:inline">Ask AI</span>
        <span className="sm:hidden">AI</span>
      </Button>
    </div>
  );
}

function NavbarActions() {
  return (
    <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Notifications"
        className="relative inline-flex size-10 rounded-full text-[#6B7280] hover:bg-[#F4F6F8] hover:text-[#111827] md:hidden"
      >
        <Bell className="size-5" />
        <Badge className="absolute -top-0.5 -right-0.5 size-4 border-2 border-white p-0 text-[9px]">
          3
        </Badge>
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Notifications"
        className="relative hidden text-[#6B7280] hover:scale-105 hover:text-[#111827] md:inline-flex md:h-8 md:w-8 lg:h-9 lg:w-9"
      >
        <Bell className="size-5" />
        <Badge className="absolute -top-0.5 -right-0.5 size-4 border-2 border-white p-0 text-[9px]">
          3
        </Badge>
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Messages"
        className="hidden text-[#6B7280] hover:scale-105 hover:text-[#111827] md:inline-flex md:h-8 md:w-8 lg:h-9 lg:w-9"
      >
        <MessageSquare className="size-5" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        className="hidden text-[#6B7280] hover:scale-105 hover:text-[#111827] lg:inline-flex lg:h-9 lg:w-9"
      >
        <Sun className="size-5" />
      </Button>

      <Button
        type="button"
        className="hidden h-8 rounded-full bg-[#034350] px-3 text-white shadow-[0_4px_16px_rgba(3,67,80,0.24)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#034350]/90 md:inline-flex lg:h-10 lg:px-4"
      >
        <Sparkles className="size-4" />
        Ask AI
      </Button>
    </div>
  );
}

function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open profile menu"
          className="rounded-full transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#034350]/25 focus-visible:outline-none"
        >
          <Avatar className="size-9 ring-2 ring-white">
            <AvatarFallback className="bg-gradient-to-br from-[#5B8DEF] via-[#7C6CF6] to-[#A78BFA] text-xs font-semibold">
              {SIDEBAR_USER.initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-[#111827]">
              {SIDEBAR_USER.name}
            </span>
            <span className="text-xs text-[#6B7280]">{SIDEBAR_USER.role}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="size-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="size-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="size-4" />
          Notifications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 focus:text-red-600">
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TopNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = document.getElementById(APP_SCROLL_ID);

    const handleScroll = () => {
      const offset = container?.scrollTop ?? window.scrollY;
      setScrolled(offset > 8);
    };

    handleScroll();
    container?.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <SearchCommand inputId={SEARCH_INPUT_ID} />

      <header className="sticky top-0 z-30 shrink-0 bg-[#F8FAFC] px-4 pt-4 pb-2 md:px-5 lg:px-6">
        <div
          className={cn(
            "rounded-2xl border border-[#F1F5F9] bg-white px-3 py-3 transition-shadow duration-300 md:px-5 md:py-3",
            scrolled
              ? "shadow-[0_4px_20px_rgba(17,24,39,0.08)]"
              : "shadow-[0_1px_3px_rgba(17,24,39,0.06)]",
          )}
        >
          <div className="flex h-16 items-center gap-2 md:h-[72px] md:gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-4">
              <SidebarMobileTrigger className="shrink-0 md:hidden" />
              <BrandMarkCompact />
              <NavbarBreadcrumbs />
            </div>

            <NavbarSearch />

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <NavbarActions />
              <ProfileMenu />
            </div>
          </div>

          <NavbarMobileSearch />
        </div>
      </header>
    </>
  );
}
