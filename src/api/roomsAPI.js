import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getRooms = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/rooms`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getRoomById = async (roomId) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/rooms${roomId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const addRoom = async (details) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/rooms`, details);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateRoom = async (roomId, updates) => {
  try {
    const { data } = await axios.put(`${API_URL}/api/rooms/${roomId}`, updates);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteRoom = async (roomId) => {
  try {
    const { data } = await axios.put(`${API_URL}/api/rooms/${roomId}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
