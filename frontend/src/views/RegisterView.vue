<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const login = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleSubmit = () => {
  authStore.register({ login: login.value, password: password.value });
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">Rejestracja</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="login" type="text" placeholder="Login" class="w-full border p-2 rounded" required />
        <input v-model="password" type="password" placeholder="Hasło" class="w-full border p-2 rounded" required />
        <button type="submit" class="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Zarejestruj</button>
      </form>
      <div class="mt-4 text-center">
        <RouterLink to="/login" class="text-blue-500 text-sm">Masz już konto? Zaloguj się</RouterLink>
      </div>
    </div>
  </div>
</template>