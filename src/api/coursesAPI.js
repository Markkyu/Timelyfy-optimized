// import API from "axios";

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
import API from "./axios";

const API_URL = import.meta.env.VITE_API_URL;

// GET COURSE
export const getCourses = async () => {
  try {
    const { data } = await API.get(`${API_URL}/api/courses`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getRecentCourses = async () => {
  try {
    const { data } = await API.get(`${API_URL}/api/courses/recent`);

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET COURSE BY ID => college group
export const getCourseById = async (courseId) => {
  try {
    const { data } = await API.get(`${API_URL}/api/courses/${courseId}`);

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET 5 RECENT COURSES
// export const getCurrentAddedCourse = async () => {
//   try {
//     const { data } = await API.get(`${API_URL}/api/courses/recent`);
//     return data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || error.message);
//   }
// };

// ASSIGN TEACHER TO COURSE
export const assignTeacherCourse = async (courseData) => {
  // console.log(courseData);

  try {
    const { data } = await API.put(
      `${API_URL}/api/courses/assign/${courseData.course_id}`,
      courseData
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ADD COURSE
export const addCourse = async (details) => {
  try {
    const { data } = await API.post(`${API_URL}/api/courses`, details);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// UPDATE COURSE
export const updateCourse = async ({ courseId, updates }) => {
  try {
    const { data } = await API.put(
      `${API_URL}/api/courses/${courseId}`,
      updates
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// DELETE COURSE
export const deleteCourse = async (courseId) => {
  try {
    const { data } = await API.delete(`${API_URL}/api/courses/${courseId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
