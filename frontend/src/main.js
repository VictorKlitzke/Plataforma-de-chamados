import { createApp } from 'vue'
import App from './App.vue'
import router from "./routes/index.js";
import { createPinia } from "pinia";

import { useAuth } from "./store/auth.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { createStore } from "vuex";

createApp(App)
    .use(router)
    .use(createStore(useAuth))
    .use(createPinia())
    .mount('#app')
