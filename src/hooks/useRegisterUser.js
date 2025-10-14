// src/hooks/useRegisterUser.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "@api/registerUser";

export default function useRegisterUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser) => registerUser(newUser),

    onSuccess: () => {
      // Optionally refresh user list after registration
      queryClient.invalidateQueries(["users"]);
    },

    onError: (error) => {
      console.error("Error registering user:", error.message);
    },
  });
}
