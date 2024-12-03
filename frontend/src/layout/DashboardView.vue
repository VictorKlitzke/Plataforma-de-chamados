<template>
  <div class="container-fluid">
    <h1
      class="text-center mb-4"
      style="color: rgb(85, 85, 85); font-weight: bold"
    >
      Bem-vindo, {{ username }}
    </h1>

    <div class="row g-4">
      <div class="col-lg-3 col-md-6">
        <div
          class="card shadow-lg border-0 h-100"
          style="background-color: rgb(85, 85, 85)"
        >
          <div class="card-body text-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="text-uppercase mb-2">Abertos</h5>
                <h2 class="mb-0">{{ qntChamadosAbertos }}</h2>
              </div>
              <i
                class="fas fa-calendar fa-3x"
                style="color: rgb(255, 153, 51)"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div
          class="card shadow-lg border-0 h-100"
          style="background-color: rgb(85, 85, 85)"
        >
          <div class="card-body text-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="text-uppercase mb-2">Em Andamento</h5>
                <h2 class="mb-0">{{ qntChamadosEmAndamento }}</h2>
              </div>
              <i
                class="fas fa-tasks fa-3x"
                style="color: rgb(255, 153, 51)"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div
          class="card shadow-lg border-0 h-100"
          style="background-color: rgb(85, 85, 85)"
        >
          <div class="card-body text-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="text-uppercase mb-2">Em Análise</h5>
                <h2 class="mb-0">{{ qntChamadosEmAnalise }}</h2>
                <div class="progress mt-3" style="height: 6px">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style="width: 50%; background-color: rgb(255, 153, 51)"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <i
                class="fas fa-clipboard-list fa-3x"
                style="color: rgb(255, 153, 51)"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-6">
        <div
          class="card shadow-lg border-0 h-100"
          style="background-color: rgb(85, 85, 85)"
        >
          <div class="card-body text-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="text-uppercase mb-2">Concluídos</h5>
                <h2 class="mb-0">{{ qntChamadosConcluidos }}</h2>
              </div>
              <i
                class="fas fa-check-circle fa-3x"
                style="color: rgb(255, 153, 51)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const user = ref(localStorage.getItem('username') || 'Usuário Desconhecido');
const username = user.value;
console.log(username);

</script>

<style scoped></style>
