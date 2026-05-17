<script setup lang="ts">
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const error = ref('');

const router = useRouter();
const auth = useAuthStore();

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value);

    // Redirect based on role immediately
    switch(auth.user?.role) {
      case 'admin':
        router.push('/admin');
        break;
      case 'manager':
        router.push('/manager');
        break;
      default:
        router.push('/dashboard');
    }
  } catch (err) {
    console.error('Login failed:', err);
    // Show error to user
  }
};

</script>
<template>
    <div class="login-container">
        <h2>Login</h2>
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="handleLogin">Login</button>
        <p v-if="error">{{ error }}</p>
    </div>
</template>