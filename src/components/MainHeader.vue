<template>
  <header class="flex items-center justify-between px-2 py-1">
    <div
      @click="openModal"
      class="search w-12 h-11 rounded-lg flex items-center justify-center text-white"
    >
      <MagnifyingGLassIcon />
    </div>

    <div class="navbar">
      <router-link to="/table-page" class="nav-item">
        <ListIcon />
        <span>Заказ</span>
      </router-link>
      <router-link to="/catalog" class="nav-item">
        <CatalogIcon />
        <span>Каталог</span>
      </router-link>
      <router-link to="/deferred-products" class="nav-item">
        <BarsDownIcon />
        <span>Отложки</span>
      </router-link>
    </div>

    <button
      @click="handleLogout"
      class="flex items-center gap-3 h-11 text-white"
    >
      <LogoutIcon />
      <span class="mx-1">Jane Doe</span>
    </button>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import CatalogIcon from '@/assets/icons/Catalog.vue'
import ListIcon from '@/assets/icons/List.vue'
import LogoutIcon from '@/assets/icons/LogoutIcon.vue'
import MagnifyingGLassIcon from '@/assets/icons/MagnifyingGLassIcon.vue'
import BarsDownIcon from '@/assets/icons/BarsArrowDownIcon.vue'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  router.push('/login')
  authStore.logout()
}
</script>

<style scoped>
header {
  background-color: var(--color-navy-blue);
}
.search {
  background-color: var(--color-gray);
}
</style>
