<script setup>
import { useCatalogStore } from '@/stores/catalog';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/store/authStore';
import ProductCard from "@/components/ProductCard.vue";
import { ref, onMounted } from 'vue';

const catalogStore = useCatalogStore();
const cartStore = useCartStore();
const authStore = useAuthStore();

const categories = ref([]);
const selectedCategory = ref('Все');
const products = ref([]);
const isLoadingProducts = ref(false);

onMounted(async () => {
  const response = await authStore.getCategories();
  if (response && response.items) {
    categories.value = [{ _id: 'all', title: 'Все' }, ...response.items];
  }
});

async function selectCategory(category) {
  selectedCategory.value = category.title;

  if (category._id === 'all') {
    products.value = [];
    return;
  }

  isLoadingProducts.value = true;
  try {
    const response = await authStore.getProducts(category._id);
    if (response && response.items) {
      products.value = response.items;
    } else {
      products.value = [];
    }
  } catch (error) {
    console.error("Ошибка при загрузке продуктов:", error);
    products.value = [];
  } finally {
    isLoadingProducts.value = false;
  }
}

function handleQuantityUpdate({ id, quantity }) {
  cartStore.updateProductQuantity(id, quantity);
}

</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="content h-full w-full">
      <div class="filter flex w-full justify-start items-center overflow-x-auto flex-nowrap pb-4 gap-2">
        <button v-for="category in categories" :key="category._id" class="btn"
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