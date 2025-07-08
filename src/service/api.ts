import axios from "axios";
// const isDev = import.meta.env["VITE_DEV"];

const routes = { 
  vm : "http://192.109.11.7:4001/v1/api",
  dev : "http://localhost:4000/v1/api",
  prod : "https://plune.api.com/v1/api"
}
// const route = isDev == "true" ? routes.dev : routes.prod;

export const api = axios.create({
  baseURL : routes.vm
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