import {defineStore} from 'pinia';
import { useAuthStore } from "./auth";
import { useTaskStore } from "./task";
import { useUserStore } from './user';

const authStore = useAuthStore();
const tasksStore = useTaskStore();
const userStore = useUserStore();

export const useAdminStore = defineStore('admin',{
    getters:{
        currentUser:() => {
            return authStore.user;
        },

        isAdmin:() => {
            return authStore.user?.role === 'admin'
        },

        users:() => {
            return userStore.users
        },

        tasks:() => {
            return tasksStore.tasks
        },

        totalUsers: () => {
            return userStore.users.length;
        },

        totalTasks: () => {
            return tasksStore.tasks.length;
        }
    },

    actions:{
        async loadAdminData(){
            await Promise.all([
                userStore.fetchUsers(),
                tasksStore.getTasks()
            ]);
        }
    }
})

