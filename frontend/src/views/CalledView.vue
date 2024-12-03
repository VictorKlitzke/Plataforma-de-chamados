<template>
  <div class="container-fluid px-4 py-3">
    <!-- Cabeçalho -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="fw-bold text-dark">Lista de Chamados</h2>
      <DxButton
        text="+ Novo Chamado"
        type="success"
        stylingMode="contained"
        class="btn-sm"
        @click="openModal"
      />
    </div>
    <div v-if="store.isLoading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="text-muted mt-2">Carregando chamados...</p>
    </div>
    <div v-else-if="store.error" class="alert alert-danger text-center">
      <strong>Erro:</strong> {{ store.error }}
    </div>
    <div v-else class="bg-white p-4 shadow-sm rounded">
      <DxDataGrid
        :dataSource="called"
        :showBorders="false"
        :columnAutoWidth="true"
        :rowAlternationEnabled="true"
        class="data-grid"
      >
        <DxColumn dataField="id" caption="#" width="50" />
        <DxColumn dataField="title" caption="Título" />
        <DxColumn dataField="priority" caption="Prioridade" />
        <DxColumn dataField="status" caption="Status" />
        <DxColumn caption="Ações" width="150" cellRender="renderActions" />
      </DxDataGrid>
    </div>
  </div>

  <!-- Modal de Novo Chamado -->
  <DxPopup
    :visible.sync="isModalVisible"
    :hideOnOutsideClick="true"
    title="Abrir Novo Chamado"
    width="80%"
    height="60%"
  >
    <div class="d-flex flex-column p-4" style="height: 100%">
      <DxForm @onSubmit="registerCalled" class="flex-grow-1">
        <DxSimpleItem
          dataField="title"
          editorType="dxTextBox"
          :label="{ text: 'Título' }"
          v-model="title"
          class="mb-3"
        />
        <DxSimpleItem
          dataField="description"
          editorType="dxTextArea"
          :editorOptions="{ height: 100 }"
          :label="{ text: 'Descrição' }"
          v-model="description"
          class="mb-3"
        />
        <DxSimpleItem
          dataField="priority"
          editorType="dxSelectBox"
          :label="{ text: 'Prioridade' }"
          :editorOptions="{ items: ['Baixa', 'Média', 'Alta'] }"
          v-model="priority"
          class="mb-3"
        />
        <DxSimpleItem
          dataField="category"
          editorType="dxSelectBox"
          :label="{ text: 'Categoria' }"
          :editorOptions="{
            items: ['Suporte Técnico', 'Erro de Sistema', 'Dúvida'],
          }"
          v-model="category"
          class="mb-3"
        />
        <DxSimpleItem
          dataField="contact"
          editorType="dxTextBox"
          :label="{ text: 'Contato' }"
          v-model="contact"
          class="mb-3"
        />

        <!-- Componente para upload de imagens -->
        <DxSimpleItem
          dataField="images"
          editorType="dxFileUploader"
          :editorOptions="{ multiple: true, accept: 'image/*' }"
          :label="{ text: 'Imagens' }"
          @value-changed="handleFileChange"
          class="mb-3"
        />

        <div v-if="imagens.length > 0" class="mb-3">
          <h5>Imagens carregadas:</h5>
          <ul>
            <li v-for="(file, index) in imagens" :key="index">
              {{ file.name }}
              <button
                @click="removeImage(index)"
                class="btn btn-danger btn-sm ml-2"
              >
                Remover
              </button>
            </li>
          </ul>
        </div>
      </DxForm>
      <DxButton
        text="Criar Chamado"
        type="success"
        :useSubmitBehavior="true"
        ,
        horizontalAlignment="left"
        @click="registerCalled()"
      />
    </div>
  </DxPopup>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import { DxForm, DxSimpleItem, DxButtonItem } from "devextreme-vue/form";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue/button";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import { useCalledStore, useGetCalled } from "../store/index.js";

const store = useCalledStore();
const storeListCalled = useGetCalled();

const chamados = ref([]);
const called = ref(null);
const isModalVisible = ref(false);

const title = ref("");
const description = ref("");
const priority = ref("");
const category = ref("");
const contact = ref("");
const imagens = ref([]);

// Carregar os chamados
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

// Abrir modal
const openModal = () => {
  isModalVisible.value = true;
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

// Registrar chamado
const registerCalled = async () => {
  const payload = {
    title: title.value,
    description: description.value,
    priority: priority.value,
    category: category.value,
    contact: contact.value,
    imagens: imagens.value,
  };

  console.log(payload);

  try {
    await store.createCalled(payload);
    isModalVisible.value = false;
    await loadCalled();
  } catch (error) {
    console.error("Erro ao criar chamado:", error);
  }
};
const renderActions = ({ data }) => {
  return `
    <div class="d-flex justify-content-around">
      <button class="btn btn-outline-primary btn-sm">Editar</button>
      <button class="btn btn-outline-danger btn-sm">Excluir</button>
    </div>
  `;
};
</script>

<style scoped></style>
