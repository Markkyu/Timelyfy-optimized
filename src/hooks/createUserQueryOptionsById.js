import { queryOptions } from "@tanstack/react-query";
import { getUsers, getUserById } from "@api/usersAPI";

export function createUserQueryOptions() {
  return queryOptions({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
}

export default function createUserQueryOptionsById(userId) {
  return queryOptions({
    queryKey: ["users", userId],
    queryFn: ({ queryKey }) => getUserById(queryKey[1]),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
}
