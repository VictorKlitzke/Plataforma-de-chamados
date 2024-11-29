<template>
  <div class="d-flex flex-column bg-dark text-white p-3" style="width: 250px; height: 100vh;">
    <!-- Título -->
    <h3 class="text-center mb-4">Klitzke Software</h3>

    <!-- Menu -->
    <ul class="nav flex-column">
      <li
          class="nav-item"
          v-for="route in filteredRoutes"
          :key="route.name"
      >
        <!-- Link Principal -->
        <router-link
            v-if="!route.children"
            :to="route.path"
            class="nav-link text-white py-2 px-3 rounded-3 mb-2"
            :class="{
            active: $route.path === route.path,
            'bg-primary': $route.path === route.path,
            'text-light': $route.path === route.path
          }"
        >
          <i
              :class="route.icon + ' me-2'"
              style="font-size: 1.2rem;"
          ></i>
          {{ route.name }}
        </router-link>

        <!-- Dropdown para Rotas com Filhos -->
        <div v-else>
          <router-link
              :to="route.path"
              class="nav-link text-white py-2 px-3 rounded-3 mb-2 d-flex justify-content-between align-items-center"
              :class="{
              active: $route.path === route.path,
              'bg-primary': $route.path === route.path,
              'text-light': $route.path === route.path
            }"
          >
            <div>
              <i
                  :class="route.icon + ' me-2'"
                  style="font-size: 1.2rem;"
              ></i>
              {{ route.name }}
            </div>
            <i class="bi bi-chevron-down"></i>
          </router-link>

          <!-- Submenu -->
          <ul class="nav flex-column ps-3">
            <li
                v-for="childRoute in route.children"
                :key="childRoute.name"
            >
              <router-link
                  :to="childRoute.path"
                  class="nav-link text-white py-2 px-3 rounded-3 mb-1"
                  :class="{
                  active: $route.path === childRoute.path,
                  'bg-info': $route.path === childRoute.path
                }"
              >
                <i
                    :class="childRoute.icon + ' me-2'"
                    style="font-size: 1rem;"
                ></i>
                {{ childRoute.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import router from "../routes/index.js";

const filteredRoutes = computed(() => {
  return router.options.routes
      .filter(route => route.children && route.children.length > 0)
      .map(route => {
        const filteredChildren = route.children.filter(
            child => child.meta?.showInSidebar !== false
        );
        return { ...route, children: filteredChildren };
      })
      .filter(route => route.meta?.showInSidebar !== false);
});
</script>


<style scoped>
.nav-link {
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}
</style>
