import { queryOptions } from "@tanstack/react-query";
import { getUsers, getUserById } from "@api/usersAPI";

export function createUserQueryOptions() {
  return queryOptions({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30,
  });
}

export default function createUserQueryOptionsById(userId) {
  return queryOptions({
    queryKey: ["users", userId],
    queryFn: ({ queryKey }) => getUserById(queryKey[1]), // ✅ FIXED
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30,
  });
}
