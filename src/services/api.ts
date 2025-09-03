import { STORAGE_SESSION_KEY } from "@/lib/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: "/api/",
});

api.interceptors.request.use((config) => {
  try {
    if (typeof window !== "undefined") {
      const sessionRaw = window.localStorage.getItem(STORAGE_SESSION_KEY);
      if (sessionRaw) {
        const session = JSON.parse(sessionRaw);
        const token = session?.state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
  } catch {}
  return config;
});
