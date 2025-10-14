// src/hooks/useDeleteUser.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@api/deleteUser";

export default function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user_id) => deleteUser(user_id),

    onSuccess: () => {
      // Invalidate users query to refresh the list
      queryClient.invalidateQueries(["users"]);
    },

    onError: (error) => {
      console.error("Error deleting user:", error.message);
    },
  });
}
