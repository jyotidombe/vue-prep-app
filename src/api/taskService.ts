// src/api/tasks.ts
import api from './axiosApi'

export const getTasks = () => api.get('/tasks')
export const createTask = (task: any) => api.post('/tasks', task)
export const updateTask = (id: string, task: any) => api.put(`/tasks/${id}`, task)
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`)
