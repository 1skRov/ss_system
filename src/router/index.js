import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/MainPage.vue'),
    redirect: '/table-page',
    children: [
      {
        path: '/table-page',
        name: 'TablePage',
        component: () => import('@/pages/TablePage.vue'),
      },
      {
        path: 'catalog',
        name: 'Catalog',
        component: () => import('@/pages/CatalogPage.vue'),
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: "/colors",
    name: "Colors",
    component: () => import('@/pages/ColorsInfoPage.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router