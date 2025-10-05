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

  <!-- <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modalOpen"
      class="fixed inset-0 z-10 overflow-y-auto bg-black/50 bg-opacity-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-center justify-center min-h-screen min-w-screen p-2"
      >
        <SearchDrawer @close="closeModal" />
      </div>
    </div>
  </Transition> -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import SearchDrawer from '@/components/SearchDrawer.vue'
import CatalogIcon from '@/assets/icons/Catalog.vue'
import ListIcon from '@/assets/icons/List.vue'
import LogoutIcon from '@/assets/icons/LogoutIcon.vue'
import MagnifyingGLassIcon from '@/assets/icons/MagnifyingGLassIcon.vue'
import BarsDownIcon from '@/assets/icons/BarsArrowDownIcon.vue'

const router = useRouter()
const authStore = useAuthStore()
const dropdownOpen = ref(false)
const modalOpen = ref(false)

function handleLogout() {
  authStore.logout()
  router.push('/login')
  dropdownOpen.value = false
}

function closeModal() {
  modalOpen.value = false
}

function openModal() {
  modalOpen.value = true
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
