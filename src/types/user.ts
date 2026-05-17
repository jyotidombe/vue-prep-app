// src/types/user.ts

export type UserRole = 'admin' | 'user' | 'manager'

export interface User {
  id: string
  email: string
  role: UserRole
}