<template>
  <div class="container py-5">
    <!-- Título da Página -->
    <div class="text-center mb-5">
      <h2 class="fw-bold text-secondary">Configurações do Perfil</h2>
      <p class="text-muted">Gerencie sua conta e preferências</p>
    </div>

    <div class="row gy-4">
      <!-- Foto de Perfil -->
      <div class="col-md-4">
        <div class="card text-center shadow-sm">
          <div class="card-body">
            <img
              :src="profilePicture || defaultPicture"
              class="rounded-circle border border-3 border-secondary shadow-sm mb-3"
              alt="Foto de Perfil"
              style="width: 150px; height: 150px; object-fit: cover"
            />
            <h5 class="fw-bold text-secondary">Sua Foto</h5>
            <p class="text-muted">Clique abaixo para alterar</p>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="triggerFileInput"
            >
              Alterar Foto
            </button>
            <input
              type="file"
              id="uploadImage"
              class="form-control d-none"
              accept="image/*"
              @change="handleImageChange"
            />
          </div>
        </div>
      </div>

      <!-- Alterar Senha -->
      <div class="col-md-8">
        <div style="height: 100%" class="card shadow-sm">
          <div class="card-body">
            <h5 class="fw-bold text-secondary">Alterar Senha</h5>
            <p class="text-muted">
              Atualize sua senha para manter sua conta segura.
            </p>
            <form @submit.prevent="updatePassword">
              <div class="mb-3 position-relative">
                <label for="newPassword" class="form-label">Nova Senha</label>
                <input
                  id="newPassword"
                  type="password"
                  :type="showNewPassword ? 'text' : 'password'"
                  class="form-control"
                  v-model="newPassword"
                  placeholder="Digite a nova senha"
                />
                <span
                  class="position-absolute toggle-password"
                  @click="toggleNewPasswordVisibility"
                >
                  <i
                    :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  ></i>
                </span>
              </div>

              <div class="mb-3 position-relative">
                <label for="confirmPassword" class="form-label"
                  >Confirmar Nova Senha</label
                >
                <input
                  id="confirmPassword"
                  type="password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-control"
                  v-model="confirmPassword"
                  placeholder="Confirme a nova senha"
                />
                <span
                  class="position-absolute toggle-password"
                  @click="toggleConfirmPasswordVisibility"
                >
                  <i
                    :class="
                      showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                    "
                  ></i>
                </span>
              </div>

              <button class="btn btn-success w-100" type="submit">
                Alterar Senha
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Configurações Gerais -->
      <div class="col-md-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="fw-bold text-secondary">Configurações Gerais</h5>
            <p class="text-muted">Personalize suas preferências.</p>

            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-dark">Notificações por E-mail</span>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="emailNotifications"
                />
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-dark">Notificações por Whatsapp</span>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="zapNotifications"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUpdatePassword } from "../store";

const storePassword = useUpdatePassword();
const newPassword = ref("");
const confirmPassword = ref("");
const emailNotifications = ref(false);
const zapNotifications = ref(true);
const defaultPicture = ref("img/user.png");
const profilePicture = ref("");
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const toggleNewPasswordVisibility = () => {
  showNewPassword.value = !showNewPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const triggerFileInput = () => {
  document.getElementById("uploadImage").click();
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePicture.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const updatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("As senhas não coincidem!");
    return;
  }

  const update = {
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  };

  try {
    await storePassword.updatePassword(update);
    alert("Senha alterada com sucesso!");
    onReset();
  } catch (error) {
    console.error("Erro ao atualizar a senha:", error.message || error);
    alert("Erro ao atualizar a senha. Tente novamente.");
  }
};

const onReset = () => {
  newPassword.value = "";
  confirmPassword.value = "";
};
</script>

<style scoped>
.toggle-password {
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6c757d;
  font-size: 1rem;
}

.toggle-password:hover {
  color: #495057;
}
</style>
