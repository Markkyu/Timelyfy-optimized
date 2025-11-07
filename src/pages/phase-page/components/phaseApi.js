import axios from "axios";
import API from "@api/axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getPhase = async () => {
  try {
    const { data } = await API.get(`${API_URL}/api/phase`);

    return data[0];
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updatePhase = async ({
  phase_id,
  phase_year,
  phase_sem,
  phase_supervisor,
}) => {
  try {
    const { data } = await API.put(`${API_URL}/api/phase/${phase_id}`, {
      phase_year,
      phase_sem,
      phase_supervisor,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
