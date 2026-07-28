import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2 text-sm text-[#111827] transition-colors outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#034350]/30 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#034350]/15 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
