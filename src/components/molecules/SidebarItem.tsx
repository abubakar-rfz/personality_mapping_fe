"use client";

import Link from "next/link";
import { cva } from "class-variance-authority";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { cn } from "@/lib/utils";
import type { SidebarNavItem } from "@/config/sidebar";

const sidebarItemVariants = cva(
  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#034350]/25 focus-visible:ring-offset-2",
  {
    variants: {
      active: {
        true: "bg-[#034350]/[0.08] text-[#034350] shadow-sm",
        false:
          "text-[#6B7280] hover:translate-x-0.5 hover:bg-[#F4F6F8] hover:text-[#111827]",
      },
      collapsed: {
        true: "justify-center px-2.5",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
      collapsed: false,
    },
  },
);

export interface SidebarItemProps {
  item: SidebarNavItem;
  isActive: boolean;
  collapsed?: boolean;
  onNavigate?: () => void;
}

export function SidebarItem({
  item,
  isActive,
  collapsed = false,
  onNavigate,
}: SidebarItemProps) {
  const Icon = item.icon;

  const content = (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      aria-label={collapsed ? item.label : undefined}
      className={cn(
        sidebarItemVariants({ active: isActive, collapsed }),
        collapsed && "w-full",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#034350] transition-all duration-300",
          isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
        )}
      />

      <Icon
        aria-hidden="true"
        className={cn(
          "size-[18px] shrink-0 transition-colors duration-200",
          isActive
            ? "text-[#034350]"
            : "text-[#6B7280] group-hover:text-[#111827]",
        )}
        strokeWidth={isActive ? 2.25 : 2}
      />

      {!collapsed && (
        <span className="truncate tracking-[-0.01em]">{item.label}</span>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    );
  }

  return content;
}
