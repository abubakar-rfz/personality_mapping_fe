"use client";

import type { SettingsNavItem, SettingsSectionId } from "@/features/settings/types/settings.types";

interface SettingsSidebarProps {
  items: SettingsNavItem[];
  activeSection: SettingsSectionId;
  onSelectSection: (id: SettingsSectionId) => void;
}

export function SettingsSidebar({
  items,
  activeSection,
  onSelectSection,
}: SettingsSidebarProps) {
  return (
    <div className="space-y-1 lg:sticky lg:top-6">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
          Preferences & Controls
        </h2>
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`flex w-full items-start gap-3.5 rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                isActive
                  ? "bg-[#034350] text-white shadow-md shadow-[#034350]/10"
                  : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 dark:bg-zinc-900 hover:text-gray-900 dark:text-zinc-100"
              }`}
            >
              <Icon className={`size-5 shrink-0 mt-0.5 ${isActive ? "text-white" : "text-gray-500 dark:text-zinc-400"}`} />
              <div className="min-w-0">
                <p className="text-xs font-semibold leading-none">
                  {item.label}
                </p>
                <p
                  className={`mt-1.5 text-[10px] leading-relaxed truncate ${
                    isActive ? "text-white/70" : "text-gray-400 dark:text-zinc-500"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
