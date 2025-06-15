import axios from "axios";
const isDev = import.meta.env["VITE_DEV"];

const routes = { 
  dev : "http://localhost:3001",
  prod : "https://plune.api.com/api"
}

export const api = axios.create({
  baseURL : isDev == "true" ? routes.dev : routes.prod
})

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("@plune-app/token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});