import { queryOptions } from "@tanstack/react-query";
import { getRoomsByTeacher } from "@api/roomsAPI";

export default function createRoomQueryOptions(teacherId) {
  return queryOptions({
    queryKey: ["room", teacherId], // cache per teacher
    queryFn: () => getRoomsByTeacher(teacherId),
    enabled: !!teacherId, // run only when teacher is selected
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 5, // 5 minutes
    retry: 0,
  });
}
