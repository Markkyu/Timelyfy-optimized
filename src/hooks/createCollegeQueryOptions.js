import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCollegeById, getColleges } from "@api/collegesAPI";

export default function createCollegeQueryOptions() {
  return queryOptions({
    queryKey: ["colleges"],
    queryFn: () => getColleges(),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}

export function useCollegeQueryById(collegeId) {
  return queryOptions({
    queryKey: ["college", collegeId],
    queryFn: () => getCollegeById(collegeId),
    enabled: !!collegeId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 0,
  });
}
