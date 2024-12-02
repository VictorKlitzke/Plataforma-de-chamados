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
    <div
      v-else
      class="table-responsive"
      style="max-height: 400px; overflow-y: auto"
    >
      <table
        class="table table-striped table-hover align-middle text-center bg-white rounded-3 shadow-sm"
      >
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
          <tr v-if="!called">
            <td colspan="5">Nenhum chamado encontrado.</td>
          </tr>
          <tr v-for="chamado in called" :key="chamado.id">
            <td>{{ chamado.id }}</td>
            <td>{{ chamado.title }}</td>
            <td>
              <span
                :class="{
                  'badge bg-dark': chamado.priority === 'Alta',
                  'badge bg-warning text-dark': chamado.priority === 'Média',
                  'badge bg-success': chamado.priority === 'Baixa',
                }"
              >
                {{ chamado.priority }}
              </span>
            </td>
            <td>
              <span
                :class="{
                  'text-success fw-bold': chamado.status === 'Concluído',
                  'text-danger fw-bold': chamado.status === 'Aberto',
                  'text-warning fw-bold': chamado.status === 'Em Andamento',
                }"
              >
                {{ chamado.status }}
              </span>
            </td>
            <td class="d-flex gap-2">
              <button class="btn btn-info btn-sm p-2 w-100">Visualizar</button>
              <button class="btn btn-danger btn-sm p-2 w-100">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div
    class="modal fade"
    id="novoChamadoModal"
    tabindex="-1"
    aria-labelledby="novoChamadoModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="novoChamadoModalLabel">
            Abrir Novo Chamado
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="RegisterCalled">
            <div class="mb-3">
              <label for="titulo" class="form-label">Título</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="title"
                required
              />
            </div>

            <div class="mb-3">
              <label for="descricao" class="form-label">Descrição</label>
              <textarea
                class="form-control"
                id="description"
                v-model="description"
                required
              ></textarea>
            </div>

            <div class="mb-3">
              <label for="imagens" class="form-label"
                >Imagens do problema</label
              >
              <input
                type="file"
                class="form-control"
                id="imagens"
                multiple
                @change="handleFileChange"
                accept="image/*"
              />
              <div v-if="imagens.length > 0" class="mt-3">
                <h6>Imagens selecionadas:</h6>
                <div class="d-flex flex-wrap gap-3">
                  <div
                    v-for="(imagem, index) in imagens"
                    :key="index"
                    class="position-relative"
                    style="width: 120px; height: 120px"
                  >
                    <img
                      :src="imagem.preview"
                      :alt="imagem.name"
                      class="img-thumbnail w-100 h-100"
                      style="object-fit: cover"
                    />
                    <button
                      type="button"
                      class="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                      @click="removeImage(index)"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="prioridade" class="form-label">Prioridade</label>
              <select
                class="form-select"
                id="priority"
                v-model="priority"
                required
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary">Criar Chamado</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCalledStore, useGetCalled } from "../store/index.js";

const store = useCalledStore();
const storeListCalled = useGetCalled();

const chamados = ref([]);
const called = ref(null);
const title = ref("");
const description = ref("");
const priority = ref("");
const imagens = ref([]);
const User =
  ref(localStorage.getItem("UserId")|| "Usuário não encontrou o Id") ;
const UserId = User.value;

// LISTA DE CHAMADOS ABERTO PARTE DO CLIENTE //
const loadCalled = async () => {
  try {
    await storeListCalled.getList();
    chamados.value = storeListCalled.list;
    called.value = chamados.value.chamados;
  } catch (error) {
    console.error("Erro ao carregar chamados:", error);
  }
};

onMounted(() => {
  loadCalled();
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

// REGISTRAR ABERTURA DE CHAMADOS
const RegisterCalled = async () => {
  try {
    const payload = {
      title: title.value,
      description: description.value,
      priority: priority.value,
      imagens: imagens.value,
      UserId: UserId
    };

    console.log(payload);
    

    const result = await store.createCalled(payload);
  } catch (error) {}
};
</script>
