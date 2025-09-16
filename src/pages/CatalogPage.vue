<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'

import ProductCard from '@/components/ProductCard.vue'
import CatalogSidebar from '@/components/CatalogSidebar.vue'
import TagIcon from '@/assets/icons/TagIcon.vue'

const catalogStore = useCatalogStore()
const products = computed(() => catalogStore.products)
const isLoadingProducts = computed(() => catalogStore.isLoadingProducts)
const selectedCategory = ref(null)

async function selectCategory(category) {
  selectedCategory.value = category._id
  await catalogStore.fetchProducts(category._id)
}
onMounted(async () => {
  await catalogStore.fetchCategories()
  if (catalogStore.categories.length > 0) {
    selectCategory(catalogStore.categories[0])
  }
})
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <!-- Категории: не скроллится -->
    <div
      class="shrink-0 flex items-center overflow-x-auto flex-nowrap pb-4 gap-2"
    >
      <button
        v-for="category in catalogStore.categories"
        :key="category._id"
        class="bg-gray-50 border border-gray-300 rounded-lg text-sm whitespace-nowrap px-4 py-2 flex items-center gap-2 font-medium"
        :class="{
          'bg-indigo-200 text-indigo-800 border-indigo-300 border-2':
            selectedCategory === category._id,
        }"
        @click="selectCategory(category)"
      >
        <TagIcon /> {{ category.title }}
      </button>
    </div>

    <!-- Основная зона: слева скроллится только список, справа сайдбар фиксированной ширины -->
    <div class="flex flex-1 min-h-0 w-full">
      <!-- Список товаров: единственный вертикальный скролл -->
      <div class="flex-1 min-w-0 overflow-y-auto pr-2">
        <div class="flex flex-wrap w-full gap-x-1 gap-y-3">
          <ProductCard v-for="item in products" :key="item._id" :item="item" />
        </div>
      </div>

      <!-- Сайдбар: не скроллится -->
      <div class="w-[325px] shrink-0 overflow-y-hidden">
        <CatalogSidebar />
      </div>
    </div>
  </div>
</template>
