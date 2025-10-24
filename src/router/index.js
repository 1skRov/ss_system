import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/MainPage.vue'),
    redirect: '/table-page',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/table-page',
        name: 'TablePage',
        component: () => import('@/pages/Tablepage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'catalog',
        name: 'Catalog',
        component: () => import('@/pages/CatalogPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'deferred-products',
        name: 'DeferredProducts',
        component: () => import('@/pages/DeferredProducts.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/select-filial',
    name: 'Filial',
    component: () => import('@/pages/FilialSelection.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((r) => r.meta?.requiresAuth)
  const hasToken = !!localStorage.getItem('x-api-token')
  if (requiresAuth && !hasToken) next({ name: 'Login' })
  else next()
})
export default router
