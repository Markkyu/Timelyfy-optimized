import axios from "axios";
import API from "./axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getColleges = async () => {
  try {
    const { data } = await API.get("/api/colleges");
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// export const getColleges = async () => {
//   try {
//     const { data } = await axios.get(`${API_URL}/api/colleges`);
//     return data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || error.message);
//   }
// };

export const getCollegeById = async (collegeId) => {
  try {
    const { data } = await API.get(`${API_URL}/api/colleges/${collegeId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const createCollege = async (collegeData) => {
  try {
    const { data } = await API.post(`${API_URL}/api/colleges`, collegeData);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateCollege = async (collegeId, updates) => {
  console.log(`inside`, updates);

  try {
    const { data } = await axios.put(
      `${API_URL}/api/colleges/${collegeId}`,
      updates
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteCollege = async (collegeId) => {
  try {
    const { data } = await API.delete(`${API_URL}/api/colleges/${collegeId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// export const deleteCollege = async (collegeId) => {
//   try {
//     const { data } = await axios.delete(`${API_URL}/api/colleges/${collegeId}`);
//     return data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || error.message);
//   }
// };

// I was wrong you cannot destructure error in axios since it doesnt even return error
