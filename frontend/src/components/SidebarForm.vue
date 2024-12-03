<template>
  <div class="sidebar d-flex flex-column bg-light vh-100">
    <!-- Logo e título -->
    <div class="d-flex align-items-center p-3 border-bottom">
      <i class="bi bi-bootstrap fs-4 text-primary me-2"></i>
      <span class="fs-5 fw-semibold">Sidebar</span>
    </div>

    <!-- Menu principal -->
    <ul class="nav flex-column mt-3">
      <li
        v-for="route in filteredRoutes"
        :key="route.name"
        class="nav-item"
      >
        <router-link
          v-if="!route.children"
          :to="route.path"
          class="nav-link d-flex align-items-center px-3 py-2 text-dark"
          :class="{
            active: $route.path === route.path,
            'bg-primary text-white': $route.path === route.path
          }"
        >
          <i :class="route.icon + ' me-2 fs-5'"></i>
          <span>{{ route.name }}</span>
        </router-link>

        <div v-else>
          <!-- Rotas com submenu -->
          <router-link
            :to="route.path"
            class="nav-link d-flex justify-content-between align-items-center px-3 py-2 text-dark"
            :class="{
              active: $route.path === route.path,
              'bg-primary text-white': $route.path === route.path
            }"
          >
            <div>
              <i :class="route.icon + ' me-2 fs-5'"></i>
              {{ route.name }}
            </div>
            <i class="bi bi-chevron-down"></i>
          </router-link>

          <!-- Submenu -->
          <ul class="nav flex-column ps-4 mt-1">
            <li
              v-for="childRoute in route.children"
              :key="childRoute.name"
              class="nav-item"
            >
              <router-link
                :to="childRoute.path"
                class="nav-link px-3 py-2 text-dark"
                :class="{
                  active: $route.path === childRoute.path,
                  'bg-light text-primary': $route.path === childRoute.path
                }"
              >
                <i :class="childRoute.icon + ' me-2 fs-6'"></i>
                {{ childRoute.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <!-- Usuário no rodapé -->
    <div class="mt-auto border-top p-3">
      <div class="d-flex align-items-center">
        <img
          :src="defaultImage"
          alt="User"
          class="rounded-circle me-2"
        />
        <div>
          <strong>{{ username }}</strong>
          <br />
          <small class="text-muted">Admin</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import router from '../routes/index.js';

const user = ref(localStorage.getItem('username') || 'Usuário Desconhecido');
const username = user.value;
const defaultImage = ref('img/user.png');

const filteredRoutes = computed(() => {
  return router.options.routes
    .filter((route) => route.children && route.children.length > 0)
    .map((route) => {
      const filteredChildren = route.children.filter(
        (child) => child.meta?.showInSidebar !== false
      );
      return { ...route, children: filteredChildren };
    })
    .filter((route) => route.meta?.showInSidebar !== false);
});
</script>

<style scoped>
.sidebar {
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-link {
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
}

.nav-link:hover {
  background-color: rgba(0, 123, 255, 0.1);
  color: #007bff;
}

.nav-link.active {
  background-color: #0d6efd;
  color: #000 !important;
}

.nav-item .bi {
  font-size: 1.2rem;
}

img {
  width: 40px;
  height: 40px;
}
</style>
