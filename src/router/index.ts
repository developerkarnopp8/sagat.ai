import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Acessar', component: () => import('../views/Acessar.vue') },
  { path: '/cadastro', name: 'Cadastrar', component: () => import('../views/Cadastro.vue') },
  { path: '/painel', name: 'Painel', component: () => import('../views/Painel.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
