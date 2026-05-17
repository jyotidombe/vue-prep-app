<script setup lang="ts">
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
    auth.logout();
    router.push('/login');
}
</script>
<template>
    <div class="manager-view">
        <h1>Manager View</h1>
    </div>
    <button @click="logout">Logout</button>
</template>