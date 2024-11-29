<template>
  <div
      class="d-flex justify-content-center align-items-center"
      style="min-height: 100vh; background: linear-gradient(to bottom, #434244, #3a3d42); padding: 20px;"
  >
    <div
        class="card shadow-lg"
        style="width: 100%; max-width: 400px; border-radius: 15px; background: #ffffff;"
    >
      <div class="card-body p-5">
        <div class="text-center mb-4">
          <h4 class="card-title fw-bold text-dark">Bem-vindo de volta!</h4>
          <p class="text-muted">Faça login na sua conta</p>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="username" class="form-label">Usuário</label>
            <input
                type="text"
                class="form-control"
                id="username"
                v-model="username"
                placeholder="Digite seu usuário"
                required
                style="border-radius: 10px;"
            />
          </div>

          <div class="mb-4">
            <label for="password" class="form-label">Senha</label>
            <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                placeholder="Digite sua senha"
                required
                style="border-radius: 10px;"
            />
          </div>

          <button
              type="submit"
              class="btn btn-primary w-100 fw-bold"
              style="border-radius: 10px; background: #2575fc; border: none;"
          >
            Entrar
          </button>
        </form>

        <!-- Mensagem de erro -->
        <div v-if="error" class="mt-3 text-danger text-center">
          <small>{{ error }}</small>
        </div>

        <!-- Opções adicionais -->
        <div class="text-center mt-4">
          <p class="text-muted">Não tem uma conta?</p>
          <router-link to="/register">
          <button
              class="btn btn-outline-primary w-100"
              style="border-radius: 10px;"
              @click="redirectToRegister"
          >
            Cadastre-se
          </button>
          </router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../store/auth.js";
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const error = ref('');
const { login } = useAuth();
const router = useRouter();

const handleLogin = async () => {
  try {
    await login(username.value, password.value);
    localStorage.setItem('username', username.value);
    await router.push({name: 'home'});
  } catch (e) {
    error.value = e.message || 'Erro ao realizar login';
  }
};
</script>
