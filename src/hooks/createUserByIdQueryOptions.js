import { queryOptions, useQuery } from "@tanstack/react-query";
import { getTeacherById, getTeachers } from "@api/teachersAPI";
import { getUserById } from "@api/usersAPI";

export default function createUserByIdQueryOptions() {
  return queryOptions({
    queryKey: ["users"],
    queryFn: () => getUserById(),
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 20, // 20 minutes
  });
}
