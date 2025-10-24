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

async function selectCategory(category) {
  await catalogStore.setSelectedCategory(category._id)
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
      </div>
      <div class="w-[420px] shrink-0 overflow-y-hidden">
        <CatalogSidebar />
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
