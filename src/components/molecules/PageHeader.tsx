import type { ReactNode } from "react";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="text-sm font-medium text-[#034350] dark:text-[#4da8b5]">{eyebrow}</p>
        )}
        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#111827] dark:text-zinc-100 md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-[#6B7280] dark:text-zinc-400">{description}</p>
        )}
      </div>

      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  );
}
