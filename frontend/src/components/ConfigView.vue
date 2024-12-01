<template>
  <div class="container-fluid my-5">
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center mb-4">Meu Perfil</h2>
        <div class="text-center">
          <img
            :src="profilePicture || defaultPicture"
            class="rounded-circle border border-2"
            alt="Foto de Perfil"
            style="width: 150px; height: 150px; object-fit: cover"
          />
          <div class="mt-3">
            <input
              type="file"
              id="uploadImage"
              class="form-control d-none"
              accept="image/*"
              @change="handleImageChange"
            />
            <button class="btn btn-outline-primary" @click="triggerFileInput">
              Alterar Foto
            </button>
          </div>
        </div>
        <div>
          <form @submit.prevent="updatePassword">
            <div class="mb-3">
              <label for="currentPassword" class="form-label"
                >Senha Atual</label
              >
              <input
                type="password"
                id="currentPassword"
                class="form-control"
                v-model="currentPassword"
                required
              />
            </div>
            <div class="mb-3">
              <label for="newPassword" class="form-label">Nova Senha</label>
              <input
                type="password"
                id="newPassword"
                class="form-control"
                v-model="newPassword"
                required
              />
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label"
                >Confirmar Nova Senha</label
              >
              <input
                type="password"
                id="confirmPassword"
                class="form-control"
                v-model="confirmPassword"
                required
              />
            </div>
            <div class="d-grid">
              <button class="btn btn-primary" type="submit">
                Alterar Senha
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const defaultPicture = ref('');
const profilePicture = ref('');

const handleImageChange = () => {
  
}


</script>