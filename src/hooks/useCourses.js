import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCourses = async (college_id) => {
  const { data, error } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/courses/${college_id}`
  );
  if (error) throw new Error(error);
  return data;
};

export default function useCourses(college_id) {
  return useQuery({
    queryKey: ["courses", college_id],
    queryFn: () => getCourses(college_id),
    staleTime: 1000 * 60 * 5, // 30 minutes
    cacheTime: 1000 * 60 * 10, // 1 hour
  });
}
