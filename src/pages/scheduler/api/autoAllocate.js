// import axios from "axios";

// const API_URL = import.meta.env.VITE_SCHEDULER_API;

// export default async function autoAllocate(courseList) {
//   const queue = courseList;

// try {
//   const { data } = await axios.put(`${API_URL}/update_schedules`, queue);

//   // console.log(data);
//   return data;
// } catch (err) {
//   throw new Error(err);
// }
// }

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default async function autoAllocate(courseList) {
  const newSchedules = courseList;

  try {
    const { data } = await axios.put(
      `${API_URL}/api/schedules/execute-scheduler`,
      newSchedules
    );

    // console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
