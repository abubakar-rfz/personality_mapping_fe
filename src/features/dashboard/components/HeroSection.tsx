"use client";

import { FileText, Play } from "lucide-react";

import { Button } from "@/components/atoms/button";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export function HeroSection() {
  const greeting = getGreeting();

  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100">
          {greeting}, Muhammad 👋
        </h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Welcome back. Your workforce intelligence has generated new insights
          overnight.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline">
          <FileText className="size-4" />
          Generate AI Report
        </Button>
        <Button>
          <Play className="size-4" />
          Start Assessment
        </Button>
      </div>
    </section>
  );
}
