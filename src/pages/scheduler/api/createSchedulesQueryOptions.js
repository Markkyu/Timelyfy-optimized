import { queryOptions, useQuery } from "@tanstack/react-query";
import getSchedules from "./getSchedules";

export default function createSchedulesQueryOptions(
  classGroup,
  year,
  semester
) {
  return queryOptions({
    queryKey: ["schedules", classGroup, year, semester],
    queryFn: () => getSchedules(classGroup, year, semester),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
    retry: 1,
  });
}
