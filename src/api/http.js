import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";

const http = axios.create({
  baseURL: "https://demo.eldor.kz",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("x-api-token");
  if (token) config.headers["X-Api-Token"] = token;
  return config;
});

http.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      const auth = useAuthStore();
      auth.logout();
      router.replace({ name: "Login" });
    }
    return Promise.reject(error);
  }
);

export default http;
