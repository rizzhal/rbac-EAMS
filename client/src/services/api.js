import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.RENDER_API_URL || "http://localhost:4000/api",
    timeout: 5000,
    withCredentials: true
})

