<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="min-height: 100vh; background: #f0f0f0"
  >
    <div
      class="card shadow-sm"
      style="
        width: 100%;
        max-width: 400px;
        border-radius: 15px;
        background-color: #fff;
      "
    >
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <h4 class="card-title fw-bold text-dark">Bem-vindo de volta!</h4>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Usuário</label>
            <input
              v-model="formData.username"
              type="text"
              id="username"
              class="form-control"
              placeholder="Digite seu usuário"
              required
              style="border-radius: 10px; background-color: #f8f9fa"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Senha</label>
            <input
              v-model="formData.password"
              type="password"
              id="password"
              class="form-control"
              placeholder="Digite sua senha"
              required
              style="border-radius: 10px; background-color: #f8f9fa"
            />
          </div>
          <button
            type="submit"
            class="btn rounded btn-secondary w-100 fw-bold mt-3"
            style="border-radius: 10px"
          >
            Entrar
          </button>
        </form>
        <div v-if="error" class="mt-3 text-danger text-center">
          <small>{{ error }}</small>
        </div>
        <div class="text-center mt-4">
          <p class="text-muted">
            Esqueceu a senha?
            <a href="#" class="text-dark fw-bold">Recupere aqui</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../store/auth.js";
import { useRouter } from "vue-router";

const formData = ref({
  username: "",
  password: "",
});
const error = ref("");
const { login } = useAuth();
const router = useRouter();

const handleLogin = async () => {
  try {
    await login(formData.value.username, formData.value.password);
    localStorage.setItem("username", formData.value.username);
    await router.push({ name: "home" });
  } catch (e) {
    error.value = e.message || "Erro ao realizar login";
  }
};
</script>
