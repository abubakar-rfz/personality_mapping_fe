"use client";

import { useEffect, useState } from "react";
import { Loader2, Menu, Save, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/atoms/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/atoms/sheet";
import { SettingsSection } from "@/features/settings/components/SettingsSection";
import { SettingsSidebar } from "@/features/settings/components/SettingsSidebar";
import {
  settingsNavItems,
  initialDepartments,
  initialAssessments,
  initialPermissions,
} from "@/features/settings/data/settings.data";
import type { SettingsSectionId } from "@/features/settings/types/settings.types";
import {
  fetchSettings,
  updateSettings,
  type SettingsPayload,
} from "@/features/settings/api/settings.api";
import { useNextIntlLanguage } from "@/components/providers/next-intl-provider";
import { useTranslations } from "next-intl";

// ─── Fallback defaults (used when backend is unreachable) ─────────────────────
const DEFAULT_SETTINGS: SettingsPayload = {
  workspaceName: "Apex Enterprises",
  language: "English (US)",
  timezone: "UTC+05:00 Islamabad, Karachi",
  theme: "system",
  corporateName: "Apex Enterprises Private Limited",
  industry: "Software Engineering & AI Development",
  corporateSize: "1 - 50 Employees",
  websiteUrl: "https://apexenterprises.com",
  workingDays: "Monday - Friday",
  operatingHours: "09:00 AM - 06:00 PM",
  departments: initialDepartments,
  maxTimePerModule: 20,
  reassessmentIntervalDays: 90,
  assessmentModules: initialAssessments,
  personalityModel: "disc",
  aiRecommendations: true,
  projectClientMatching: true,
  burnoutRiskDetection: true,
  confidenceThreshold: 85,
  recommendationSensitivity: 70,
  permissions: initialPermissions,
  emailNotifications: true,
  browserAlerts: true,
  twoFactorEnabled: false,
  primaryColor: "#034350",
  secondaryColor: "#4da8b5",
  logoUrl: "",
  reportFormat: "Portable Document Format (PDF)",
  scheduleFrequency: "Weekly",
};

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSectionId>("general");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [settings, setSettings] = useState<SettingsPayload>(DEFAULT_SETTINGS);

  const { setLanguage } = useNextIntlLanguage();
  const t = useTranslations("Settings");

  const activeItem = settingsNavItems.find((item) => item.id === activeSection);

  // ── Load on mount ─────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setIsFetching(true);
        const data = await fetchSettings();
        setSettings((prev) => ({ ...prev, ...data }));
      } catch {
        // Backend unreachable — keep defaults silently
      } finally {
        setIsFetching(false);
      }
    };
    load();
  }, []);

  // ── Field change handler ──────────────────────────────────────────────────
  const handleChange = (patch: Partial<SettingsPayload>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
    setHasUnsavedChanges(true);
    // Immediately apply language change to UI without waiting for save
    if (patch.language) {
      setLanguage(patch.language);
    }
  };

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      const saved = await updateSettings(settings);
      setSettings((prev) => ({ ...prev, ...saved }));
      setHasUnsavedChanges(false);
      toast.success("Settings saved successfully.");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save settings. Check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Discard ───────────────────────────────────────────────────────────────
  const handleDiscardChanges = async () => {
    try {
      setIsFetching(true);
      const data = await fetchSettings();
      setSettings((prev) => ({ ...prev, ...data }));
      toast.info("Changes discarded.");
    } catch {
      setSettings(DEFAULT_SETTINGS);
      toast.info("Changes discarded. Using defaults.");
    } finally {
      setIsFetching(false);
      setHasUnsavedChanges(false);
    }
  };

  const handleSelectSection = (id: SettingsSectionId) => {
    setActiveSection(id);
    setIsMobileNavOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8 overflow-x-hidden">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-zinc-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-3xl">
              {t("settings")}
            </h1>
            {hasUnsavedChanges && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 animate-pulse">
                {t("unsavedChanges")}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            {t("settingsSubtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDiscardChanges}
            disabled={isFetching || !hasUnsavedChanges}
            className="text-xs flex-1 sm:flex-none justify-center h-9 px-4 disabled:opacity-50"
          >
            {t("discard")}
          </Button>
          <Button
            size="sm"
            onClick={handleSaveChanges}
            disabled={isSaving || !hasUnsavedChanges}
            className="text-xs bg-[#034350] text-white flex-1 sm:flex-none justify-center h-9 px-4 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
            {isSaving ? t("saving") : t("saveChanges")}
          </Button>
        </div>
      </section>

      {/* Layout */}
      <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
        <aside className="hidden lg:block">
          <SettingsSidebar
            items={settingsNavItems}
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
          />
        </aside>

        {/* Mobile nav trigger */}
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#121212] p-4 shadow-sm lg:hidden">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#034350]/5 dark:bg-[#4da8b5]/10 text-[#034350] dark:text-[#4da8b5] shrink-0">
              {activeItem && <activeItem.icon className="size-5" />}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">{t("activeCategory")}</span>
              <p className="text-xs font-bold text-gray-900 dark:text-zinc-100 truncate">{activeItem?.label}</p>
            </div>
          </div>
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs gap-1.5 shrink-0">
                <Menu className="size-4" /> {t("changeCategory")}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r border-gray-100 dark:border-zinc-800 w-[300px]">
              <div className="flex h-full flex-col bg-white dark:bg-[#121212]">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 px-5 py-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">{t("settingsMenu")}</span>
                  <Button variant="ghost" size="icon-sm" onClick={() => setIsMobileNavOpen(false)}>
                    <X className="size-4 text-gray-500 dark:text-zinc-400" />
                  </Button>
                </div>
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

        {/* Content */}
        <main className="min-w-0 w-full space-y-6">
          <div className="border-b border-gray-100 dark:border-zinc-800 pb-2 mb-2 lg:hidden">
            <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">{activeItem?.label}</h2>
            <p className="text-xs text-gray-500 dark:text-zinc-400">{activeItem?.description}</p>
          </div>

          {isFetching ? (
            <div className="flex items-center justify-center p-16">
              <Loader2 className="size-6 animate-spin text-gray-400 dark:text-zinc-600" />
            </div>
          ) : (
            <SettingsSection
              sectionId={activeSection}
              settings={settings}
              onChange={handleChange}
            />
          )}
        </main>
      </div>
    </div>
  );
}
