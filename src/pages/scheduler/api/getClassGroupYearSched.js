import axios from "axios";
import API from "@api/axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getClassGroupYearSched = async (college_group) => {
  try {
    const { data } = await API.get(
      `${API_URL}/api/schedules/college/${college_group}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
