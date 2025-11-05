import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCollegeById, getColleges } from "@api/collegesAPI";

export default function createCollegeQueryOptions() {
  return queryOptions({
    queryKey: ["college"],
    queryFn: () => getColleges(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useCollegeQueryById(collegeId) {
  return useQuery({
    queryKey: ["college", collegeId],
    queryFn: () => getCollegeById(collegeId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 2,
  });
}
