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
            <DxButton
              text="Alterar Foto"
              type="default"
              class="btn-outline-primary btn-sm"
              @click="triggerFileInput"
            />
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
            <DxForm
              :formData="{ newPassword, confirmPassword }"
              labelLocation="top"
              @onSubmit.prevent="updatePassword"
            >
              <div>
                <div class="form-group mb-3 position-relative">
                  <DxTextBox
                    label="Nova Senha"
                    v-model="newPassword"
                    :mode="showNewPassword ? 'text' : 'password'"
                    class="w-100"
                    :validationRules="[
                      {
                        type: 'stringLength',
                        min: 6,
                        message: 'Senha deve ter pelo menos 6 caracteres',
                      },
                    ]"
                  />
                  <span
                    class="position-absolute toggle-password"
                    @click="toggleNewPasswordVisibility"
                  >
                    <i
                      :class="
                        showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                      "
                    ></i>
                  </span>
                </div>

                <!-- Confirmar Nova Senha -->
                <div class="form-group mb-3 position-relative">
                  <DxTextBox
                    label="Confirmar Nova Senha"
                    v-model="confirmPassword"
                    :mode="showConfirmPassword ? 'text' : 'password'"
                    class="w-100"
                    :validationRules="[
                      {
                        type: 'stringLength',
                        min: 6,
                        message: 'Senha deve ter pelo menos 6 caracteres',
                      },
                    ]"
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
              </div>
            </DxForm>
            <DxButton
              text="Alterar Senha"
              type="success"
              class="mt-3"
              :useSubmitBehavior="true"
              @click="updatePassword()"
            />
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
              <DxSwitch
                :value="emailNotifications"
                @update:value="emailNotifications = $event"
              />
            </div>

            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-dark">Notificações por Whatsapp</span>
              <DxSwitch
                :value="zapNotifications"
                @update:value="zapNotifications = $event"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUpdatePassword } from "../store/index.js";
import { DxButton, DxTextBox, DxSwitch, DxForm } from "devextreme-vue";

const storeUpdatePassword = useUpdatePassword();
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
  const update = {
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  };

  console.log(update);

  try {
    await storeUpdatePassword.updatePassword(update);
    onReset();
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
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
