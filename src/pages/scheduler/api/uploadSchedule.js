// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// export default async function uploadSchedule(sched) {
//   const schedules = sched;

//   try {
//     const { data } = await axios.put(`${API_URL}/api/schedules`, schedules);

//     console.log(data);
//   } catch (error) {
//     throw new Error(error.response?.data?.message || error.message);
//   }
// }

import axios from "axios";
import API from "@api/axios";

const API_URL = import.meta.env.VITE_API_URL;

export default async function uploadSchedule(sched) {
  const schedules = sched;

  // console.log(schedules);

  try {
    const { data } = await API.post(`${API_URL}/api/schedules/plot`, schedules);

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
