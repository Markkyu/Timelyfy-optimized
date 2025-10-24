import { getColleges } from "@api/collegesAPI";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const getColleges = async () => {
//   const { data, error } = await axios.get(
//     `${import.meta.env.VITE_API_URL}/api/colleges`
//   );
//   if (error) throw new Error(error);
//   return data;
// };

export default function useColleges() {
  return useQuery({
    queryKey: ["colleges"],
    queryFn: getColleges,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 0,
  });
}
