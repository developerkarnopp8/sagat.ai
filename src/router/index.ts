import { useAuthStore } from '@/store/auth.store';
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
  { 
    path: '/perfil', 
    name: 'Perfil', 
    component: () => import('../views/Perfil.vue'),
    meta: { requiresAuth: true },
  },
  { 
    path: '/conta', 
    name: 'Contas', 
    component: () => import('../views/Contas.vue'),
    meta: { requiresAuth: true },
  },
  { 
    path: '/transferencia', 
    name: 'Transferências', 
    component: () => import('../views/Transferencias.vue'),
    meta: { requiresAuth: true },
  },
  { 
    path: '/declaracoes', 
    name: 'Declarações', 
    component: () => import('../views/Declaracoes.vue'),
    meta: { requiresAuth: true },
  },
  { 
    path: '/:pathMatch(.*)*',
    name: 'Página não encontrada', 
    component: () => import('../views/PaginaNaoExiste.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  const isPublicPage = to.path === '/' || to.path === '/cadastro';
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !isAuthenticated) {
    return next('/');
  }

  if (isAuthenticated && isPublicPage) {
    return next('/painel');
  }

  const defaultTitle = 'Sagat Pay';
  document.title = to.meta.title ? `${defaultTitle} | ${to.meta.title}` : defaultTitle;

  authStore.setLoading(false);
  next();
});


export default router;
