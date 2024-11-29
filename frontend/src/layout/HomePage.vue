<template>
  <div class="d-flex">
    <Sidebar />
    <div class="flex-grow-1">
      <Header />
      <div class="container mt-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from "../components/SidebarForm.vue";
  import Header from "../components/HeaderView.vue";

  export default {
    name: "home",
    components: {
      Sidebar,
      Header
    }
  };
</script>

<style scoped>
  .container {
    padding-left: 20px;
  }
</style>
