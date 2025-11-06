import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCourses } from "./getCourses";

export default function createCoursesQueryOptions(classGroup, year, semester) {
  return queryOptions({
    queryKey: ["courses", classGroup, year, semester],
    queryFn: () => getCourses(classGroup, year, semester),
    staleTime: 1000 * 60 * 1, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}
