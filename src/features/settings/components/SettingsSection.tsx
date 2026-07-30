"use client";

import { useState } from "react";
import {
  CheckCircle2,
  GripVertical,
  Key,
  Layers,
  Palette,
  Plus,
  Shield,
  Sparkles,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { Progress } from "@/components/atoms/progress";
import { ScrollArea, ScrollBar } from "@/components/atoms/scroll-area";

import {
  initialAssessments,
  initialDepartments,
  initialPermissions,
} from "@/features/settings/data/settings.data";
import type { SettingsSectionId } from "@/features/settings/types/settings.types";

interface SettingsSectionProps {
  sectionId: SettingsSectionId;
}

export function SettingsSection({ sectionId }: SettingsSectionProps) {
  const [departments, setDepartments] = useState(initialDepartments);
  const [assessments, setAssessments] = useState(initialAssessments);
  const [permissions, setPermissions] = useState(initialPermissions);

  const [activeTheme, setActiveTheme] = useState<"light" | "dark" | "system">("light");
  const [selectedModel, setSelectedModel] = useState("disc");

  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [sensitivity, setSensitivity] = useState(70);

  const [primaryColor, setPrimaryColor] = useState("#034350");
  const [secondaryColor, setSecondaryColor] = useState("#4da8b5");

  const handleToggleAssessment = (id: string) => {
    setAssessments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  const handleTogglePermission = (index: number, role: "admin" | "hr" | "manager" | "employee") => {
    setPermissions((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [role]: !item[role] } : item)),
    );
  };

  switch (sectionId) {
    case "general":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">General Workspace Settings</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">Configure global metadata and regional preferences.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Workspace ID</label>
                <Input defaultValue="workspace-tamwork-execute" disabled className="bg-gray-50 dark:bg-zinc-900 dark:bg-zinc-900/50 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Workspace Name</label>
                <Input defaultValue="TamWork Execute" className="text-xs" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">System Language</label>
                <select className="h-9 w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2.5 text-xs text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350]">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Deutsch</option>
                  <option>Español</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Workspace Time Zone</label>
                <select className="h-9 w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2.5 text-xs text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350]">
                  <option>UTC+05:00 Islamabad, Karachi</option>
                  <option>UTC+00:00 London (GMT)</option>
                  <option>UTC-05:00 Eastern Time (US & Canada)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Workspace Theme</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                {(["light", "dark", "system"] as const).map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => setActiveTheme(theme)}
                    className={`flex flex-col items-center gap-1 rounded-xl border p-3 capitalize transition-all text-xs font-semibold ${
                      activeTheme === theme
                        ? "border-[#034350] bg-[#034350]/[0.02] shadow-sm ring-1 ring-[#034350] text-[#034350] dark:text-[#4da8b5]"
                        : "border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#121212] hover:border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300"
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button className="text-xs w-full sm:w-auto">Save Workspace Changes</Button>
            </div>
          </CardContent>
        </Card>
      );

    case "organisation":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">Corporate Details</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">Configure corporate registration parameters.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Corporate Name</label>
                <Input defaultValue="TamWork Execute Private Limited" className="text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Industry</label>
                <Input defaultValue="Software Engineering & AI Development" className="text-xs" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Corporate Size</label>
                <select className="h-9 w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2.5 text-xs text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350]">
                  <option>1 - 50 Employees</option>
                  <option>51 - 200 Employees</option>
                  <option>201 - 1000 Employees</option>
                  <option>1000+ Employees</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Website URL</label>
                <Input defaultValue="https://tamwork.com" className="text-xs" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Working Days (per week)</label>
                <Input defaultValue="Monday - Friday" className="text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Operating Hours</label>
                <Input defaultValue="09:00 AM - 06:00 PM" className="text-xs" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button className="text-xs w-full sm:w-auto">Save Corporate Parameters</Button>
            </div>
          </CardContent>
        </Card>
      );

    case "departments":
      return (
        <div className="space-y-6 w-full min-w-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Departments & Teams</h3>
              <p className="text-xs text-gray-400 dark:text-zinc-500">Manage organizational departments and team assignments.</p>
            </div>
            <Button size="sm" className="text-xs w-full sm:w-auto justify-center">
              <Plus className="size-3.5" />
              Add Department
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {departments.map((dept) => (
              <Card key={dept.id} className="transition-all hover:border-[#034350]/20 min-w-0">
                <CardContent className="flex items-center justify-between gap-3 p-4 sm:p-5 min-w-0">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <Layers className="size-4 text-[#034350] dark:text-[#4da8b5] shrink-0" />
                      <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 truncate">{dept.name}</h4>
                    </div>
                    <p className="text-[11px] text-gray-400 dark:text-zinc-500 truncate">Manager: {dept.manager}</p>
                    <p className="text-[11px] font-semibold text-[#034350] dark:text-[#4da8b5] shrink-0">{dept.employeeCount} active members</p>
                  </div>

                  <Button variant="ghost" size="icon-sm" className="shrink-0">
                    <Trash2 className="size-3.5 text-gray-400 dark:text-zinc-500 hover:text-red-600" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );

    case "assessment":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">Assessment Configuration</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">Configure global parameters and enable assessment modules.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 border-b border-gray-100 dark:border-zinc-800 pb-5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Max Time Per Module (mins)</label>
                <Input type="number" defaultValue={20} className="text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Reassessment Interval (days)</label>
                <Input type="number" defaultValue={90} className="text-xs" />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold text-gray-900 dark:text-zinc-100">Active Evaluation Modules</h4>
              <div className="space-y-2">
                {assessments.map((ac) => (
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

                    <button
                      type="button"
                      onClick={() => handleToggleAssessment(ac.id)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        ac.enabled ? "bg-[#034350]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block size-4 transform rounded-full bg-white dark:bg-[#121212] shadow-sm ring-0 transition duration-200 ease-in-out ${
                          ac.enabled ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button className="text-xs w-full sm:w-auto">Save Configuration</Button>
            </div>
          </CardContent>
        </Card>
      );

    case "personality":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">Cognitive & Personality Model</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">Select the behavioral framework model that drives workforce predictions.</p>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setSelectedModel("disc")}
                className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-all min-w-0 ${
                  selectedModel === "disc"
                    ? "border-[#034350] bg-[#034350]/[0.03] dark:bg-[#4da8b5]/[0.05] shadow-md ring-1 ring-[#034350]"
                    : "border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#121212] hover:border-gray-300 dark:border-zinc-700"
                }`}
              >
                <div className="flex items-start justify-between gap-3 w-full min-w-0">
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 truncate">DISC Framework</h4>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                      Evaluates Dominance, Influence, Steadiness, and Compliance traits.
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
                    <h4 className="text-sm font-bold text-gray-400 dark:text-zinc-500 truncate">Big Five (OCEAN)</h4>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 leading-relaxed">
                      Measures openness, conscientiousness, extraversion, agreeableness, and neuroticism.
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

    case "ai":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">AI Intelligence Core</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">Configure parameters for workforce projections, matching, and safety alerts.</p>
            </div>

            <div className="space-y-3">
              {[
                { title: "AI Recommendations", desc: "Suggest career promotions and dynamic lead positioning recommendations." },
                { title: "Project & Client Matching", desc: "Evaluate personality alignment across clients and active engineering tasks." },
                { title: "Burnout Risk Detection Alerts", desc: "Pings HR coordinators when active stress vectors exceed baseline limits." },
              ].map((aiSet) => (
                <div
                  key={aiSet.title}
                  className="flex items-start justify-between gap-3.5 rounded-xl border border-gray-100 dark:border-zinc-800 p-4 text-xs bg-white dark:bg-[#121212] min-w-0"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-zinc-100 truncate">{aiSet.title}</p>
                    <p className="text-gray-400 dark:text-zinc-500 leading-relaxed">{aiSet.desc}</p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#034350] transition-colors duration-200"
                  >
                    <span className="pointer-events-none inline-block size-4 transform rounded-full bg-white dark:bg-[#121212] translate-x-4 transition duration-200" />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-5 border-t border-gray-100 dark:border-zinc-800 pt-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-gray-600 dark:text-zinc-400">AI Confidence Threshold</span>
                  <span className="font-bold text-[#034350] dark:text-[#4da8b5]">{confidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="h-2 w-full appearance-none rounded-lg accent-[#034350] cursor-pointer outline-none"
                  style={{
                    background: `linear-gradient(to right, #034350 ${((confidenceThreshold - 50) / 50) * 100}%, #f3f4f6 ${((confidenceThreshold - 50) / 50) * 100}%)`,
                  }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-gray-600 dark:text-zinc-400">Recommendation Sensitivity</span>
                  <span className="font-bold text-[#034350] dark:text-[#4da8b5]">{sensitivity}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={sensitivity}
                  onChange={(e) => setSensitivity(Number(e.target.value))}
                  className="h-2 w-full appearance-none rounded-lg accent-[#034350] cursor-pointer outline-none"
                  style={{
                    background: `linear-gradient(to right, #034350 ${((sensitivity - 10) / 90) * 100}%, #f3f4f6 ${((sensitivity - 10) / 90) * 100}%)`,
                  }}
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button className="text-xs w-full sm:w-auto">Save AI Parameters</Button>
            </div>
          </CardContent>
        </Card>
      );

    case "roles":
      return (
        <div className="space-y-4 w-full min-w-0">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Access Control Matrix</h3>
            <p className="text-xs text-gray-400 dark:text-zinc-500">Map granular permissions across standard corporate account types.</p>
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
                          <td className="px-4 py-3.5 text-center">
                            <input
                              type="checkbox"
                              checked={row.admin}
                              onChange={() => handleTogglePermission(idx, "admin")}
                              className="size-3.5 rounded border-gray-300 dark:border-zinc-700 text-[#034350] dark:text-[#4da8b5] focus:ring-[#034350]/30 cursor-pointer"
                            />
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <input
                              type="checkbox"
                              checked={row.hr}
                              onChange={() => handleTogglePermission(idx, "hr")}
                              className="size-3.5 rounded border-gray-300 dark:border-zinc-700 text-[#034350] dark:text-[#4da8b5] focus:ring-[#034350]/30 cursor-pointer"
                            />
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <input
                              type="checkbox"
                              checked={row.manager}
                              onChange={() => handleTogglePermission(idx, "manager")}
                              className="size-3.5 rounded border-gray-300 dark:border-zinc-700 text-[#034350] dark:text-[#4da8b5] focus:ring-[#034350]/30 cursor-pointer"
                            />
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <input
                              type="checkbox"
                              checked={row.employee}
                              onChange={() => handleTogglePermission(idx, "employee")}
                              className="size-3.5 rounded border-gray-300 dark:border-zinc-700 text-[#034350] dark:text-[#4da8b5] focus:ring-[#034350]/30 cursor-pointer"
                            />
                          </td>
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

    case "notifications":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">Notification Settings</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">Select your active channels for updates and safety alerts.</p>
            </div>

            <div className="space-y-4">
              {[
                { title: "Email Notifications", desc: "Receive daily digest reports and priority burnout warnings in your inbox." },
                { title: "Browser Alerts", desc: "Get real-time push alerts when new employee assessments are finalized." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 dark:border-zinc-800 p-4 text-xs bg-white dark:bg-[#121212] min-w-0"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-zinc-100 truncate">{item.title}</p>
                    <p className="text-gray-400 dark:text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#034350] transition-colors duration-200"
                  >
                    <span className="pointer-events-none inline-block size-4 transform rounded-full bg-white dark:bg-[#121212] translate-x-4 transition duration-200" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );

    case "security":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">Security Parameters</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">Configure authentication safety layers and password guidelines.</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-gray-100 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-[#121212] min-w-0">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <Key className="size-5 text-[#034350] dark:text-[#4da8b5] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs text-gray-900 dark:text-zinc-100 truncate">Two-Factor Authentication (2FA)</p>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-relaxed">Enforce mobile authenticator safety codes on corporate login attempts.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto shrink-0 justify-center">Configure</Button>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-gray-100 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-[#121212] min-w-0">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <Shield className="size-5 text-[#034350] dark:text-[#4da8b5] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs text-gray-900 dark:text-zinc-100 truncate">Password Policy</p>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-relaxed">Minimum 12 characters, including capital letters, digits & spec symbols.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto shrink-0 justify-center">Edit Rules</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "branding":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">Corporate Branding & Identity</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">Customize workspace logo assets and interface color highlights.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Primary Color Theme</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="size-9 p-0 border-0 cursor-pointer rounded-lg bg-transparent shrink-0"
                  />
                  <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="text-xs flex-1" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Secondary Color Theme</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="size-9 p-0 border-0 cursor-pointer rounded-lg bg-transparent shrink-0"
                  />
                  <Input value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="text-xs flex-1" />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 min-w-0">
              <span className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Interface Colors Live Preview</span>
              <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 p-5 bg-gray-50/50 flex flex-col items-center gap-3 min-w-0 w-full">
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <span className="text-xs font-semibold text-gray-900 dark:text-zinc-100">Corporate Portal Highlight</span>
                </div>
                <Button size="sm" className="text-xs w-full sm:w-auto justify-center" style={{ backgroundColor: primaryColor, color: "#fff" }}>
                  Primary Interactive Action
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "reports":
      return (
        <Card className="border-gray-100 dark:border-zinc-800 shadow-sm w-full min-w-0">
          <CardContent className="space-y-6 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 sm:text-base">Report Preferences</h3>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400">Configure default scheduled export templates and data formats.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Default Export Format</label>
                <select className="h-9 w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2.5 text-xs text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350]">
                  <option>Portable Document Format (PDF)</option>
                  <option>Microsoft Excel Spreadsheet (XLSX)</option>
                  <option>Comma Separated Values (CSV)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Report Detailed Theme</label>
                <select className="h-9 w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2.5 text-xs text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350]">
                  <option>Minimal Dark Teal (Default)</option>
                  <option>Clean Classic Grayscale</option>
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
