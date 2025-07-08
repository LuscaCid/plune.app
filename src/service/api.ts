import axios from "axios";
// const isDev = import.meta.env["VITE_DEV"];

const routes = { 
  dev : "http://localhost:4000/v1/api",
  prod : "https://plune.api.com/v1/api"
}
// const route = isDev == "true" ? routes.dev : routes.prod;

export const api = axios.create({
  baseURL : routes.dev
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