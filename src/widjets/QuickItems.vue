<script setup>
import { ref } from 'vue';
import ProductCard from "@/components/ProductCard.vue";
import { useQuickItemsStore } from '@/stores/quickItems';
import { useCartStore } from '@/stores/cart';

const quickItemsStore = useQuickItemsStore();
const cartStore = useCartStore();

const selectedItems = ref({});

function handleQuantityUpdate({ itemId, quantity }) {
  if (quantity > 0) {
    selectedItems.value[itemId] = quantity;
  } else {
    delete selectedItems.value[itemId];
  }
}

const emit = defineEmits(['close']);

function addItemsToCart() {
  for (const itemId in selectedItems.value) {
    const item = quickItemsStore.items.find(i => i.id === parseInt(itemId));
    const quantity = selectedItems.value[itemId];
    if (item) {
      cartStore.addProduct({ ...item, quantity, discount: 0, discountType: 'percent' });
    }
  }
  closeDrawer();
}

function closeDrawer() {
  emit('close');
}
</script>

<template>
  <div class="relative h-full flex flex-col">
    <div class="flex-1 overflow-y-auto px-2 pt-2">
      <div class="flex flex-wrap gap-3">
        <ProductCard v-for="item in quickItemsStore.items" :key="item.id" :item="item"
          :initial-quantity="selectedItems[item.id] || 0" @update:quantity="handleQuantityUpdate" />
      </div>
    </div>
    <div class="footer-panel bg-base-200 border-t border-base-300 p-3 flex justify-end gap-3">
      <button class="w-1/3 text-xl btn btn-error" @click="closeDrawer">Отменить</button>
      <button class="w-1/3 text-xl btn btn-success" @click="addItemsToCart">Добавить</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer-panel {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
</style>