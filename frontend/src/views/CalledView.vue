<template>
  <div class="container-fluid bg-light border rounded-4 p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="text-dark">Lista de Chamados</h2>
      <button class="btn btn-success" @click="openModal">+ Novo Chamado</button>
    </div>

    <div v-if="store.isLoading" class="text-center">
      <p>Carregando chamados...</p>
    </div>
    <div v-else-if="store.error" class="text-danger text-center">
      <p>{{ store.error }}</p>
    </div>
    <div v-else-if="chamados.length === 0" class="text-center">
      <p>Nenhum chamado encontrado.</p>
    </div>
    <div v-else class="table-responsive" style="max-height: 400px; overflow-y: auto;">
      <table class="table table-striped table-hover align-middle text-center bg-white rounded-3 shadow-sm">
        <thead class="table-dark text-light">
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chamado in chamados" :key="chamado.id">
            <td>{{ chamado.id }}</td>
            <td>{{ chamado.title }}</td>
            <td>{{ chamado.priority }}</td>
            <td>{{ chamado.status }}</td>
            <td>
              <button class="btn btn-info btn-sm">Visualizar</button>
              <button class="btn btn-danger btn-sm">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCalledStore, useGetCalled } from "../store/index.js";

const store = useCalledStore();
const storeListCalled = useGetCalled();

const chamados = ref([]);
const title = ref("");
const description = ref("");
const priority = ref("");
const imagens = ref([]);

// LISTA DE CHAMADOS ABERTO PARTE DO CLIENTE //
const useCalledData = () => {
  const loadCalled = async () => {
    try {
      await storeListCalled.getList();
    } catch (error) {
      console.error("Erro ao carregar chamados:", error);
    }
  };
  return {
    chamados: computed(() => storeListCalled.list),
    loadCalled,
  };
};

const { loadCalled } = useCalledData();

onMounted(async () => {
  await loadCalled();
});

// MODAL DE ABERTURA DO CHAMADO
const openModal = () => {
  const modalElement = document.getElementById("novoChamadoModal");
  const modal = new window.bootstrap.Modal(modalElement);
  modal.show();
};

const handleFileChange = (event) => {
  const newFiles = Array.from(event.target.files);
  console.log(newFiles);
  newFiles.forEach((file) => {
    if (
      !imagens.value.some(
        (imagem) => imagem.name === file.name && imagem.size === file.size
      )
    ) {
      imagens.value.push(file);
    }
  });
};

const removeImage = (index) => {
  imagens.value.splice(index, 1);
};

const RegisterCalled = async () => {
  try {
    const payload = {
      title: title.value,
      description: description.value,
      priority: priority.value,
      imagens: imagens.value,
    };

    const result = await store.createCalled(payload);
  } catch (error) {}
};
</script>
