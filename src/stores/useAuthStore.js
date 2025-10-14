import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  login: async (username, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          username,
          password,
        }
      );

      // Expect backend returns: { message: "Login successful", user, token }
      if (res.data.message === "Login successful") {
        set({
          user: res.data.user,
          token: res.data.token,
        });

        // persist user and token
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        // attach token to axios for future requests
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${res.data.token}`;

        return res.data.user;
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      throw err;
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];
  },
}));

export default useAuthStore;

// import { create } from "zustand";
// import axios from "axios";

// const useAuthStore = create((set) => ({
//   user: JSON.parse(localStorage.getItem("user")) || null,

//   login: async (username, password) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/login`,
//         {
//           username,
//           password,
//         }
//       );

//       if (res.data.message === "Login successful") {
//         set({ user: res.data.user });
//         localStorage.setItem("user", JSON.stringify(res.data.user)); // persist user
//         return res.data.user;
//       } else {
//         throw new Error(res.data.message);
//       }
//     } catch (err) {
//       throw err;
//     }
//   },

//   logout: () => {
//     set({ user: null });
//     localStorage.removeItem("user");
//   },
// }));

// export default useAuthStore;
