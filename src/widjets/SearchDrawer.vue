<script setup>
import { ref, computed, onMounted } from "vue";
import LoginKeyboard from '@/components/LoginKeyboard.vue';
import { useCatalogStore } from '@/stores/catalogStore';
import ProductCard from "@/components/ProductCard.vue";
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

const emit = defineEmits(['close']);
function handleClose() {
  emit('close');
}

function handleKeyPress(key) {
  if (key === 'BACKSPACE') {
    catalogStore.setSearchTerm(catalogStore.searchTerm.slice(0, -1));
  } else {
    catalogStore.setSearchTerm(catalogStore.searchTerm + key);
  }
}

function handleClear() {
  catalogStore.setSearchTerm('');
}
</script>

<template>
  <div class="flex flex-col w-full h-full justify-between">
    <div class="w-full px-2 py-1.5">
      <input type="text" placeholder="Поиск..." class="input input-sm w-4/5" />
    </div>
    <!-- <div class="filter flex w-full justify-start items-center overflow-x-auto flex-nowrap px-2 pb-2 gap-2">
      <button v-for="category in catalogStore.categories" :key="category._id" class="btn btn-sm"
        style="font-size: 16px;" :class="{ 'btn-active': selectedCategory === category.title }"
        @click="selectCategory(category)">
        {{ category.title }}
      </button>
    </div> -->
    <LoginKeyboard @key-press="handleKeyPress" @clear="handleClear" @close="handleClose" />
  </div>
</template>

<style scoped lang="scss"></style>