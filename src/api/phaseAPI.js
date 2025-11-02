import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getPhase = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/phase`);

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
