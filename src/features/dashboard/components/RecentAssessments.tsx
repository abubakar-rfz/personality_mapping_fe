import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { assessmentEvents } from "@/features/dashboard/data/dashboard.data";

export function RecentAssessments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {assessmentEvents.map((event, index) => {
            const Icon = event.icon;
            const isLast = index === assessmentEvents.length - 1;
            return (
              <div key={event.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#034350]/5 dark:bg-[#4da8b5]/10">
                    <Icon className="size-3.5 text-[#034350] dark:text-[#4da8b5]" />
                  </div>
                  {!isLast && <div className="my-1 w-px flex-1 bg-gray-100 dark:bg-zinc-900" />}
                </div>
                <div className={isLast ? "pb-0" : "pb-6"}>
                  <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500">{event.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
