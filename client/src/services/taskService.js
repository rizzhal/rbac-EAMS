import { api } from "./api"


export const createTask = async (taskData) => {
    const response = await api.post("/task" , taskData)
    return response.data;
}

export const getTasks = async () => {
    const response = await api.get("/task")
    return response.data
}

export const updateTaskStatus = async (taskId , status) => {
    const response = await api.patch(`/task/${taskId}` , {status})
    return response.data;
}

export const getEmployees = async () => {
    const response = await api.get('/task/employees') 
    return response.data
}