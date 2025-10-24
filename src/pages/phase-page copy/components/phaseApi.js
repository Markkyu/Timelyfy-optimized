import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getPhase = async () => {
  const { data } = await axios.get(`${API_URL}/api/phase`);
  return data[0];
};

export const updatePhase = async ({
  phase_id,
  phase_year,
  phase_sem,
  phase_supervisor,
}) => {
  const { data } = await axios.put(`${API_URL}/api/phase/${phase_id}`, {
    phase_year,
    phase_sem,
    phase_supervisor,
  });
  return data;
};
