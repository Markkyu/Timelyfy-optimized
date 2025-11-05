import { getRoomSchedules, getTeacherSchedules } from "@api/schedulesAPI";
import { queryOptions } from "@tanstack/react-query";

export function teacherSchedulesQuery(teacherId) {
  return queryOptions({
    queryKey: ["teacher-schedule", teacherId],
    queryFn: () => getTeacherSchedules(teacherId),
    enabled: !!teacherId,
    staleTime: 1000 * 60 * 2, // 10 minutes
    gcTime: 1000 * 60 * 5, // 20 minutes
  });
}

export function roomSchedulesQuery(roomId) {
  return queryOptions({
    queryKey: ["room-schedule", roomId],
    queryFn: () => getRoomSchedules(roomId),
    enabled: !!roomId,
    staleTime: 1000 * 60 * 2, // 10 minutes
    gcTime: 1000 * 60 * 5, // 20 minutes
  });
}
