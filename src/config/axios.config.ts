import axios from "axios";

const baseURL = "https://kidskiosk-api.vercel.app/api";

export const axiosInstance = axios.create({
  baseURL,
});

export const axiosFormData = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
