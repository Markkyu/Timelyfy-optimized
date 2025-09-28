import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

// Gets teachers list with cache for smooth page transitions
const getTeachersDepartment = async (department) => {
  const { data, error } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/teachers/department/${department}`
  );
  if (error) throw new Error(error);
  return data;
};

// Fetch Use Query
export default function useTeachersDepartment(department) {
  return useQuery({
    queryKey: ["teachers", department],
    queryFn: () => getTeachersDepartment(department),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: 0, // no fetch retries, default: 3 times
  });
}

// Add a Teacher in Department + invalidate query
const addTeachersDepartment = async ({ department, teacher }) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/teachers/department/${department}`,
    teacher
  );
  return data;
};

// Add Use Query
export function useAddTeachersDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTeachersDepartment,
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries(["teachers", variables.department]),
    onError: (error) => console.error("Error adding teachers:", error),
  });
}

// Delete a teacher in department + invalidate query
const deleteTeachersDepartment = async (teacherId) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/teachers/department/${teacherId}`
  );
  return data;
};

// Delete Use Query
export function useDeleteTeachersDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeachersDepartment,
    onSuccess: () => queryClient.invalidateQueries(["teachers"]),
    onError: (error) => console.error("Error deleting teachers:", error),
  });
}

// Edit a teacher in department + invalidate query
const editTeachersDepartment = async ({ teacherId, updates }) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/teachers/department/${teacherId}`,
    updates
  );
  return data;
};

// Edit Use Query
export function useEditTeachersDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTeachersDepartment,
    onSuccess: (_, variables) => queryClient.invalidateQueries(["teachers"]),
    onError: (error) => console.error("Error editing teacher:", error),
  });
}
