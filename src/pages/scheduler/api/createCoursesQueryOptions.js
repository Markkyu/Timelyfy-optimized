import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCourses } from "./getCourses";

export default function createCoursesQueryOptions(classGroup, year, semester) {
  return queryOptions({
    queryKey: ["courses", classGroup, year, semester],
    queryFn: () => getCourses(classGroup, year, semester),
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
