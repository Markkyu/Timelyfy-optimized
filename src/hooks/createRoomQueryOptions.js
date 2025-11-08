import { queryOptions } from "@tanstack/react-query";
import { getRooms, getRoomsByTeacher } from "@api/roomsAPI";

export default function createRoomQueryOptions(teacherId) {
  return queryOptions({
    queryKey: ["room-teacher", teacherId], // cache per teacher
    queryFn: () => getRoomsByTeacher(teacherId),
    enabled: !!teacherId, // run only when teacher is selected
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 5 minutes
    retry: 0,
  });
}

export function allRoomsQuery() {
  return queryOptions({
    queryKey: ["rooms"],
    queryFn: getRooms,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 5 minutes
    retry: 0,
  });
}
