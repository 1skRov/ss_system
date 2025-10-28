<template>
  <header class="flex items-center justify-between px-2 py-1">
    <div class="search" @click="toggleSearch">
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
      class="flex items-center gap-3 h-11 text-white"
      @click="handleLogout"
    >
      <LogoutIcon />
      <span class="mx-1">Выйти</span>
    </button>
  </header>
  <div
    v-if="showSearch"
    class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
    @click.self="toggleSearch"
  >
    <div class="w-[95%] h-screen bg-white rounded-lg">
      <SearchInput @close-search="toggleSearch" />
    </div>
  </div>
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
import SearchInput from '@/components/SearchInput.vue'

const router = useRouter()
const authStore = useAuthStore()
const showSearch = ref(false)

function handleLogout() {
  router.push('/login')
  authStore.logout()
}

function toggleSearch() {
  showSearch.value = !showSearch.value
}
</script>

<style scoped></style>
