import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    name: 'Acessar', 
    component: () => import('../views/Acessar.vue') 
  },
  { 
    path: '/cadastro', 
    name: 'Cadastrar', 
    component: () => import('../views/Cadastro.vue') 
  },
  { 
    path: '/painel', 
    name: 'Painel', 
    component: () => import('../views/Painel.vue'),
     meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  console.log(token, 'Store');
  
  if (to.meta.requiresAuth && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;
