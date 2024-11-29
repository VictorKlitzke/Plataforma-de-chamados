<template>
  <div class="container-fluid my-5">
    <div class="row">
      <!-- Área do Perfil -->
      <div class="col-md-6">
        <h2 class="text-center mb-4">Meu Perfil</h2>
        <!-- Foto de Perfil -->
        <div class="text-center mb-5">
          <img
              :src="profilePicture || defaultPicture"
              class="rounded-circle border"
              alt="Foto de Perfil"
              width="180"
              height="180"
          />
          <div class="mt-3">
            <input
                type="file"
                id="uploadImage"
                class="form-control d-none"
                accept="image/*"
                @change="handleImageChange"
            />
            <button
                class="btn btn-outline-primary"
                @click="triggerFileInput"
            >
              Alterar Foto
            </button>
          </div>
        </div>

        <!-- Alteração de Senha -->
        <div>
          <form @submit.prevent="updatePassword">
            <div class="mb-3">
              <label for="currentPassword" class="form-label">Senha Atual</label>
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
              <label for="confirmPassword" class="form-label">Confirmar Nova Senha</label>
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