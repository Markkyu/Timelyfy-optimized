import useSessionStore from "@stores/useSessionStore";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor — attach token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      (error.response?.data?.message === "No Token Provided" ||
        error.response?.data?.message === "Session Expired")
    ) {
      console.log(error);
      const { setSessionExpired } = useSessionStore.getState();
      setSessionExpired(true);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);
