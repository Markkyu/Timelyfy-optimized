// import axios from "axios";

// export const getCourses = async () => {
//   const { data, error } = await axios.get(
//     `${import.meta.env.VITE_API_URL}/api/courses`
//   );
//   if (error) throw new Error(error);
//   return data;
// };

// export const assignTeacherCourse = async (courseData) => {
//   const { data, error } = await axios.put(
//     `${import.meta.env.VITE_API_URL}/api/courses/assign/${courseData.course_id}`,
//     courseData
//   );
//   if (error) throw new Error(error);
//   return data;
// };

import axios from "axios";

export const getCourses = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/courses`
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const assignTeacherCourse = async (courseData) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/courses/assign/${courseData.course_id}`,
      courseData
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
