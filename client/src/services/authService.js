import { api } from "./api"



export const signUp = async (userData) => {
    const response = await api.post("/auth/signup" , userData)
    return response.data;
}

export const signIn = async (userData) => {
    const response = await api.post("/auth/signin" , userData)
    return response.data
}

export const logout = async () => {
    const response = await api.post("/auth/logout")
    return response.data;
}

export const getCurrentUser = async () => {
    const response = await api.get("/auth/me");
    return response.data
}