import { queryOptions } from "@tanstack/react-query";
import { getCourses } from "@api/coursesAPI";

export default function createCourseQueryOptions() {
  return queryOptions({
    queryKey: ["courses"],
    queryFn: getCourses,
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60, // 60 minutes
  });
}
