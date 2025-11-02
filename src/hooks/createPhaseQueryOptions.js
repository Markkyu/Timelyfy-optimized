// export default function createRoomQueryOptions(teacherId) {
//   return queryOptions({
//     queryKey: ["rooms", teacherId], // cache per teacher
//     queryFn: () => getRoomsByTeacher(teacherId),
//     enabled: !!teacherId, // run only when teacher is selected
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     cacheTime: 1000 * 60 * 5, // 5 minutes
//     retry: 0,
//   });
// }

import { queryOptions } from "@tanstack/react-query";
import { getPhase } from "@api/phaseAPI";

export default function createPhaseQueryOptions() {
  return queryOptions({
    queryKey: ["phase"],
    queryFn: getPhase,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
