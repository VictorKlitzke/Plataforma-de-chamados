<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="min-height: 100vh; background: #f0f0f0;"
  >
    <div
      class="card shadow-sm"
      style="width: 100%; max-width: 400px; border-radius: 15px; background-color: #f0f0f0;"
    >
      <div class="card-body p-4">
        <!-- Título e Descrição -->
        <div class="text-center mb-4">
          <h4 class="card-title fw-bold text-dark">Bem-vindo de volta!</h4>
        </div>

        <!-- Formulário de Login -->
        <DxForm :formData="formData" :labelLocation="'top'" :validationGroup="'loginForm'">
          <DxTextBox
            v-model="formData.username"
            label="Usuário / Email"
            :placeholder="'Digite seu usuário ou e-mail'"
            :isRequired="true"
            :stylingMode="'outlined'"
            style="border-radius: 10px; background-color: #f8f9fa;"
          />
          <DxTextBox
            v-model="formData.password"
            label="Senha"
            :placeholder="'Digite sua senha'"
            :mode="'password'"
            :isRequired="true"
            :stylingMode="'outlined'"
            style="border-radius: 10px; background-color: #f8f9fa;"
          />
        </DxForm>

        <!-- Botão de Login -->
        <DxButton
          text="Entrar"
          class="w-100 fw-bold mt-3 border bg-secondary text-white hover:bg-light"
          @click="handleLogin"
        />

        <div v-if="error" class="mt-3 text-danger text-center">
          <small>{{ error }}</small>
        </div>

        <div class="text-center mt-4">
          <p class="text-muted">
            Esqueceu a senha? <a href="#" class="text-dark fw-bold">Recupere aqui</a>
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
import { DxButton, DxTextBox, DxForm } from "devextreme-vue";

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

<style scoped>
.text-muted {
  color: #666;
}

.text-center a:hover {
  text-decoration: underline;
}
</style>
