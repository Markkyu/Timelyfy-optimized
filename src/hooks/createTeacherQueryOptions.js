import { queryOptions, useQuery } from "@tanstack/react-query";
import { getTeacherById, getTeachers } from "@api/teachersAPI";

export default function createTeacherQueryOptions() {
  return queryOptions({
    queryKey: ["teacher"],
    queryFn: () => getTeachers(),
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 20, // 20 minutes
  });
}

export function useTeacherQueryById(teacherId) {
  return useQuery({
    queryKey: ["teacher", teacherId],
    queryFn: () => getTeacherById(teacherId),
    staleTime: 1000 * 60 * 10, // 5 minutes
    retry: 1,
  });
}
