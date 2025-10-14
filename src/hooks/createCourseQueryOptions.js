import { queryOptions } from "@tanstack/react-query";
import { getCourses } from "@api/getCoursesAPI";

export default function createCollegeQueryOptions() {
  return queryOptions({
    queryKey: ["course"],
    queryFn: () => getCourses(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}
