import { defineStore } from 'pinia'
import api from '../api/axiosApi'
import type { User } from '../types/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const res = await api.get('/users')
        this.users = res.data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async deleteUser(id: string) {
      await api.delete(`/users/${id}`)
      this.users = this.users.filter(u => u.id !== id)
    },

    async updateUser(id: string, data: Partial<User>) {
      const res = await api.patch(`/users/${id}`, data)

      const index = this.users.findIndex(u => u.id === id)
      if (index !== -1) {
        this.users[index] = res.data
      }
    }
  }
})