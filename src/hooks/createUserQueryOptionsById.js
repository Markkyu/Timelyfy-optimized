import { queryOptions } from "@tanstack/react-query";
import { getUsers, getUserById } from "@api/usersAPI";

export function createUserQueryOptions() {
  return queryOptions({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });
}

export default function createUserQueryOptionsById(userId) {
  return queryOptions({
    queryKey: ["users", userId],
    queryFn: ({ queryKey }) => getUserById(queryKey[1]),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });
}
