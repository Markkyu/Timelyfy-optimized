import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user_id, newRole }) => {
      const { data } = await axios.put(`${API_URL}/api/users/${user_id}`, {
        assignRole: newRole,
      });
      return data;
    },
    onSuccess: () => {
      // Refresh the user list after update
      queryClient.invalidateQueries(["users"]);
    },
  });
}
