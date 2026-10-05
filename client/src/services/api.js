import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.RENDER_API_URL || 'https://eams-itbx.onrender.com',
    timeout: 5000,
    withCredentials: true
})

