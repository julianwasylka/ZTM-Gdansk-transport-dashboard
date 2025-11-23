import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '@/api';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const userLogin = ref<string | null>(localStorage.getItem('userLogin'));

  const isAuthenticated = computed(() => !!token.value);

  function setToken(newToken: string, login: string) {
    token.value = newToken;
    userLogin.value = login;
    localStorage.setItem('token', newToken);
    localStorage.setItem('userLogin', login);
  }

  function logout() {
    token.value = null;
    userLogin.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userLogin');
    router.push('/login');
  }

  async function login(credentials: any) {
    const res = await api.post('/login', credentials);
    setToken(res.data.token, credentials.login);
    router.push('/');
  }

  async function register(credentials: any) {
    await api.post('/register', credentials);
    await login(credentials);
  }

  return { token, userLogin, isAuthenticated, login, register, logout };
});