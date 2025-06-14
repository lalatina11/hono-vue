import AuthView from '@/views/AuthView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SingleExpeditionView from '@/views/SingleExpeditionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView
    },
    {
      path: "/exp/:id",
      name: "auth",
      component: SingleExpeditionView
    }
  ],
})

export default router
