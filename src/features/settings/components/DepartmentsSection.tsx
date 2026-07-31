"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Archive,
  Building2,
  Calendar,
  ChevronRight,
  Edit2,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  UserCheck,
  Users,
  X,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/atoms/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Input } from "@/components/atoms/input";
import { Progress } from "@/components/atoms/progress";
import { ScrollArea } from "@/components/atoms/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/atoms/sheet";
import { mockEmployees } from "@/features/employees/data/employees.data";
import type { SettingsPayload } from "@/features/settings/api/settings.api";
import type { DepartmentSetting, DepartmentTeam } from "@/features/settings/types/settings.types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const DEPT_COLORS = [
  "#034350", "#7c3aed", "#b45309", "#0369a1",
  "#be185d", "#065f46", "#dc2626", "#d97706",
];

// ─── Sub-component: Empty State ───────────────────────────────────────────────

function EmptyDepartments({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-[#034350]/5 dark:bg-[#4da8b5]/10 mb-4">
        <Building2 className="size-8 text-[#034350] dark:text-[#4da8b5]" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-1">No departments created yet</h3>
      <p className="text-xs text-gray-400 dark:text-zinc-500 mb-5 max-w-xs">
        Start building your organizational structure by creating your first department.
      </p>
      <Button size="sm" className="text-xs gap-1.5" onClick={onAdd}>
        <Plus className="size-3.5" />
        Create Department
      </Button>
    </div>
  );
}

// ─── Sub-component: Department Card ──────────────────────────────────────────

interface DeptCardProps {
  dept: DepartmentSetting;
  onAction: (action: DeptAction, dept: DepartmentSetting) => void;
}

function DepartmentCard({ dept, onAction }: DeptCardProps) {
  const isArchived = dept.status === "archived";
  const color = dept.color ?? "#034350";

  return (
    <Card className={`group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md min-w-0 ${isArchived ? "opacity-60" : ""}`}>
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${color}18` }}
            >
              <Building2 className="size-5" style={{ color }} />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 truncate">{dept.name}</h4>
              <p className="text-[11px] text-gray-400 dark:text-zinc-500 truncate mt-0.5">
                {dept.description ?? "No description provided."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Badge
              className={isArchived
                ? "bg-gray-100 text-gray-500 border-gray-200 dark:bg-zinc-800 dark:text-zinc-400"
                : "bg-emerald-50 text-emerald-700 border-emerald-100"}
            >
              {isArchived ? "Archived" : "Active"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onAction("view", dept)}>
                  <Eye className="size-4" /> View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction("edit", dept)}>
                  <Edit2 className="size-4" /> Edit Department
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction("members", dept)}>
                  <Users className="size-4" /> Manage Members
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction("teams", dept)}>
                  <Building2 className="size-4" /> Manage Teams
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction("head", dept)}>
                  <UserCheck className="size-4" /> Change Department Head
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onAction("archive", dept)}>
                  <Archive className="size-4" /> {isArchived ? "Unarchive" : "Archive"} Department
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onAction("delete", dept)}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
                >
                  <Trash2 className="size-4" /> Delete Department
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Members", value: dept.employeeCount },
            { label: "Teams", value: dept.teamCount ?? 0 },
            { label: "Completion", value: `${dept.assessmentCompletion ?? 0}%` },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-gray-50 dark:bg-zinc-900/50 px-3 py-2 text-center">
              <p className="text-sm font-bold text-gray-900 dark:text-zinc-100">{stat.value}</p>
              <p className="text-[10px] text-gray-400 dark:text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <Avatar className="size-5">
              <AvatarFallback className="text-[9px]" style={{ backgroundColor: color }}>
                {getInitials(dept.head ?? dept.manager)}
              </AvatarFallback>
            </Avatar>
            <span className="text-[11px] text-gray-500 dark:text-zinc-400 truncate">
              {dept.head ?? dept.manager}
            </span>
          </div>
          {dept.createdDate && (
            <span className="flex items-center gap-1 text-[10px] text-gray-300 dark:text-zinc-600">
              <Calendar className="size-3" />
              {dept.createdDate}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Sub-component: View Details Sheet ───────────────────────────────────────

function ViewDetailsSheet({
  dept,
  open,
  onClose,
  onEdit,
  onMembers,
}: {
  dept: DepartmentSetting | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onMembers: () => void;
}) {
  if (!dept) return null;
  const color = dept.color ?? "#034350";
  const members = mockEmployees.filter((e) => (dept.memberIds ?? []).includes(e.id));

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md dark:bg-[#121212] p-0 flex flex-col"
        showClose={false}
      >
        {/* Hidden for a11y */}
        <SheetTitle className="sr-only">{dept.name} Details</SheetTitle>
        <SheetDescription className="sr-only">Department detail view for {dept.name}</SheetDescription>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}18` }}>
              <Building2 className="size-5" style={{ color }} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-zinc-100">{dept.name}</h2>
              <p className="text-[11px] text-gray-400 dark:text-zinc-500">Department Details</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <ScrollArea className="flex-1">
          <div className="px-6 py-5 space-y-6">
            {/* Key stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Employees", value: dept.employeeCount },
                { label: "Teams", value: dept.teamCount ?? 0 },
                { label: "Assessment", value: `${dept.assessmentCompletion ?? 0}%` },
                { label: "Avg Compatibility", value: `${dept.avgCompatibility ?? 0}%` },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-gray-100 dark:border-zinc-800 p-3.5">
                  <p className="text-base font-bold text-gray-900 dark:text-zinc-100">{s.value}</p>
                  <p className="text-[11px] text-gray-400 dark:text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Assessment progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-600 dark:text-zinc-400">Assessment Completion</span>
                <span className="font-bold text-[#034350] dark:text-[#4da8b5]">{dept.assessmentCompletion ?? 0}%</span>
              </div>
              <Progress value={dept.assessmentCompletion ?? 0} className="h-1.5" />
            </div>

            {/* Info rows */}
            <div className="space-y-3">
              {[
                { label: "Department Head", value: dept.head ?? dept.manager },
                { label: "Description", value: dept.description ?? "—" },
                { label: "Created", value: dept.createdDate ?? "—" },
                { label: "Status", value: dept.status === "archived" ? "Archived" : "Active" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between gap-4 text-xs">
                  <span className="text-gray-400 dark:text-zinc-500 shrink-0">{row.label}</span>
                  <span className="font-medium text-gray-900 dark:text-zinc-100 text-right">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Members preview */}
            {members.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-900 dark:text-zinc-100">Members Preview</h4>
                <div className="space-y-2">
                  {members.slice(0, 4).map((emp) => (
                    <div key={emp.id} className="flex items-center gap-2.5">
                      <Avatar className="size-7">
                        <AvatarFallback className="text-[10px]" style={{ backgroundColor: color }}>
                          {emp.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-900 dark:text-zinc-100 truncate">{emp.name}</p>
                        <p className="text-[10px] text-gray-400 dark:text-zinc-500 truncate">{emp.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent activity */}
            {(dept.recentActivity ?? []).length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-900 dark:text-zinc-100">Recent Activity</h4>
                <div className="space-y-2">
                  {(dept.recentActivity ?? []).map((activity, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-zinc-400">
                      <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-emerald-500" />
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer actions */}
        <div className="border-t border-gray-100 dark:border-zinc-800 px-6 py-4 flex gap-2">
          <Button size="sm" className="flex-1 text-xs" onClick={onEdit}>
            <Edit2 className="size-3.5" /> Edit
          </Button>
          <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={onMembers}>
            <Users className="size-3.5" /> Manage Members
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Sub-component: Edit Department Dialog ────────────────────────────────────

function EditDepartmentDialog({
  dept,
  open,
  onClose,
  onSave,
}: {
  dept: DepartmentSetting | null;
  open: boolean;
  onClose: () => void;
  onSave: (updated: Partial<DepartmentSetting>) => void;
}) {
  const isNew = !dept?.id || dept.id.startsWith("new_");
  const [name, setName] = useState(dept?.name ?? "");
  const [description, setDescription] = useState(dept?.description ?? "");
  const [head, setHead] = useState(dept?.head ?? dept?.manager ?? "");
  const [employeeCount, setEmployeeCount] = useState(dept?.employeeCount ?? 0);
  const [status, setStatus] = useState<"active" | "archived">(dept?.status ?? "active");
  const [color, setColor] = useState(dept?.color ?? "#034350");

  // Reset fields whenever the selected dept changes (fixes stale closure bug)
  useEffect(() => {
    setName(dept?.name ?? "");
    setDescription(dept?.description ?? "");
    setHead(dept?.head ?? dept?.manager ?? "");
    setEmployeeCount(dept?.employeeCount ?? 0);
    setStatus(dept?.status ?? "active");
    setColor(dept?.color ?? "#034350");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dept?.id]);

  const isValid = name.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isNew ? "Create Department" : "Edit Department"}</DialogTitle>
          <DialogDescription>
            {isNew ? "Add a new department to your organisation." : `Update details for ${dept?.name}.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">
              Department Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Engineering"
              className="text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short department description..."
              className="text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Department Head</label>
              <Input
                value={head}
                onChange={(e) => setHead(e.target.value)}
                placeholder="Full name"
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Employee Count</label>
              <Input
                type="number"
                min={0}
                value={employeeCount}
                onChange={(e) => setEmployeeCount(Math.max(0, Number(e.target.value)))}
                className="text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "active" | "archived")}
              className="h-9 w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] px-2.5 text-xs text-gray-700 dark:text-zinc-300 outline-none focus:border-[#034350]"
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Department Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="size-9 rounded-lg border border-gray-200 dark:border-zinc-800 cursor-pointer p-1 bg-white dark:bg-[#121212]"
              />
              <div className="flex gap-1.5 flex-wrap">
                {DEPT_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`size-6 rounded-full transition-all ${color === c ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" className="text-xs" onClick={onClose}>Cancel</Button>
          <Button
            size="sm"
            className="text-xs"
            disabled={!isValid}
            onClick={() => {
              onSave({ name: name.trim(), description, head: head.trim(), manager: head.trim(), employeeCount, status, color });
              onClose();
            }}
          >
            {isNew ? "Create Department" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Sub-component: Manage Members Sheet ─────────────────────────────────────

function ManageMembersSheet({
  dept,
  open,
  onClose,
  onSave,
}: {
  dept: DepartmentSetting | null;
  open: boolean;
  onClose: () => void;
  onSave: (memberIds: string[]) => void;
}) {
  const [memberIds, setMemberIds] = useState<string[]>(dept?.memberIds ?? []);
  const [search, setSearch] = useState("");

  // Reset when dept changes
  useEffect(() => {
    setMemberIds(dept?.memberIds ?? []);
    setSearch("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dept?.id]);

  const available = useMemo(
    () => mockEmployees.filter((e) => !memberIds.includes(e.id) && e.name.toLowerCase().includes(search.toLowerCase())),
    [memberIds, search],
  );
  const members = mockEmployees.filter((e) => memberIds.includes(e.id));
  const color = dept?.color ?? "#034350";

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-2xl dark:bg-[#121212] p-0 flex flex-col" showClose={false}>
        <SheetTitle className="sr-only">Manage Members</SheetTitle>
        <SheetDescription className="sr-only">Add or remove members from {dept?.name}</SheetDescription>

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-zinc-800">
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-zinc-100">Manage Members</h2>
            <p className="text-[11px] text-gray-400 dark:text-zinc-500">{dept?.name} · {memberIds.length} members</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 grid sm:grid-cols-2 divide-x divide-gray-100 dark:divide-zinc-800 overflow-hidden">
          {/* Left — Available */}
          <div className="flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
              <p className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 mb-2">Available Employees</p>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search employees..."
                  className="pl-8 text-xs h-8"
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-1">
                {available.length === 0 && (
                  <p className="text-center text-xs text-gray-400 dark:text-zinc-500 py-8">No employees available</p>
                )}
                {available.map((emp) => (
                  <div key={emp.id} className="flex items-center gap-2.5 rounded-xl p-2.5 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors group">
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback className="text-[10px]" style={{ backgroundColor: color }}>
                        {emp.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-900 dark:text-zinc-100 truncate">{emp.name}</p>
                      <p className="text-[10px] text-gray-400 dark:text-zinc-500 truncate">{emp.role}</p>
                    </div>
                    <button
                      onClick={() => setMemberIds((prev) => [...prev, emp.id])}
                      className="shrink-0 size-6 flex items-center justify-center rounded-full bg-[#034350]/10 text-[#034350] dark:bg-[#4da8b5]/10 dark:text-[#4da8b5] hover:bg-[#034350]/20 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right — Members */}
          <div className="flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
              <p className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Department Members</p>
              <p className="text-[10px] text-gray-400 dark:text-zinc-600 mt-0.5">{memberIds.length} assigned</p>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-1">
                {members.length === 0 && (
                  <p className="text-center text-xs text-gray-400 dark:text-zinc-500 py-8">No members yet</p>
                )}
                {members.map((emp) => (
                  <div key={emp.id} className="flex items-center gap-2.5 rounded-xl p-2.5 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors group">
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback className="text-[10px]" style={{ backgroundColor: color }}>
                        {emp.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-900 dark:text-zinc-100 truncate">{emp.name}</p>
                      <p className="text-[10px] text-gray-400 dark:text-zinc-500 truncate">{emp.role}</p>
                    </div>
                    <button
                      onClick={() => setMemberIds((prev) => prev.filter((id) => id !== emp.id))}
                      className="shrink-0 size-6 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-zinc-800 px-6 py-4 flex gap-2 justify-end">
          <Button variant="outline" size="sm" className="text-xs" onClick={onClose}>Cancel</Button>
          <Button size="sm" className="text-xs" onClick={() => { onSave(memberIds); onClose(); }}>
            Save Members
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Sub-component: Manage Teams Sheet ───────────────────────────────────────

function ManageTeamsSheet({
  dept,
  open,
  onClose,
  onSave,
}: {
  dept: DepartmentSetting | null;
  open: boolean;
  onClose: () => void;
  onSave: (teams: DepartmentTeam[]) => void;
}) {
  const [teams, setTeams] = useState<DepartmentTeam[]>(dept?.teams ?? []);
  const [editingTeam, setEditingTeam] = useState<DepartmentTeam | null>(null);
  const [teamName, setTeamName] = useState("");
  const [teamLead, setTeamLead] = useState("");
  const color = dept?.color ?? "#034350";

  // Reset when dept changes
  useEffect(() => {
    setTeams(dept?.teams ?? []);
    setEditingTeam(null);
    setTeamName("");
    setTeamLead("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dept?.id]);

  const handleAddTeam = () => {
    if (!teamName.trim()) return;
    const newTeam: DepartmentTeam = {
      id: `team_${Date.now()}`,
      name: teamName.trim(),
      lead: teamLead.trim() || "Unassigned",
      memberCount: 0,
    };
    setTeams((prev) => [...prev, newTeam]);
    setTeamName("");
    setTeamLead("");
  };

  const handleSaveEdit = () => {
    if (!editingTeam) return;
    setTeams((prev) => prev.map((t) => (t.id === editingTeam.id ? { ...t, name: teamName, lead: teamLead } : t)));
    setEditingTeam(null);
    setTeamName("");
    setTeamLead("");
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md dark:bg-[#121212] p-0 flex flex-col" showClose={false}>
        <SheetTitle className="sr-only">Manage Teams</SheetTitle>
        <SheetDescription className="sr-only">Manage teams for {dept?.name}</SheetDescription>

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-zinc-800">
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-zinc-100">Manage Teams</h2>
            <p className="text-[11px] text-gray-400 dark:text-zinc-500">{dept?.name} · {teams.length} teams</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <ScrollArea className="flex-1 px-6 py-5">
          <div className="space-y-3">
            {teams.map((team) => (
              <div key={team.id} className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 dark:border-zinc-800 p-3.5">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-gray-900 dark:text-zinc-100">{team.name}</p>
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500">Lead: {team.lead} · {team.memberCount} members</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => {
                      setEditingTeam(team);
                      setTeamName(team.name);
                      setTeamLead(team.lead);
                    }}
                  >
                    <Edit2 className="size-3.5 text-gray-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setTeams((prev) => prev.filter((t) => t.id !== team.id))}
                  >
                    <Trash2 className="size-3.5 text-red-400" />
                  </Button>
                </div>
              </div>
            ))}

            {teams.length === 0 && (
              <p className="text-center text-xs text-gray-400 dark:text-zinc-500 py-6">No teams yet. Add one below.</p>
            )}
          </div>

          {/* Add / Edit form */}
          <div className="mt-5 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-700 p-4 space-y-3">
            <p className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">
              {editingTeam ? "Edit Team" : "Add New Team"}
            </p>
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team name"
              className="text-xs"
            />
            <Input
              value={teamLead}
              onChange={(e) => setTeamLead(e.target.value)}
              placeholder="Team lead name"
              className="text-xs"
            />
            <div className="flex gap-2">
              {editingTeam && (
                <Button variant="outline" size="sm" className="text-xs flex-1" onClick={() => { setEditingTeam(null); setTeamName(""); setTeamLead(""); }}>
                  Cancel
                </Button>
              )}
              <Button
                size="sm"
                className="text-xs flex-1"
                disabled={!teamName.trim()}
                onClick={editingTeam ? handleSaveEdit : handleAddTeam}
                style={{ backgroundColor: color }}
              >
                {editingTeam ? "Save Changes" : <><Plus className="size-3.5" /> Add Team</>}
              </Button>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t border-gray-100 dark:border-zinc-800 px-6 py-4 flex gap-2 justify-end">
          <Button variant="outline" size="sm" className="text-xs" onClick={onClose}>Cancel</Button>
          <Button size="sm" className="text-xs" onClick={() => { onSave(teams); onClose(); }}>
            Save Teams
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Sub-component: Change Head Dialog ───────────────────────────────────────

function ChangeHeadDialog({
  dept,
  open,
  onClose,
  onSave,
}: {
  dept: DepartmentSetting | null;
  open: boolean;
  onClose: () => void;
  onSave: (head: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(dept?.head ?? dept?.manager ?? "");
  const color = dept?.color ?? "#034350";

  // Reset when dept changes
  useEffect(() => {
    setSearch("");
    setSelected(dept?.head ?? dept?.manager ?? "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dept?.id]);

  const filtered = mockEmployees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Department Head</DialogTitle>
          <DialogDescription>Select a new head for {dept?.name}.</DialogDescription>
        </DialogHeader>

        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employees..."
            className="pl-8 text-xs h-8"
          />
        </div>

        <ScrollArea className="h-56">
          <div className="space-y-1 pr-2">
            {filtered.map((emp) => (
              <button
                key={emp.id}
                type="button"
                onClick={() => setSelected(emp.name)}
                className={`w-full flex items-center gap-2.5 rounded-xl p-2.5 text-left transition-colors ${
                  selected === emp.name
                    ? "bg-[#034350]/5 dark:bg-[#4da8b5]/10 ring-1 ring-[#034350]/20"
                    : "hover:bg-gray-50 dark:hover:bg-zinc-900"
                }`}
              >
                <Avatar className="size-8 shrink-0">
                  <AvatarFallback className="text-[10px]" style={{ backgroundColor: color }}>
                    {emp.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-900 dark:text-zinc-100 truncate">{emp.name}</p>
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500 truncate">{emp.role}</p>
                </div>
                {selected === emp.name && (
                  <CheckCircle2 className="size-4 text-[#034350] dark:text-[#4da8b5] ml-auto shrink-0" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" size="sm" className="text-xs" onClick={onClose}>Cancel</Button>
          <Button size="sm" className="text-xs" disabled={!selected} onClick={() => { onSave(selected); onClose(); }}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Sub-component: Archive Confirm Dialog ────────────────────────────────────

function ArchiveDialog({
  dept,
  open,
  onClose,
  onConfirm,
}: {
  dept: DepartmentSetting | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const isArchived = dept?.status === "archived";
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{isArchived ? "Unarchive Department" : "Archive Department"}</DialogTitle>
          <DialogDescription>
            {isArchived
              ? `${dept?.name} will become active again and appear in all active lists.`
              : `${dept?.name} will be preserved in the database but hidden from active lists. You can unarchive it later.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" size="sm" className="text-xs" onClick={onClose}>Cancel</Button>
          <Button size="sm" className="text-xs" onClick={() => { onConfirm(); onClose(); }}>
            {isArchived ? "Unarchive" : "Archive"} Department
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Sub-component: Delete Confirm Dialog ────────────────────────────────────

function DeleteDialog({
  dept,
  open,
  onClose,
  onConfirm,
}: {
  dept: DepartmentSetting | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="size-4" /> Delete Department
          </DialogTitle>
          <DialogDescription>
            <strong className="text-gray-900 dark:text-zinc-100">{dept?.name}</strong> will be permanently deleted.
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" size="sm" className="text-xs" onClick={onClose}>Cancel</Button>
          <Button
            size="sm"
            className="text-xs bg-red-600 hover:bg-red-700 text-white"
            onClick={() => { onConfirm(); onClose(); }}
          >
            <Trash2 className="size-3.5" /> Delete Permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type DeptAction = "view" | "edit" | "members" | "teams" | "head" | "archive" | "delete";

// ─── Main Export ──────────────────────────────────────────────────────────────

interface DepartmentsSectionProps {
  settings: SettingsPayload;
  onChange: (patch: Partial<SettingsPayload>) => void;
}

export function DepartmentsSection({ settings, onChange }: DepartmentsSectionProps) {
  const departments: DepartmentSetting[] = (settings.departments as DepartmentSetting[]) ?? [];
  const [showArchived, setShowArchived] = useState(false);
  const [activeAction, setActiveAction] = useState<DeptAction | null>(null);
  const [selectedDept, setSelectedDept] = useState<DepartmentSetting | null>(null);

  const visible = departments.filter((d) =>
    showArchived ? true : d.status !== "archived",
  );

  const dispatch = (action: DeptAction, dept: DepartmentSetting) => {
    setSelectedDept(dept);
    setActiveAction(action);
  };

  const closeAll = () => {
    setActiveAction(null);
    setSelectedDept(null);
  };

  const updateDept = (id: string, patch: Partial<DepartmentSetting>) => {
    onChange({
      departments: departments.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    });
  };

  const createDept = (patch: Partial<DepartmentSetting>) => {
    const newDept: DepartmentSetting = {
      id: `dept_${Date.now()}`,
      name: patch.name ?? "New Department",
      description: patch.description ?? "",
      manager: patch.manager ?? patch.head ?? "",
      head: patch.head ?? "",
      employeeCount: patch.employeeCount ?? 0,
      teamCount: 0,
      status: patch.status ?? "active",
      color: patch.color ?? "#034350",
      createdDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      assessmentCompletion: 0,
      avgCompatibility: 0,
      memberIds: [],
      teams: [],
      recentActivity: [`${patch.name ?? "Department"} created`],
    };
    onChange({ departments: [...departments, newDept] });
  };

  const deleteDept = (id: string) => {
    onChange({ departments: departments.filter((d) => d.id !== id) });
  };

  const isNewDept = selectedDept?.id?.startsWith("new_");

  return (
    <div className="space-y-5 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Departments & Teams</h3>
          <p className="text-xs text-gray-400 dark:text-zinc-500">
            {departments.filter((d) => d.status !== "archived").length} active
            {departments.some((d) => d.status === "archived") && ` · ${departments.filter((d) => d.status === "archived").length} archived`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {departments.some((d) => d.status === "archived") && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5"
              onClick={() => setShowArchived((v) => !v)}
            >
              <Archive className="size-3.5" />
              {showArchived ? "Hide Archived" : "Show Archived"}
            </Button>
          )}
          <Button
            size="sm"
            className="text-xs gap-1.5 w-full sm:w-auto justify-center"
            onClick={() => {
              setSelectedDept({ id: `new_${Date.now()}`, name: "", employeeCount: 0, manager: "" });
              setActiveAction("edit");
            }}
          >
            <Plus className="size-3.5" />
            Add Department
          </Button>
        </div>
      </div>

      {/* Grid or Empty */}
      {visible.length === 0 ? (
        <EmptyDepartments
          onAdd={() => {
            setSelectedDept({ id: `new_${Date.now()}`, name: "", employeeCount: 0, manager: "" });
            setActiveAction("edit");
          }}
        />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {visible.map((dept) => (
            <DepartmentCard key={dept.id} dept={dept} onAction={dispatch} />
          ))}
        </div>
      )}

      {/* ── Modals & Sheets ── */}

      <ViewDetailsSheet
        dept={selectedDept}
        open={activeAction === "view"}
        onClose={closeAll}
        onEdit={() => setActiveAction("edit")}
        onMembers={() => setActiveAction("members")}
      />

      <EditDepartmentDialog
        dept={selectedDept}
        open={activeAction === "edit"}
        onClose={closeAll}
        onSave={(patch) => {
          if (isNewDept) {
            createDept(patch);
          } else if (selectedDept) {
            updateDept(selectedDept.id, patch);
          }
        }}
      />

      <ManageMembersSheet
        dept={selectedDept}
        open={activeAction === "members"}
        onClose={closeAll}
        onSave={(memberIds) => {
          if (selectedDept) {
            updateDept(selectedDept.id, { memberIds, employeeCount: memberIds.length });
          }
        }}
      />

      <ManageTeamsSheet
        dept={selectedDept}
        open={activeAction === "teams"}
        onClose={closeAll}
        onSave={(teams) => {
          if (selectedDept) {
            updateDept(selectedDept.id, { teams, teamCount: teams.length });
          }
        }}
      />

      <ChangeHeadDialog
        dept={selectedDept}
        open={activeAction === "head"}
        onClose={closeAll}
        onSave={(head) => {
          if (selectedDept) {
            updateDept(selectedDept.id, { head, manager: head });
          }
        }}
      />

      <ArchiveDialog
        dept={selectedDept}
        open={activeAction === "archive"}
        onClose={closeAll}
        onConfirm={() => {
          if (selectedDept) {
            updateDept(selectedDept.id, {
              status: selectedDept.status === "archived" ? "active" : "archived",
            });
          }
        }}
      />

      <DeleteDialog
        dept={selectedDept}
        open={activeAction === "delete"}
        onClose={closeAll}
        onConfirm={() => {
          if (selectedDept) deleteDept(selectedDept.id);
        }}
      />
    </div>
  );
}
