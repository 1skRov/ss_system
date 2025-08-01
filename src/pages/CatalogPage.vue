<script setup>
import { useCatalogStore } from '@/stores/catalog';
import { useCartStore } from '@/stores/cart';
import ProductCard from "@/components/ProductCard.vue";
import { ref } from 'vue';

const catalogStore = useCatalogStore();
const cartStore = useCartStore();

const selectedItems = ref({});

function handleQuantityUpdate({ itemId, quantity }) {
  const item = catalogStore.products.find(i => i.id === itemId);
  if (item) {
    cartStore.addProduct({ ...item, quantity: quantity, discount: 0, discountType: 'percent' });
  }
}

</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="content h-full w-full">
      <div class="filter flex w-full justify-start items-center overflow-x-auto flex-nowrap pb-4 gap-2">
        <button v-for="category in catalogStore.categories" :key="category" class="btn"
          :class="{ 'btn-active': catalogStore.selectedCategory === category }"
          @click="catalogStore.selectCategory(category)">
          {{ category }}
        </button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <ProductCard v-for="item in catalogStore.filteredProducts" :key="item.id" :item="item"
          :initial-quantity="cartStore.products.find(p => p.id === item.id)?.quantity || 0"
          @update:quantity="handleQuantityUpdate" />
      </div>
    </div>
  </div>
</template>