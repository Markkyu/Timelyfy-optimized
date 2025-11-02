import { queryOptions } from "@tanstack/react-query";
import { getRecentCourses } from "@api/coursesAPI";

export default function recentCourseQuery() {
  return queryOptions({
    queryKey: ["recent_courses"],
    queryFn: getRecentCourses,
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 20, // 20 minutes
  });
}
