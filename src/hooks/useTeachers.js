import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getTeachers = async () => {
  const { data, error } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/teachers`
  );
  if (error) throw new Error(error);
  return data;
};

export default function useTeachers() {
  return useQuery({
    queryKey: ["teacher"],
    queryFn: getTeachers,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}
