import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getUsers = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/users`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export default function useUsers() {
  return useQuery({
    queryKey: ["username"],
    queryFn: getUsers,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 0,
  });
}

const getUserById = async (userId) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/users/${userId}`
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export function useUsersById(userId) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
