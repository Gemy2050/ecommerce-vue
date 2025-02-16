import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://kidskiosk-api.vercel.app/api",
});

export const axiosFormData = axios.create({
  baseURL: "https://kidskiosk-api.vercel.app/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
