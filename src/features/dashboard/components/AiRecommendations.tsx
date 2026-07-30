"use client";

import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { aiRecommendations } from "@/features/dashboard/data/dashboard.data";

export function AiRecommendations() {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
        AI Recommendations
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aiRecommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <Card
              key={rec.title}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#034350]/5 dark:bg-[#4da8b5]/10">
                    <Icon className="size-4 text-[#034350] dark:text-[#4da8b5]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
                      {rec.title}
                    </h3>
                    <Badge variant="secondary" className="mt-1.5 text-[#034350] dark:text-[#4da8b5]">
                      {rec.confidence}% confidence
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs">
                  Take Action
                  <ArrowRight className="size-3" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
