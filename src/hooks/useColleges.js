import { getColleges } from "@api/collegesAPI";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useColleges() {
  return useQuery({
    queryKey: ["colleges"],
    queryFn: getColleges,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 0,
  });
}
