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
    <div className="relative mx-auto hidden w-full max-w-xl md:block">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#9CA3AF]"
      />
      <Input
        id={SEARCH_INPUT_ID}
        type="search"
        placeholder="Search employees, teams, projects..."
        aria-label="Search employees, teams, projects"
        className="h-11 pr-24 pl-11 lg:pr-28"
      />
      <kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-2 py-0.5 text-[10px] font-medium text-[#9CA3AF] lg:inline-flex">
        Ctrl K
      </kbd>
    </div>
  );
}

function NavbarActions() {
  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Notifications"
        className="relative hidden text-[#6B7280] hover:scale-105 hover:text-[#111827] lg:inline-flex"
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
        className="hidden text-[#6B7280] hover:scale-105 hover:text-[#111827] md:inline-flex"
      >
        <MessageSquare className="size-5" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        className="hidden text-[#6B7280] hover:scale-105 hover:text-[#111827] lg:inline-flex"
      >
        <Sun className="size-5" />
      </Button>

      <Button
        type="button"
        className="hidden h-10 rounded-full bg-[#034350] px-4 text-white shadow-[0_4px_16px_rgba(3,67,80,0.24)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#034350]/90 md:inline-flex"
      >
        <Sparkles className="size-4" />
        Ask AI
      </Button>
    </>
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

      <header className="sticky top-0 z-30 shrink-0 bg-[#F8FAFC] px-4 pt-4 pb-2 md:px-6 lg:px-8">
        <div
          className={cn(
            "flex h-16 items-center gap-3 rounded-2xl bg-white px-3 transition-shadow duration-300 md:h-[72px] md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] md:gap-4 md:px-5",
            scrolled
              ? "shadow-[0_4px_20px_rgba(17,24,39,0.08)]"
              : "shadow-[0_1px_3px_rgba(17,24,39,0.06)]",
          )}
        >
          <div className="flex min-w-0 items-center gap-2 md:gap-4">
            <SidebarMobileTrigger className="md:hidden" />
            <BrandMarkCompact />
            <NavbarBreadcrumbs />
          </div>

          <NavbarSearch />

          <div className="ml-auto flex items-center gap-1 sm:gap-2 md:ml-0">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="text-[#6B7280] hover:scale-105 hover:text-[#111827] md:hidden"
            >
              <Search className="size-5" />
            </Button>

            <Button
              type="button"
              size="icon"
              aria-label="Ask AI"
              className="inline-flex size-10 rounded-full bg-[#034350] text-white shadow-[0_4px_16px_rgba(3,67,80,0.24)] transition-all duration-200 hover:scale-105 hover:bg-[#034350]/90 md:hidden"
            >
              <Sparkles className="size-4" />
            </Button>

            <NavbarActions />
            <ProfileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
