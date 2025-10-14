import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
}

// Add a course + invalidate query
const addCourse = async (courseData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/courses/`,
    courseData
  );
  return data;
};

export function useAddCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCourse,
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries(["courses", variables.course_college]),
    onError: (error) => console.error("Error adding course: ", error),
  });
}

// Edit a teacher in department + invalidate query
const editCourse = async ({ updates }) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/courses`,
    updates
  );
  return data;
};

// Edit Use Query
export function useEditCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editCourse,
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries(["courses", variables.course_college]),
    onError: (error) => console.error("Error editing course:", error),
  });
}

// Delete a course + invalidate query
const deleteCourse = async (courseId) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/courses/${courseId}`
  );
  return { data };
};

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries(["courses", variables.courseId]),
    onError: (error) => console.error("Error deleting course: ", error),
  });
}
