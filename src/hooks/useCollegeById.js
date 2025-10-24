import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCollegeById = async (collegeId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/colleges/${collegeId}`
  );
  return data;
};

export default function useCollegeById(collegeId) {
  return useQuery({
    queryKey: ["college", collegeId],
    queryFn: () => getCollegeById(collegeId),
    enabled: !!collegeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
