import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API from "@api/axios";

const putAssignedCourse = async (userId) => {
  const { data, error } = await API.put(
    `${import.meta.env.VITE_API_URL}/api/courses/assign/${userId}`,
    updates
  );
  if (error) throw new Error(error);
  return data;
};

export default function useAssignedCourse(userId) {
  return useQuery({
    queryKey: ["courses", userId],
    queryFn: () => putAssignedCourse(userId),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
