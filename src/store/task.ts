import { defineStore } from 'pinia';
import { getTasks } from '../api/taskService';
import type { TaskData } from '../types/task';
import api from '../api/axiosApi';

export const useTaskStore = defineStore('task', {
    state: () =>({
        tasks: [] as TaskData[],
        loading: false,
        error: null as string | null
    }),

    actions:{
        async getTasks(){
            this.loading = true;
            try {
                const res = await getTasks();
                this.tasks = res.data;
            } catch (err: any) {
                this.error = err.message || 'Failed to fetch tasks';
            } finally {
                this.loading = false;
            }
        },

        async createTask(task: Omit<TaskData, 'id'>){
            const res = await api.post('/tasks',task)
            this.tasks.push(res.data)
        },

        async updateTask(id: string, task: Omit<TaskData, 'id'>) {
            //console.log("Updating:", id, task)
            //console.log("typeof id:", typeof id, "id:", id)
           const res = await api.put(`/tasks/${id}`, task);
           const index = this.tasks.findIndex(t => t.id === id);
            if(index !== -1){
                this.tasks[index] = res.data;
            }
        },

        async deleteTask(id: string){
            await api.delete(`/tasks/${id}`);
            this.tasks = this.tasks.filter(t => t.id !== id)
        }
    }
})