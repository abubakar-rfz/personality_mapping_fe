import { ArrowRight } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Badge } from "@/components/atoms/badge";
import { Card, CardContent } from "@/components/atoms/card";
import { personalityMatches } from "@/features/dashboard/data/dashboard.data";

export function PersonalityMatches() {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-900">
        Personality Matches
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {personalityMatches.map((match) => (
          <Card
            key={match.name}
            className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="flex items-center gap-4 p-5">
              <Avatar className="size-10">
                <AvatarFallback className="bg-[#034350] text-xs text-white">
                  {match.initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {match.name}
                  </h3>
                  <Badge variant="secondary" className="text-[#034350]">
                    {match.matchPercentage}%
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-500">
                  <span>
                    Best Match{" "}
                    <span className="font-medium text-gray-700">
                      {match.bestMatchTeam}
                    </span>
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span>
                    Client{" "}
                    <span className="font-medium text-gray-700">
                      {match.recommendedClient}
                    </span>
                  </span>
                </div>
              </div>

              <ArrowRight className="size-4 shrink-0 text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
