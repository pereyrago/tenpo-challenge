import { STORAGE_SESSION_KEY } from "@/lib/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: "/api/",
});

api.interceptors.request.use((config) => {
  const sessionRaw = localStorage.getItem(STORAGE_SESSION_KEY);
  const session = JSON.parse(String(sessionRaw));
  const token = session?.state?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
