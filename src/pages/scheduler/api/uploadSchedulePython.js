import axios from "axios";
import API from "@api/axios";

const API_URL = "http://127.0.0.1:8000";

export default async function uploadSchedulePython(sched) {
  try {
    const { data } = await API.put(`${API_URL}/final_check_schedule`, sched);

    // console.log(data);
    return data;
  } catch (error) {
    // console.error(error.status);
    if (error.status === 409) {
      return {
        status: error.status,
        conflicts: error.response.data,
      };
    }
    throw error;
  }
}
