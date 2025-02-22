import axios from "axios";

const baseURL = "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL,
});

export const axiosFormData = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
