import { getRoomSchedules, getTeacherSchedules } from "@api/schedulesAPI";
import { queryOptions } from "@tanstack/react-query";

export function teacherSchedulesQuery(teacherId) {
  return queryOptions({
    queryKey: ["teacher-schedule", teacherId],
    queryFn: () => getTeacherSchedules(teacherId),
    enabled: !!teacherId,
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function roomSchedulesQuery(roomId) {
  return queryOptions({
    queryKey: ["room-schedule", roomId],
    queryFn: () => getRoomSchedules(roomId),
    enabled: !!roomId,
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}
