import axios from "axios";
import API from "./axios";

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

export const requestChangePassword = async (userId) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/api/users/${userId}/request-change-password`
    );

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const changePassword = async (newPassword) => {
  try {
    const { data } = await API.post("/api/change-password", { newPassword });

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const approvePasswordRequest = async (userId) => {
  try {
    const { data } = await API.put(
      `api/users/${userId}/approve-password-request`
    );
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
