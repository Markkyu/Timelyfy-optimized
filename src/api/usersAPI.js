import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/users`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getUserById = async (userId) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/users/${userId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const createUser = async (userId, userData) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/users/${userId}`,
      userData
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const { data } = await axios.put(`${API_URL}/api/users/${userId}`, updates);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const { data } = await axios.delete(`${API_URL}/api/users/${userId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
