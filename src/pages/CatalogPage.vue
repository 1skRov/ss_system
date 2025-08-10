<script setup>
import { useCatalogStore } from '@/stores/catalogStore';
import ProductCard from "@/components/ProductCard.vue";
import { ref, onMounted, computed } from 'vue';

const catalogStore = useCatalogStore();
const products = computed(() => catalogStore.products);
const isLoadingProducts = computed(() => catalogStore.isLoadingProducts);
const selectedCategory = ref(null);

async function selectCategory(category) {
  selectedCategory.value = category._id;
  await catalogStore.fetchProducts(category._id);
}
onMounted(async () => {
  await catalogStore.fetchCategories();
  if (catalogStore.categories.length > 0) {
    selectCategory(catalogStore.categories[0]);
  }
});

</script>

<template>
  <div class="content h-full w-full">
    <div class="filter flex w-full justify-start items-center overflow-x-auto flex-nowrap pb-4 gap-2">
      <button v-for="category in catalogStore.categories" :key="category._id" class="btn btn-sm"
        style="font-size: 16px;" :class="{ 'btn-active': selectedCategory === category.title }"
        @click="selectCategory(category)">
        {{ category.title }}
      </button>
    </div>
    <div v-if="isLoadingProducts" class="flex justify-center items-center text-primary h-full"><span
        class="loading loading-infinity loading-xl"></span></div>
    <div v-else class="mt-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      <ProductCard v-for="item in products" :key="item._id" :item="item" />
    </div>
  </div>
</template>