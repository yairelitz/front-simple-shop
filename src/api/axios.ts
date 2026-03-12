import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:4001",
  baseURL: "https://simple-4-anp6.onrender.com/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
