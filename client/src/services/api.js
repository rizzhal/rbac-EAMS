import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV
        ? "http://localhost:4000/api"
        : "https://eams-itbx.onrender.com/api");

export const api = axios.create({
    baseURL: apiBaseUrl,
    timeout: 5000,
    withCredentials: true
})

