import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUsers = async () => {
  const { data, error } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/users`
  );
  if (error) throw new Error(error);
  return data;
};

export default function useUsers() {
  return useQuery({
    queryKey: ["username"],
    queryFn: getUsers,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 1,
  });
}
