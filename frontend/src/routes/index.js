import LoginView from "../views/LoginView.vue";
import HomePage from "../layout/HomePage.vue";
import CalledView from "../views/CalledView.vue";
import DashboardView from "../layout/DashboardView.vue";

import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../store/auth.js";
import ConfigView from "../components/ConfigView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginView,
        meta: { showInSidebar: false },
    },
    {
        path: '/home',
        name: 'home',
        auth: true,
        component: HomePage,
        meta: {showInSidebar: true},
        children: [
            {
                path: '/chamados',
                name: 'chamados',
                auth: true,
                component: CalledView,
                meta: {showInSidebar: true},
            },
            {
                path: '/config',
                name: 'config',
                auth: true,
                component: ConfigView,
                meta: {showInSidebar: true},
            },
        ]
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: { showInSidebar: false },
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const { user } = useAuth();

    if (to.matched.some(record => record.meta.requiresAuth) && !user.value) {
        next('');
    } else {
        next();
    }
});

export default router;
