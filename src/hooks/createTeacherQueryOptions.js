import { queryOptions, useQuery } from "@tanstack/react-query";
import { getTeacherById, getTeachers } from "@api/teachersAPI";

export default function createTeacherQueryOptions() {
  return queryOptions({
    queryKey: ["teachers"],
    queryFn: () => getTeachers(),
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
}

export function useTeacherQueryById(teacherId) {
  return useQuery({
    queryKey: ["teachers", teacherId],
    queryFn: () => getTeacherById(teacherId),
    enabled: !!teacherId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
}
