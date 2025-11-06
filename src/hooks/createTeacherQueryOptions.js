import { queryOptions, useQuery } from "@tanstack/react-query";
import { getTeacherById, getTeachers } from "@api/teachersAPI";

export default function createTeacherQueryOptions() {
  return queryOptions({
    queryKey: ["teachers"],
    queryFn: () => getTeachers(),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 60 minutes
    retry: 1,
  });
}

export function useTeacherQueryById(teacherId) {
  return useQuery({
    queryKey: ["teachers", teacherId],
    queryFn: () => getTeacherById(teacherId),
    enabled: !!teacherId,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 60 minutes
    retry: 1,
  });
}
