import { useQuery } from "@tanstack/react-query";
import API from "@api/axios";

const getAssignedColleges = async (userId) => {
  const { data } = await API.get(
    `${import.meta.env.VITE_API_URL}/api/assign-colleges/${userId}`
  );
  return data;
};

export default function useAssignedColleges(userId) {
  return useQuery({
    queryKey: ["assigned-colleges", userId],
    queryFn: () => getAssignedColleges(userId),
    enabled: !!userId,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
