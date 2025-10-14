import axios from "axios";

export const getColleges = async () => {
  const { data, error } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/colleges`
  );
  if (error) throw new Error(error);
  return data;
};

export const createCollege = async (collegeData) => {
  const { data, error } = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/colleges`,
    collegeData
  );
  if (error) throw new Error(error);
  return data;
};

export const updateCollege = async (collegeId, updates) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/colleges/${collegeId}`,
    updates
  );
  return data;
};

export const deleteCollege = async (collegeId) => {
  const { data, error } = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/colleges/${collegeId}`
  );
  if (error) throw new Error(error);
  return data;
};
