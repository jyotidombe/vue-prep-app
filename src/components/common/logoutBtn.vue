<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth';

const router = useRouter()
const auth = useAuthStore()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <button class="btn btn-danger" @click="logout">
    Logout
  </button>
</template>