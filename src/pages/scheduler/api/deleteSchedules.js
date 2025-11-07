import axios from "axios";
import API from "@api/axios";

const API_URL = import.meta.env.VITE_API_URL;

export default async function deleteSchedules(schedules) {
  const courses = schedules;

  try {
    const { data } = await API.post(`${API_URL}/api/schedules/unplot`, courses);

    return data;
  } catch (err) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
