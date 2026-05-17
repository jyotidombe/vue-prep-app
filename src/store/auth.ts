import { defineStore } from 'pinia';
import { loginRequest } from '../api/authService';
import type { User } from '../types/user'

interface authState {
    user: User | null,
}

export const useAuthStore = defineStore('auth', {
    state: (): authState => ({
        user: JSON.parse(localStorage.getItem('user') || 'null')
    }),
    actions: {
        async login(email:string, password:string){
            const user = await loginRequest({email,password})
            if(!user){
                throw new Error('Invalid Credinitals')
            }
            this.user = user;

            localStorage.setItem('user', JSON.stringify(user))
        },

        logout() {
            this.user = null;
            localStorage.removeItem('user');
        }
    },
});