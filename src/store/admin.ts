import {defineStore} from 'pinia';
import { useAuthStore } from "./auth";
import { useTaskStore } from "./task";
import { useUserStore } from './user';

export const useAdminStore = defineStore('admin',{
    getters:{
        currentUser:() => {
            const authStore = useAuthStore();
            return authStore.user;
        },

        isAdmin:() => {
            const authStore = useAuthStore();
            return authStore.user?.role === 'admin'
        },

        users:() => {
            const userStore = useUserStore();
            return userStore.users
        },

        tasks:() => {
            const tasksStore = useTaskStore();
            return tasksStore.tasks
        },

        totalUsers: () => {
            const userStore = useUserStore();
            return userStore.users.length;
        },

        totalTasks: () => {
            const tasksStore = useTaskStore();
            return tasksStore.tasks.length;
        }
    },

    actions:{
        async loadAdminData(){
            const userStore = useUserStore();
            const tasksStore = useTaskStore();
            await Promise.all([
                userStore.fetchUsers(),
                tasksStore.getTasks()
            ]);
        }
    }
})

