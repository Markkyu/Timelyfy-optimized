// src/api/registerUser.js
import axios from "axios";
import API from "./axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (newUser) => {
  try {
    const { data } = await API.post(`${API_URL}/api/register`, newUser);
    return data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Registration failed";
    throw new Error(message);
  }
};
