import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView },
//   { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
