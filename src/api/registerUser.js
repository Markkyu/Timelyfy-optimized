// src/api/registerUser.js
import axios from "axios";

export const registerUser = async (newUser) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/login/register`,
      newUser
    );
    return data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Registration failed";
    throw new Error(message);
  }
};
