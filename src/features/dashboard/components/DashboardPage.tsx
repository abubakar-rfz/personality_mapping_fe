import { Sparkles } from "lucide-react";

import { PageHeader } from "@/components/molecules/PageHeader";
import { Button } from "@/components/atoms/button";
import { AiInsights } from "@/features/dashboard/components/AiInsights";
import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { RecentAssessments } from "@/features/dashboard/components/RecentAssessments";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Monitor workforce intelligence, track assessments, and act on AI-powered team insights."
        actions={
          <>
            <Button variant="outline">Export Report</Button>
            <Button>
              <Sparkles className="size-4" />
              Ask AI
            </Button>
          </>
        }
      />

      <DashboardStats />

      <section className="grid gap-6 xl:grid-cols-5">
        <RecentAssessments />
        <AiInsights />
      </section>
    </div>
  );
}
