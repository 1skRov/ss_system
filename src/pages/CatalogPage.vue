<script setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '@/stores/catalogStore'

import ProductCard from '@/components/ProductCard.vue'
import CatalogSidebar from '@/components/CatalogSidebar.vue'
import TagIcon from '@/assets/icons/TagIcon.vue'

const catalogStore = useCatalogStore()
const { selectedCategory } = storeToRefs(catalogStore)

const products = computed(() => catalogStore.products)
const isLoadingProducts = computed(() => catalogStore.isLoadingProducts)
const currentPage = computed(() => catalogStore.productsCurrentPage)
const totalPages = computed(() => catalogStore.totalPages)

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    if (current > 4) pages.push('...')

    let start = Math.max(2, current - 1)
    let end = Math.min(total - 1, current + 1)

    if (current <= 4) end = 5
    if (current >= total - 3) start = total - 4

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 3) pages.push('...')
    if (total > 1) pages.push(total)
  }

  return Array.from(new Set(pages))
})
async function selectCategory(category) {
  await catalogStore.setSelectedCategory(category._id)
}

async function changePage(page) {
  await catalogStore.changeProductsPage(page)
}
onMounted(async () => {
  await catalogStore.initCatalog()
})
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div
      class="shrink-0 flex items-center overflow-x-auto flex-nowrap pb-2 gap-2"
    >
      <button
        v-for="category in catalogStore.categories"
        :key="category._id"
        class="bg-gray-50 border border-gray-300 rounded-lg text-sm whitespace-nowrap px-4 py-2 flex items-center gap-2 font-medium"
        :class="{
          active: selectedCategory === category._id,
        }"
        @click="selectCategory(category)"
      >
        <TagIcon /> {{ category.title }}
      </button>
    </div>

    <div class="flex flex-1 min-h-0 w-full mt-2">
      <div class="flex-1 min-w-0 overflow-y-auto pr-2">
        <div v-if="isLoadingProducts" class="text-center p-4">
          Загрузка товаров...
        </div>
        <div v-else class="flex flex-wrap w-full gap-3">
          <ProductCard v-for="item in products" :key="item._id" :item="item" />
        </div>
        <div
          v-if="totalPages > 1 && !isLoadingProducts"
          class="flex justify-center mt-5 mb-5"
        >
          <a
            href="#"
            class="flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md transition-colors duration-300 transform"
            :class="{
              'cursor-not-allowed opacity-50': currentPage === 1,
              'hover:bg-blue-100': currentPage !== 1,
            }"
            @click.prevent="changePage(currentPage - 1)"
          >
            Назад
          </a>

          <template v-for="page in visiblePages" :key="page">
            <span
              v-if="page === '...'"
              class="flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md"
              >...</span
            >
            <a
              v-else
              href="#"
              class="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex hover:bg-blue-600 hover:text-white"
              :class="{ 'bg-blue-600 !text-white': currentPage === page }"
              @click.prevent="changePage(page)"
            >
              {{ page }}
            </a>
          </template>

          <a
            href="#"
            class="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md hover:bg-blue-600 hover:text-white"
            :class="{
              'cursor-not-allowed opacity-50': currentPage === totalPages,
              'hover:bg-blue-100': currentPage !== totalPages,
            }"
            @click.prevent="changePage(currentPage + 1)"
          >
            Вперед
          </a>
        </div>
      </div>
      <div class="w-[420px] shrink-0 overflow-y-hidden">
        <!-- <CatalogSidebar /> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.active {
  background: var(--color-gray);
  border: transparent;
  color: white;
  font-weight: 600;
}
</style>
