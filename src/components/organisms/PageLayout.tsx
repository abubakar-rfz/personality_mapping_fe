import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-[calc(100vh-8rem)] rounded-2xl bg-white dark:bg-[#121212] p-6 shadow-[0_1px_2px_rgba(17,24,39,0.04),0_12px_40px_rgba(17,24,39,0.06)] md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
