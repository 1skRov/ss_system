import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/MainPage.vue"),
    redirect: "/table-page",
    children: [
      {
        path: "/table-page",
        name: "TablePage",
        component: () => import("@/pages/Tablepage.vue"),
      },
      {
        path: "catalog",
        name: "Catalog",
        component: () => import("@/pages/CatalogPage.vue"),
      },
      // {
      //   path: 'deferred-products',
      //   name: 'DeferredProducts',
      //   component: () => import('@/pages/DeferredProducts.vue'),
      // }
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/colors",
    name: "Colors",
    component: () => import("@/pages/ColorsInfoPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = localStorage.getItem("x-api-token");

  if (to.name !== "Login" && !isAuthenticated) {
    authStore.logout();
    next({ name: "Login" });
  } else {
    next();
  }
});
export default router;
