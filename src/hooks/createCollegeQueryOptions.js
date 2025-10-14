import { queryOptions } from "@tanstack/react-query";
import { getColleges } from "@api/getCollegesAPI";

export default function createCollegeQueryOptions() {
  return queryOptions({
    queryKey: ["college"],
    queryFn: () => getColleges(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

