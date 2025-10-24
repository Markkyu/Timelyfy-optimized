import { queryOptions } from "@tanstack/react-query";
import { getTeachers } from "@api/teachersAPI";

export default function createTeacherQueryOptions() {
  return queryOptions({
    queryKey: ["teacher"],
    queryFn: () => getTeachers(),
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 20, // 20 minutes
  });
}
