import { create } from "zustand";
import API from "../api/axios";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  login: async (username, password) => {
    try {
      const res = await API.post("/api/login", { username, password });

      if (res.data.message === "Login successful") {
        const { user, token } = res.data;

        set({ user, token });

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        return user;
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
}));

export default useAuthStore;

// import { create } from "zustand";
// import axios from "axios";

// const useAuthStore = create((set) => ({
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   token: localStorage.getItem("token") || null,

//   login: async (username, password) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/login`,
//         {
//           username,
//           password,
//         }
//       );

//       // Expect backend returns: { message: "Login successful", user, token }
//       if (res.data.message === "Login successful") {
//         set({
//           user: res.data.user,
//           token: res.data.token,
//         });

//         // persist user and token
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         localStorage.setItem("token", res.data.token);

//         // attach token to axios for future requests
//         axios.defaults.headers.common["Authorization"] =
//           `Bearer ${res.data.token}`;

//         return res.data.user;
//       } else {
//         console.log(res.data);
//         throw new Error(res.data.message);
//       }
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   },

//   logout: () => {
//     set({ user: null, token: null });
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");

//     delete axios.defaults.headers.common["Authorization"];
//   },
// }));

// export default useAuthStore;
