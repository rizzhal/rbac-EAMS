import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:4000/api" : "");

if (!apiBaseUrl) {
    throw new Error("VITE_API_BASE_URL must be configured for production builds.");
}

export const api = axios.create({
    baseURL: apiBaseUrl,
    timeout: 5000,
    withCredentials: true
})

