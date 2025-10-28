<script setup>
import { ref } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'
import ProductCard from '@/components/ProductCard.vue'
import MagnifyingGLassIcon from '@/assets/icons/MagnifyingGLassIcon.vue'
import ShoppingCardIcon from '@/assets/icons/ShoppingCardIcon.vue'
import LoginKeyboard from '@/components/LoginKeyboard.vue'

const emit = defineEmits(['close-search'])
const catalogStore = useCatalogStore()
const searchQuery = ref('')

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    catalogStore.clearSearchResults()
    return
  }

  await catalogStore.searchProducts({ search: searchQuery.value.trim() })
}

const closeResults = () => {
  searchQuery.value = ''
  catalogStore.clearSearchResults()
}
</script>

<template>
  <div class="relative w-full h-full flex flex-col gap-3">
    <div class="w-full flex gap-3 pt-6 px-6 shrink-0">
      <div class="relative flex-1">
        <input
          v-model="searchQuery"
          placeholder="Поиск по названию или штрих-коду..."
          @keydown.enter="handleSearch"
        />
        <button
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          @click="handleSearch"
        >
          <MagnifyingGLassIcon />
        </button>
      </div>
      <button
        class="num-key w-[150px] h-[50px] border-gray-300 border fonr-bold text-white"
        style="background: var(--color-navy-blue)"
        @click="emit('close-search')"
      >
        закрыть
      </button>
    </div>

    <div
      class="w-full overflow-y-auto p-6 flex-1 min-h-0"
      @click.self="closeResults"
    >
      <div v-if="catalogStore.isSearching" class="text-center">Поиск...</div>
      <div
        v-else-if="catalogStore.searchResults.length === 0"
        class="flex flex-col items-center justify-center"
      >
        <ShoppingCardIcon class="text-gray-300"></ShoppingCardIcon>
        <p class="text-center text-gray-500">Тут пусто</p>
      </div>

      <div v-else class="flex flex-wrap gap-3">
        <ProductCard
          v-for="item in catalogStore.searchResults"
          :key="item._id"
          :item="item"
        />
      </div>
    </div>
    <div class="flex justify-end shrink-0">
      <LoginKeyboard
        v-model="searchQuery"
        @submit="handleSearch"
      ></LoginKeyboard>
    </div>
  </div>
</template>
