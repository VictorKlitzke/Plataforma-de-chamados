<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Plataforma de Chamados</a>
      <div class="d-flex">
        <span class="navbar-text me-3"> {{ username }} </span>
        <button class="btn btn-outline-danger" @click="logout">Sair</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(localStorage.getItem('username') || 'Usuário Desconhecido');
const username = user.value;
const router = useRouter();

const logout = () => {
  localStorage.removeItem('username');
  user.value = 'Usuário Desconhecido';
  router.push({ name: 'login' });
};
</script>
