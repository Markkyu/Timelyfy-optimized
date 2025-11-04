import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCollegeById, getColleges } from "@api/collegesAPI";

export default function createCollegeQueryOptions() {
  return queryOptions({
    queryKey: ["college"],
    queryFn: () => getColleges(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useCollegeQueryById(collegeId) {
  return useQuery({
    queryKey: ["college", collegeId],
    queryFn: () => getCollegeById(collegeId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
