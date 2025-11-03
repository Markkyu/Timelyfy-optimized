import { queryOptions } from "@tanstack/react-query";
import { getRoomsByTeacher } from "@api/roomsAPI";

export default function allRoomsQuery() {
  return queryOptions({
    queryKey: ["rooms"],
    queryFn: () => getRoomsByTeacher(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 5, // 5 minutes
    retry: 0,
  });
}
