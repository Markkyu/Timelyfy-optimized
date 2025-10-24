import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// export const getTeachers = async () => {
//   try {
//     const { data } = await axios.get(`${API_URL}/api/courses`);
//     return data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || error.message);
//   }
// };

export const assignTeacherCourse = async (courseData) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/api/courses/assign/${courseData.course_id}`,
      courseData
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getTeachers = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/teachers`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getTeacherById = async (teacherId) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/teachers/${teacherId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const createTeacher = async (teacherData) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/teachers`, teacherData);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateTeacher = async (teacherId, updates) => {
  console.log(`inside`, updates);

  try {
    const { data } = await axios.put(
      `${API_URL}/api/teachers/${teacherId}`,
      updates
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteTeacher = async (teacherId) => {
  try {
    const { data } = await API.delete(`${API_URL}/api/teachers/${teacherId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
