<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="min-height: 100vh; background: linear-gradient(to bottom, #272828, #474949); padding: 20px;"
  >
    <div
      class="card shadow-lg"
      style="width: 100%; max-width: 500px; border-radius: 15px; background: #ffffff;"
    >
      <div class="card-body p-5">
        <div class="text-center mb-4">
          <h4 class="fw-bold text-dark">Criar Conta</h4>
          <p class="text-muted">Preencha os campos abaixo para se cadastrar</p>
        </div>

        <form @submit.prevent="handleRegister">
          <!-- Nome Completo -->
          <div class="mb-4">
            <label for="name" class="form-label">Nome Completo</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="name"
              placeholder="Digite seu nome completo"
              required
              style="border-radius: 10px;"
            />
          </div>

          <!-- Senha -->
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

          <!-- Confirmar Senha -->
          <div class="mb-4">
            <label for="confirmPassword" class="form-label">Confirmar Senha</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="Confirme sua senha"
              required
              style="border-radius: 10px;"
            />
          </div>

          <!-- Nome da Empresa -->
          <div class="mb-4">
            <label for="companyName" class="form-label">Nome da Empresa</label>
            <input
              type="text"
              class="form-control"
              id="companyName"
              v-model="companyName"
              placeholder="Digite o nome da sua empresa"
              required
              style="border-radius: 10px;"
            />
          </div>

          <!-- CNPJ -->
          <div class="mb-4">
            <label for="cnpj" class="form-label">CNPJ</label>
            <input
              type="text"
              class="form-control"
              id="cnpj"
              v-model="cnpj"
              placeholder="Digite o CNPJ da sua empresa"
              required
              style="border-radius: 10px;"
            />
          </div>
          <!-- Botão de Cadastro -->
          <button
            type="submit"
            class="btn btn-primary w-100 fw-bold"
            style="border-radius: 10px; background: #4facfe; border: none;"
          >
            Criar Conta
          </button>
        </form>

        <div class="text-center mt-4">
          <p class="text-muted">
            Já tem uma conta?
            <router-link to="/"><button class="btn btn-info text-light fw-bold">Faça login</button></router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const companyName = ref('');
const cnpj = ref('');

const RegisterUser = () => {
  
}

</script>