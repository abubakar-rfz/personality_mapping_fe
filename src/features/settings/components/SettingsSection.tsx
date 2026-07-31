"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  GripVertical,
  Key,
  Shield,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";
import type { SettingsPayload } from "@/features/settings/api/settings.api";
import { DepartmentsSection } from "@/features/settings/components/DepartmentsSection";
import type { SettingsSectionId } from "@/features/settings/types/settings.types";
import { useTranslations } from "next-intl";

interface SettingsSectionProps {
  sectionId: SettingsSectionId;
  settings: SettingsPayload;
  onChange: (patch: Partial<SettingsPayload>) => void;
}

// ── Reusable toggle switch ────────────────────────────────────────────────────
function Toggle({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? "bg-[#034350]" : "bg-gray-200 dark:bg-zinc-700"
      }`}
    >
      <span
        className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function SettingsSection({ sectionId, settings, onChange }: SettingsSectionProps) {
  const t = useTranslations("Settings");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const activeTheme = mounted ? theme : undefined;

  // Keep next-themes in sync with the persisted theme value
  useEffect(() => {
    if (mounted && settings.theme && settings.theme !== theme) {
      setTheme(settings.theme);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.theme, mounted]);

  switch (sectionId) {
    // ── GENERAL ──────────────────────────────────────────────────────────────
    case "general":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">{t("generalTitle")}</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">{t("generalDesc")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("workspaceId")}</label>
                <Input value="workspace-apex-enterprises" disabled className="bg-gray-50 dark:bg-zinc-900/50 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("workspaceName")}</label>
                <Input
                  value={settings.workspaceName ?? ""}
                  onChange={(e) => onChange({ workspaceName: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("systemLanguage")}</label>
                <select
                  value={settings.language ?? "English (US)"}
                  onChange={(e) => onChange({ language: e.target.value })}
                  className="h-9 w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2.5 text-xs text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350]"
                >
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Deutsch</option>
                  <option>Español</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("workspaceTimezone")}</label>
                <select
                  value={settings.timezone ?? "UTC+05:00 Islamabad, Karachi"}
                  onChange={(e) => onChange({ timezone: e.target.value })}
                  className="h-9 w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2.5 text-xs text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350]"
                >
                  <option>UTC+05:00 Islamabad, Karachi</option>
                  <option>UTC+00:00 London (GMT)</option>
                  <option>UTC-05:00 Eastern Time (US & Canada)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("workspaceTheme")}</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                {(["light", "dark", "system"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setTheme(opt);
                      onChange({ theme: opt });
                    }}
                    className={`flex flex-col items-center gap-1 rounded-xl border p-3 capitalize transition-all text-xs font-semibold ${
                      activeTheme === opt
                        ? "border-[#034350] bg-[#034350]/[0.02] shadow-sm ring-1 ring-[#034350] text-[#034350] dark:text-[#4da8b5]"
                        : "border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#121212] hover:border-gray-300 text-gray-700 dark:text-zinc-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      );

    // ── ORGANISATION ─────────────────────────────────────────────────────────
    case "organisation":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">{t("corporateDetails")}</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">{t("corporateDetailsDesc")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("corporateName")}</label>
                <Input
                  value={settings.corporateName ?? ""}
                  onChange={(e) => onChange({ corporateName: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("industry")}</label>
                <Input
                  value={settings.industry ?? ""}
                  onChange={(e) => onChange({ industry: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("corporateSize")}</label>
                <select
                  value={settings.corporateSize ?? "1 - 50 Employees"}
                  onChange={(e) => onChange({ corporateSize: e.target.value })}
                  className="h-9 w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2.5 text-xs text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350]"
                >
                  <option>1 - 50 Employees</option>
                  <option>51 - 200 Employees</option>
                  <option>201 - 1000 Employees</option>
                  <option>1000+ Employees</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("websiteUrl")}</label>
                <Input
                  value={settings.websiteUrl ?? ""}
                  onChange={(e) => onChange({ websiteUrl: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("workingDays")}</label>
                <Input
                  value={settings.workingDays ?? ""}
                  onChange={(e) => onChange({ workingDays: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("operatingHours")}</label>
                <Input
                  value={settings.operatingHours ?? ""}
                  onChange={(e) => onChange({ operatingHours: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      );

    // ── DEPARTMENTS ───────────────────────────────────────────────────────────
    case "departments":
      return <DepartmentsSection settings={settings} onChange={onChange} />;

    // ── ASSESSMENT ────────────────────────────────────────────────────────────
    case "assessment": {
      const modules = settings.assessmentModules ?? [];
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">{t("assessmentConfigTitle")}</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">{t("assessmentConfigDesc")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 border-b border-gray-100 dark:border-zinc-800 pb-5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("maxTimePerModule")}</label>
                <Input
                  type="number"
                  value={settings.maxTimePerModule ?? 20}
                  onChange={(e) => onChange({ maxTimePerModule: Number(e.target.value) })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("reassessmentInterval")}</label>
                <Input
                  type="number"
                  value={settings.reassessmentIntervalDays ?? 90}
                  onChange={(e) => onChange({ reassessmentIntervalDays: Number(e.target.value) })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold text-gray-900 dark:text-zinc-100">{t("activeEvaluationModules")}</h4>
              <div className="space-y-2">
                {modules.map((ac) => (
                  <div
                    key={ac.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#121212] p-3.5 text-xs transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 min-w-0"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <GripVertical className="size-4 text-gray-400 dark:text-zinc-500 cursor-grab shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 dark:text-zinc-100 truncate">{ac.name}</p>
                        <p className="text-[10px] text-gray-400 dark:text-zinc-500 truncate">
                          {ac.questionCount} Questions · {ac.estimatedMinutes} minutes
                        </p>
                      </div>
                    </div>
                    <Toggle
                      checked={ac.enabled}
                      onToggle={() =>
                        onChange({
                          assessmentModules: modules.map((m) =>
                            m.id === ac.id ? { ...m, enabled: !m.enabled } : m,
                          ),
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // ── PERSONALITY MODEL ─────────────────────────────────────────────────────
    case "personality":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">{t("personalityModelTitle")}</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">{t("personalityModelDesc")}</p>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onChange({ personalityModel: "disc" })}
                className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-all min-w-0 ${
                  settings.personalityModel === "disc"
                    ? "border-[#034350] bg-[#034350]/[0.03] dark:bg-[#4da8b5]/[0.05] shadow-md ring-1 ring-[#034350]"
                    : "border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#121212] hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3 w-full min-w-0">
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 truncate">{t("discFramework")}</h4>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                      {t("discDesc")}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 shrink-0">
                    Active
                  </span>
                </div>
              </button>

              <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 p-5 text-left opacity-70 min-w-0">
                <div className="flex items-start justify-between gap-3 w-full min-w-0">
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-gray-400 dark:text-zinc-500 truncate">{t("bigFive")}</h4>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 leading-relaxed">
                      {t("bigFiveDesc")}
                    </p>
                  </div>
                  <span className="rounded-full bg-gray-100 dark:bg-zinc-900 px-2 py-0.5 text-[9px] font-semibold text-gray-500 dark:text-zinc-400 shrink-0">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    // ── AI CONFIG ─────────────────────────────────────────────────────────────
    case "ai": {
      const confidence = settings.confidenceThreshold ?? 85;
      const sensitivity = settings.recommendationSensitivity ?? 70;
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">{t("aiCoreTitle")}</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">{t("aiCoreDesc")}</p>
            </div>

            <div className="space-y-3">
              {(
                [
                  { key: "aiRecommendations" as const, title: t("aiRecommendationsTitle"), desc: t("aiRecommendationsDesc") },
                  { key: "projectClientMatching" as const, title: t("projectMatchingTitle"), desc: t("projectMatchingDesc") },
                  { key: "burnoutRiskDetection" as const, title: t("burnoutDetectionTitle"), desc: t("burnoutDetectionDesc") },
                ] as const
              ).map((item) => (
                <div
                  key={item.key}
                  className="flex items-start justify-between gap-3.5 rounded-xl border border-gray-100 dark:border-zinc-800 p-4 text-xs bg-white dark:bg-[#121212] min-w-0"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-zinc-100 truncate">{item.title}</p>
                    <p className="text-gray-400 dark:text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                  <Toggle
                    checked={!!settings[item.key]}
                    onToggle={() => onChange({ [item.key]: !settings[item.key] })}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-5 border-t border-gray-100 dark:border-zinc-800 pt-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-gray-600 dark:text-zinc-400">{t("aiConfidenceThreshold")}</span>
                  <span className="font-bold text-[#034350] dark:text-[#4da8b5]">{confidence}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={confidence}
                  onChange={(e) => onChange({ confidenceThreshold: Number(e.target.value) })}
                  className="h-2 w-full appearance-none rounded-lg accent-[#034350] cursor-pointer outline-none"
                  style={{
                    background: `linear-gradient(to right, #034350 ${((confidence - 50) / 50) * 100}%, #e5e7eb ${((confidence - 50) / 50) * 100}%)`,
                  }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-gray-600 dark:text-zinc-400">{t("recommendationSensitivity")}</span>
                  <span className="font-bold text-[#034350] dark:text-[#4da8b5]">{sensitivity}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={sensitivity}
                  onChange={(e) => onChange({ recommendationSensitivity: Number(e.target.value) })}
                  className="h-2 w-full appearance-none rounded-lg accent-[#034350] cursor-pointer outline-none"
                  style={{
                    background: `linear-gradient(to right, #034350 ${((sensitivity - 10) / 90) * 100}%, #e5e7eb ${((sensitivity - 10) / 90) * 100}%)`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // ── ROLES & PERMISSIONS ───────────────────────────────────────────────────
    case "roles": {
      const permissions = settings.permissions ?? [];
      return (
        <div className="space-y-4 w-full min-w-0">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">{t("rolesMatrixTitle")}</h3>
            <p className="text-xs text-gray-400 dark:text-zinc-500">{t("rolesMatrixDesc")}</p>
          </div>

          <Card className="flex flex-col w-full min-w-0">
            <CardContent className="p-0">
              <ScrollArea className="w-full">
                <div className="min-w-[600px]">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/60 dark:bg-zinc-900/60 text-gray-500 dark:text-zinc-400 font-semibold">
                      <tr>
                        <th className="px-5 py-3.5">Permission Details</th>
                        <th className="px-4 py-3.5 text-center">Admin</th>
                        <th className="px-4 py-3.5 text-center">HR</th>
                        <th className="px-4 py-3.5 text-center">Manager</th>
                        <th className="px-4 py-3.5 text-center">Employee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                      {permissions.map((row, idx) => (
                        <tr key={row.permission} className="transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-800/50">
                          <td className="px-5 py-3.5 font-medium text-gray-700 dark:text-zinc-300">{row.permission}</td>
                          {(["admin", "hr", "manager", "employee"] as const).map((role) => (
                            <td key={role} className="px-4 py-3.5 text-center">
                              <input
                                type="checkbox"
                                checked={row[role]}
                                onChange={() => {
                                  const updated = permissions.map((p, i) =>
                                    i === idx ? { ...p, [role]: !p[role] } : p,
                                  );
                                  onChange({ permissions: updated });
                                }}
                                className="size-3.5 rounded border-gray-300 dark:border-zinc-700 text-[#034350] focus:ring-[#034350]/30 cursor-pointer"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      );
    }

    // ── NOTIFICATIONS ─────────────────────────────────────────────────────────
    case "notifications":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">{t("notificationSettingsTitle")}</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">{t("notificationSettingsDesc")}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 dark:border-zinc-800 p-4 text-xs bg-white dark:bg-[#121212] min-w-0">
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 dark:text-zinc-100 truncate">{t("emailNotificationsTitle")}</p>
                  <p className="text-gray-400 dark:text-zinc-500 leading-relaxed">{t("emailNotificationsDesc")}</p>
                </div>
                <Toggle
                  checked={!!settings.emailNotifications}
                  onToggle={() => onChange({ emailNotifications: !settings.emailNotifications })}
                />
              </div>

              <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 dark:border-zinc-800 p-4 text-xs bg-white dark:bg-[#121212] min-w-0">
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 dark:text-zinc-100 truncate">{t("browserAlertsTitle")}</p>
                  <p className="text-gray-400 dark:text-zinc-500 leading-relaxed">{t("browserAlertsDesc")}</p>
                </div>
                <Toggle
                  checked={!!settings.browserAlerts}
                  onToggle={() => onChange({ browserAlerts: !settings.browserAlerts })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      );

    // ── SECURITY ──────────────────────────────────────────────────────────────
    case "security":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">{t("securityTitle")}</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">{t("securityDesc")}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-gray-100 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-[#121212] min-w-0">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <Key className="size-5 text-[#034350] dark:text-[#4da8b5] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs text-gray-900 dark:text-zinc-100 truncate">{t("twoFactorTitle")}</p>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-relaxed">{t("twoFactorDesc")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Toggle
                    checked={!!settings.twoFactorEnabled}
                    onToggle={() => onChange({ twoFactorEnabled: !settings.twoFactorEnabled })}
                  />
                  <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto justify-center">Configure</Button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-gray-100 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-[#121212] min-w-0">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <Shield className="size-5 text-[#034350] dark:text-[#4da8b5] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs text-gray-900 dark:text-zinc-100 truncate">{t("passwordPolicyTitle")}</p>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-relaxed">{t("passwordPolicyDesc")}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto shrink-0 justify-center">Edit Rules</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    // ── BRANDING ──────────────────────────────────────────────────────────────
    case "branding": {
      const primary = settings.primaryColor ?? "#034350";
      const secondary = settings.secondaryColor ?? "#4da8b5";
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">{t("brandingTitle")}</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">{t("brandingDesc")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("primaryColor")}</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={primary}
                    onChange={(e) => onChange({ primaryColor: e.target.value })}
                    className="size-9 p-0 border-0 cursor-pointer rounded-lg bg-transparent shrink-0"
                  />
                  <Input
                    value={primary}
                    onChange={(e) => onChange({ primaryColor: e.target.value })}
                    className="text-xs flex-1"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("secondaryColor")}</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={secondary}
                    onChange={(e) => onChange({ secondaryColor: e.target.value })}
                    className="size-9 p-0 border-0 cursor-pointer rounded-lg bg-transparent shrink-0"
                  />
                  <Input
                    value={secondary}
                    onChange={(e) => onChange({ secondaryColor: e.target.value })}
                    className="text-xs flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 min-w-0">
              <span className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Interface Colors Live Preview</span>
              <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 p-5 bg-gray-50/50 flex flex-col items-center gap-3 min-w-0 w-full">
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-full" style={{ backgroundColor: primary }} />
                  <span className="text-xs font-semibold text-gray-900 dark:text-zinc-100">Corporate Portal Highlight</span>
                </div>
                <Button
                  size="sm"
                  className="text-xs w-full sm:w-auto justify-center"
                  style={{ backgroundColor: primary, color: "#fff" }}
                >
                  Primary Interactive Action
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // ── REPORTS ───────────────────────────────────────────────────────────────
    case "reports":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">{t("reportsTitle")}</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">{t("reportsDesc")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("defaultExportFormat")}</label>
                <select
                  value={settings.reportFormat ?? "Portable Document Format (PDF)"}
                  onChange={(e) => onChange({ reportFormat: e.target.value })}
                  className="h-9 w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2.5 text-xs text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350]"
                >
                  <option>Portable Document Format (PDF)</option>
                  <option>Microsoft Excel Spreadsheet (XLSX)</option>
                  <option>Comma Separated Values (CSV)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">{t("scheduleFrequency")}</label>
                <select
                  value={settings.scheduleFrequency ?? "Weekly"}
                  onChange={(e) => onChange({ scheduleFrequency: e.target.value })}
                  className="h-9 w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2.5 text-xs text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350]"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    default:
      return null;
  }
}
