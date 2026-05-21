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
  <main class="container min-vh-100 d-flex align-items-center justify-content-center">
    
    <div class="card shadow-lg p-4 border-0 rounded-4 login-card">
      
      <div class="text-center mb-4">
        <h2 class="fw-bold text-primary">Welcome Back</h2>
        <p class="text-muted mb-0">
          Login to continue
        </p>
      </div>

      <form @submit.prevent="handleLogin">

        <!-- Email -->
        <div class="mb-3">
          <label class="form-label fw-semibold">
            Email
          </label>

          <input
            v-model="email"
            type="email"
            class="form-control form-control-lg"
            placeholder="Enter email"
          />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label class="form-label fw-semibold">
            Password
          </label>

          <input
            v-model="password"
            type="password"
            class="form-control form-control-lg"
            placeholder="Enter password"
          />
        </div>

        <!-- Error -->
        <div
          v-if="error"
          class="alert alert-danger"
        >
          {{ error }}
        </div>

        <!-- Button -->
        <div class="d-grid mt-4">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
          >
            Login
          </button>
        </div>

      </form>

    </div>

  </main>
</template>