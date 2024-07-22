"use client";

import { getStatsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "./StatsCard";
import { Card, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

function StatsContainer() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCard title="pending jobs" value={data?.pending || 0} />
      <StatsCard title="interviews set" value={data?.interview || 0} />
      <StatsCard title="jobs declined" value={data?.declined || 0} />
    </div>
  );
}

export function StatsLoadingCard() {
  return (
    <Card className="w-[330px] h-[88px]">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
export default StatsContainer;
