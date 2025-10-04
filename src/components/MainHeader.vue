<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import SearchDrawer from '@/components/SearchDrawer.vue'
import InputComponent from '@/components/UiComponents/InputComponent.vue'

import CatalogIcon from '@/assets/icons/Catalog.vue'
import ListIcon from '@/assets/icons/List.vue'
import ChevronDownicon from '@/assets/icons/chevronDownicon.vue'
import LogoutIcon from '@/assets/icons/LogoutIcon.vue'
import MagnifyingGLassIcon from '@/assets/icons/MagnifyingGLassIcon.vue'
import SettingIcon from '@/assets/icons/SettingIcon.vue'
import BarsDownIcon from '@/assets/icons/BarsArrowDownIcon.vue'

const router = useRouter()
const authStore = useAuthStore()
const login = ref('')
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
<template>
  <div class="flex items-center px-2 py-1 justify-between shadow bg-white">
    <div @click="openModal">
      <InputComponent
        v-model="login"
        placeholder="Нажмите для поиска"
        input-type="text"
      >
        <template #icon>
          <MagnifyingGLassIcon class="text-gray-400/70" />
        </template>
      </InputComponent>
    </div>

    <div class="flex overflow-hidden border border-gray-200 rounded-lg mx-auto">
      <router-link
        to="/table-page"
        class="head-btn flex items-center gap-3"
        :class="{ active: $route.path === '/table-page' }"
      >
        <ListIcon />
        <span>Заказ</span>
      </router-link>
      <router-link
        to="/catalog"
        class="head-btn flex items-center gap-3"
        :class="{ active: $route.path === '/catalog' }"
      >
        <CatalogIcon />
        <span>Каталог</span>
      </router-link>
      <router-link
        to="/deferred-products"
        class="head-btn flex items-center gap-3"
        :class="{ active: $route.path === '/deferred-products' }"
      >
        <BarsDownIcon />
        <span>Отложки</span>
      </router-link>
    </div>

    <div class="relative inline-block">
      <button
        @click="dropdownOpen = !dropdownOpen"
        class="relative z-10 flex items-center px-2 py-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg"
      >
        <span class="mx-1">Jane Doe</span>
        <ChevronDownicon />
      </button>

      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="opacity-0 scale-90"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-90"
      >
        <div
          v-if="dropdownOpen"
          class="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-lg shadow-xl border border-gray-200"
        >
          <div
            class="flex items-center p-3 text-sm text-gray-800 gap-3 cursor-pointer hover:bg-gray-100"
            @click="handleLogout"
          >
            <logout-icon />
            <p class="text-base m-0">Выйти</p>
          </div>

          <div
            class="flex items-center p-3 text-sm text-gray-800 gap-3 cursor-pointer hover:bg-gray-100"
            @click="dropdownOpen = false"
          >
            <SettingIcon />
            <p class="m-0 text-base">Настройки</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>

  <Transition
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
  </Transition>
</template>

<style scoped lang="scss">
.head-btn {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 500;
  color: black;

  &.active {
    background-color: #f4f7ff;
    color: var(--blue-color);
  }
}
</style>
