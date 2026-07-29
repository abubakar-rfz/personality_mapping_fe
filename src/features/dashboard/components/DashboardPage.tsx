import { HeroSection } from "@/features/dashboard/components/HeroSection";
import { OrganizationHealth } from "@/features/dashboard/components/OrganizationHealth";
import { AnalyticsCards } from "@/features/dashboard/components/AnalyticsCards";
import { AiInsightCard } from "@/features/dashboard/components/AiInsightCard";
import { WorkforceHealth } from "@/features/dashboard/components/WorkforceHealth";
import { TeamCompatibility } from "@/features/dashboard/components/TeamCompatibility";
import { SkillHeatmap } from "@/features/dashboard/components/SkillHeatmap";
import { PersonalityMatches } from "@/features/dashboard/components/PersonalityMatches";
import { EmployeesAttention } from "@/features/dashboard/components/EmployeesAttention";
import { AiRecommendations } from "@/features/dashboard/components/AiRecommendations";
import { RecentAssessments } from "@/features/dashboard/components/RecentAssessments";

export function DashboardPage() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <OrganizationHealth />
      <AnalyticsCards />
      <AiInsightCard />
      <WorkforceHealth />
      <TeamCompatibility />
      <SkillHeatmap />
      <PersonalityMatches />
      <EmployeesAttention />
      <AiRecommendations />
      <RecentAssessments />
    </div>
  );
}
