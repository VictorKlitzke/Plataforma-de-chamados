<template>
  <nav class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <i class="bi bi-tools fs-4 me-2"></i>
        <span class="fw-semibold text-white">Plataforma de Chamados</span>
      </a>

      <div class="d-flex align-items-center ms-auto">
        <button class="btn btn-outline-light btn-sm" @click="logout">
          <i class="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// Função para remover dados do Local Storage
const removeStorage = () => {
  localStorage.removeItem('username');
};

// Função de Logout
const logout = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_BASE_URL}logout`, {}, { withCredentials: true });
    removeStorage();
    router.push({ name: 'login' });
  } catch (error) {
    console.error('Erro ao realizar logout:', error.message);
  }
};
</script>

<style scoped>

</style>
