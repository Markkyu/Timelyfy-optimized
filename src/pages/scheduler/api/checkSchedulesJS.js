import axios from "axios";
import API from "@api/axios";

const API_URL = import.meta.env.VITE_API_URL;

export default async function checkSchedulesJS(newSchedules) {
  try {
    const { data } = await API.put(
      `${API_URL}/api/schedules/final-check-schedule`,
      newSchedules
    );

    return data;
  } catch (error) {
    console.error(error.message);
    if (error.status === 409) {
      return {
        status: error.status,
        conflicts: error.response.data,
      };
    }
    throw error;
    // return error;
  }
}
