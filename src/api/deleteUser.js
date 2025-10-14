// src/api/deleteUser.js
import axios from "axios";

export const deleteUser = async (user_id) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/users/${user_id}`
    );
    return data;
  } catch (error) {
    // Extract readable message
    const message =
      error.response?.data?.message || error.message || "Delete failed";
    throw new Error(message);
  }
};
