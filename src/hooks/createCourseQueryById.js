import { queryOptions } from "@tanstack/react-query";
import { getCourseById } from "@api/coursesAPI";

export default function createCourseQueryById(collegeId) {
  return queryOptions({
    queryKey: ["course", collegeId],
    queryFn: () => getCourseById(collegeId),
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
