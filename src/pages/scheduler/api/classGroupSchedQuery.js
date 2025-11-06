import { queryOptions, useQuery } from "@tanstack/react-query";
import { getClassGroupYearSched } from "./getClassGroupYearSched";

export default function classGroupSchedQuery(classGroup) {
  return queryOptions({
    queryKey: ["class-schedules", classGroup],
    queryFn: () => getClassGroupYearSched(classGroup),
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
