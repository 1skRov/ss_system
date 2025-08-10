<script setup>
import { useCatalogStore } from '@/stores/catalogStore';
import ProductCard from "@/components/ProductCard.vue";
import { ref, onMounted } from 'vue';

const catalogStore = useCatalogStore();

onMounted(() => {
  catalogStore.fetchCategories();
});

</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="content h-full w-full">
      <div class="filter flex w-full justify-start items-center overflow-x-auto flex-nowrap pb-4 gap-2">
        <button v-for="category in catalogStore.categories" :key="category._id" class="btn btn-sm"
          :class="{ 'btn-active': selectedCategory === category.title }" @click="selectCategory(category)">
          {{ category.title }}
        </button>
      </div>
      <div v-if="isLoadingProducts">Загрузка продуктов...</div>
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <ProductCard v-for="item in products" :key="item._id" :item="item"
          :initial-quantity="cartStore.products.find(p => p.id === item._id)?.quantity || 0"
          @update:quantity="handleQuantityUpdate" />
      </div>
    </div>
  </div>
</template>