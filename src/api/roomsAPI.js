import axios from "axios";
import API from "./axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getRooms = async () => {
  try {
    const { data } = await API.get(`${API_URL}/api/rooms`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET ROOMS FOR SELECTED TEACHER
export const getRoomsByTeacher = async (teacherId) => {
  try {
    const { data } = await API.get(`${API_URL}/api/rooms/teacher/${teacherId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getRoomById = async (roomId) => {
  try {
    const { data } = await API.get(`${API_URL}/api/rooms${roomId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const addRoom = async (details) => {
  try {
    const { data } = await API.post(`${API_URL}/api/rooms`, details);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateRoom = async (roomId, updates) => {
  try {
    const { data } = await API.put(`${API_URL}/api/rooms/${roomId}`, updates);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteRoom = async (roomId) => {
  console.log(roomId);

  try {
    const { data } = await API.delete(`${API_URL}/api/rooms/${roomId}`);

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
