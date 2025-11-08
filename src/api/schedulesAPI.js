import axios from "axios";
import API from "./axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTeacherSchedules = async (teacherId) => {
  try {
    const { data } = await API.get(
      `${API_URL}/api/schedules/teacher/${teacherId}`
    );

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getRoomSchedules = async (roomId) => {
  try {
    const { data } = await API.get(`${API_URL}/api/schedules/room/${roomId}`);

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
