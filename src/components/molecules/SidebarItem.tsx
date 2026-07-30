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
  "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#034350]/25 focus-visible:ring-offset-2",
  {
    variants: {
      active: {
        true: "bg-[#034350]/[0.06] text-[#034350] dark:bg-zinc-800 dark:text-white",
        false:
          "text-gray-500 hover:bg-gray-100/80 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white",
      },
      collapsed: {
        true: "justify-center px-2 py-2.5",
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
      <Icon
        aria-hidden="true"
        className={cn(
          "size-[18px] shrink-0 transition-colors duration-200",
          isActive
            ? "text-[#034350] dark:text-white"
            : "text-gray-400 group-hover:text-gray-600 dark:text-zinc-500 dark:group-hover:text-white",
        )}
        strokeWidth={isActive ? 2 : 1.75}
      />

      {!collapsed && (
        <span className="truncate tracking-tight">{item.label}</span>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="text-xs">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}
