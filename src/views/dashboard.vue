<script setup lang="ts">
import { throttle } from '../utils/throttle';
import { debounce } from '../utils/debounce';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const auth = useAuthStore();
const router = useRouter();

const text = ref('');

const handleInput = debounce(()=> {
    console.log('inputvalue', text.value);
  },100)

const handleScroll = throttle(() => {
  console.log('Scroll triggered')
}, 1000)

window.addEventListener('scroll', handleScroll)

const logout = () => {
    auth.logout();
    router.push('/login');
}

</script>
<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <input type="text" placeholder="Type something..." v-model="text" @input="handleInput"/>
    <button @click="logout">Logout</button>
    <RouterLink to="/tasks">Go to Tasks View</RouterLink>
  </div>
</template>