"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Shield,
  Calendar,
  MapPin,
  CheckCircle2,
  Key,
  Bell,
  Camera,
  Edit3,
  Award,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { SIDEBAR_USER } from "@/config/sidebar";

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: SIDEBAR_USER.name,
    email: "abubakar@apexenterprises.com",
    phone: "+92 312 1234567",
    role: SIDEBAR_USER.role,
    department: "Executive & AI Steering",
    location: "Islamabad, Pakistan",
    timezone: "UTC+05:00 Islamabad, Karachi",
    joinedDate: "January 2024",
    bio: "Lead Systems Architect & AI Workforce Analyst directing corporate intelligence models and cross-departmental team synchronization.",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile details updated successfully.");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#034350] via-[#055a6b] to-[#4da8b5] p-6 sm:p-10 text-white shadow-xl overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 size-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <Avatar className="size-20 sm:size-24 border-4 border-white/20 shadow-2xl">
                <AvatarFallback className="bg-white/10 text-white text-2xl font-bold backdrop-blur-md">
                  {SIDEBAR_USER.initials}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => toast.info("Avatar update modal opened")}
                className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-white text-[#034350] shadow-md transition-transform hover:scale-110"
              >
                <Camera className="size-4" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{profile.name}</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-xs font-medium text-emerald-200 border border-emerald-400/30">
                  <CheckCircle2 className="size-3" /> Verified Admin
                </span>
              </div>
              <p className="text-sm text-white/80">{profile.role} · {profile.department}</p>
              <p className="text-xs text-white/60 flex items-center gap-1">
                <MapPin className="size-3" /> {profile.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isEditing ? (
              <Button
                onClick={handleSave}
                className="bg-white text-[#034350] hover:bg-white/90 font-semibold shadow-md text-xs px-5 h-10"
              >
                Save Profile
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-xs px-5 h-10 gap-2"
              >
                <Edit3 className="size-3.5" /> Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Personal Info */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-gray-100 dark:border-zinc-800 shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                  <User className="size-4 text-[#034350] dark:text-[#4da8b5]" /> Personal Information
                </h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Full Name</label>
                  <Input
                    disabled={!isEditing}
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      disabled={!isEditing}
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="pl-9 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      disabled={!isEditing}
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="pl-9 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      disabled={!isEditing}
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="pl-9 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Professional Bio</label>
                <textarea
                  disabled={!isEditing}
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] p-3 text-xs text-gray-800 dark:text-zinc-200 outline-none focus:border-[#034350] disabled:bg-gray-50 dark:disabled:bg-zinc-900/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Activity & Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-gray-100 dark:border-zinc-800 p-5 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Award className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">System Role</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-zinc-100">{profile.role}</p>
                </div>
              </div>
            </Card>

            <Card className="border-gray-100 dark:border-zinc-800 p-5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Building className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">Department</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-zinc-100">AI Steering</p>
                </div>
              </div>
            </Card>

            <Card className="border-gray-100 dark:border-zinc-800 p-5 bg-gradient-to-br from-purple-500/5 to-indigo-500/5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">Security Clearance</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-zinc-100">Level 5 (Master)</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column - Security & Quick Actions */}
        <div className="space-y-6">
          <Card className="border-gray-100 dark:border-zinc-800 shadow-sm">
            <CardContent className="p-6 space-y-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-100 border-b border-gray-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
                <Shield className="size-4 text-[#034350] dark:text-[#4da8b5]" /> Account Security
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
                  <div className="flex items-center gap-3">
                    <Key className="size-4 text-gray-500" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-zinc-100">Password</p>
                      <p className="text-[10px] text-gray-400">Last changed 14 days ago</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info("Password update request sent to email.")}
                    className="text-[11px] h-7 px-2.5"
                  >
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
                  <div className="flex items-center gap-3">
                    <Bell className="size-4 text-gray-500" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-zinc-100">2-Factor Auth</p>
                      <p className="text-[10px] text-emerald-600 font-medium">Enabled (Authenticator)</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info("2FA settings opened")}
                    className="text-[11px] h-7 px-2.5"
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-100 dark:border-zinc-800 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                <Calendar className="size-4 text-[#034350] dark:text-[#4da8b5]" /> System Metadata
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-zinc-800">
                  <span className="text-gray-500">Account Created</span>
                  <span className="font-semibold text-gray-900 dark:text-zinc-100">{profile.joinedDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-zinc-800">
                  <span className="text-gray-500">Active Timezone</span>
                  <span className="font-semibold text-gray-900 dark:text-zinc-100">{profile.timezone}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Last Active Session</span>
                  <span className="font-semibold text-emerald-600">Active Now</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
