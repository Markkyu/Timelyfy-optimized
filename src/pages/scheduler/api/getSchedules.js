import axios from "axios";
import API from "@api/axios";

const API_URL = import.meta.env.VITE_API_URL;

export default async function getSchedules(classGroup, year, sem) {
  try {
    const { data } = await API.get(
      `${API_URL}/api/schedules/${classGroup}/filter?year=${year}&sem=${sem}`
    );

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
