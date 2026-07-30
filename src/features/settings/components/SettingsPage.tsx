"use client";

import { useState } from "react";
import { Menu, Save, X } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/atoms/sheet";
import { SettingsSection } from "@/features/settings/components/SettingsSection";
import { SettingsSidebar } from "@/features/settings/components/SettingsSidebar";
import { settingsNavItems } from "@/features/settings/data/settings.data";
import type { SettingsSectionId } from "@/features/settings/types/settings.types";

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSectionId>("general");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);

  const activeItem = settingsNavItems.find((item) => item.id === activeSection);

  const handleSelectSection = (id: SettingsSectionId) => {
    setActiveSection(id);
    setIsMobileNavOpen(false);
  };

  const handleSaveChanges = () => {
    setHasUnsavedChanges(false);
  };

  const handleDiscardChanges = () => {
    setHasUnsavedChanges(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8 overflow-x-hidden">
      {/* Settings Top Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-zinc-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-3xl">
              Settings
            </h1>
            {hasUnsavedChanges && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 animate-pulse">
                Unsaved Changes
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Manage your organisation, AI preferences and workforce intelligence platform.
          </p>
        </div>

        {/* Header Actions (Equally sized & side-by-side on Mobile) */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDiscardChanges}
            className="text-xs flex-1 sm:flex-none justify-center h-9 px-4"
          >
            Discard
          </Button>
          <Button
            size="sm"
            onClick={handleSaveChanges}
            className="text-xs bg-[#034350] text-white flex-1 sm:flex-none justify-center h-9 px-4"
          >
            <Save className="size-3.5" />
            Save Changes
          </Button>
        </div>
      </section>

      {/* Main Settings Grid Layout */}
      <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
        {/* Left Settings Sidebar (Hidden on Mobile/Tablet) */}
        <aside className="hidden lg:block">
          <SettingsSidebar
            items={settingsNavItems}
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
          />
        </aside>

        {/* Mobile Navigation Trigger Button (Visible only on Mobile/Tablet <1024px) */}
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#121212] p-4 shadow-sm lg:hidden">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#034350]/5 dark:bg-[#4da8b5]/10 text-[#034350] dark:text-[#4da8b5] shrink-0">
              {activeItem && <activeItem.icon className="size-5" />}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                Active Category
              </span>
              <p className="text-xs font-bold text-gray-900 dark:text-zinc-100 truncate">
                {activeItem?.label}
              </p>
            </div>
          </div>

          {/* Trigger Sheet Drawer */}
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs gap-1.5 shrink-0">
                <Menu className="size-4" />
                Change Category
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r border-gray-100 dark:border-zinc-800 w-[300px]">
              <div className="flex h-full flex-col bg-white dark:bg-[#121212]">
                {/* Header inside Sheet */}
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 px-5 py-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 font-semibold">
                    Settings Menu
                  </span>
                  <Button variant="ghost" size="icon-sm" onClick={() => setIsMobileNavOpen(false)}>
                    <X className="size-4 text-gray-500 dark:text-zinc-400" />
                  </Button>
                </div>
                {/* List inside Sheet */}
                <div className="flex-1 overflow-y-auto px-2 py-4">
                  <SettingsSidebar
                    items={settingsNavItems}
                    activeSection={activeSection}
                    onSelectSection={handleSelectSection}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Right Settings Content Section Area */}
        <main className="min-w-0 w-full space-y-6">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-2 mb-2 lg:hidden">
            <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">
              {activeItem?.label}
            </h2>
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              {activeItem?.description}
            </p>
          </div>

          <SettingsSection sectionId={activeSection} />
        </main>
      </div>
    </div>
  );
}
