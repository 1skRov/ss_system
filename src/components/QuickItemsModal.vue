<script setup>
import { ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
const emit = defineEmits(['close'])
const items = ref([
  { id: 1, title: 'Товар 1', sale_cost: 100, photo: null, amount: 12 },
  { id: 5, title: 'Товар 5', sale_cost: 500, photo: null, amount: 12 },
  { id: 6, title: 'Товар 6', sale_cost: 600, photo: null, amount: 12 },
  { id: 2, title: 'Товар 2', sale_cost: 200, photo: null, amount: 12 },
  { id: 5, title: 'Товар 5', sale_cost: 500, photo: null, amount: 12 },
  { id: 6, title: 'Товар 6', sale_cost: 600, photo: null, amount: 12 },
  { id: 3, title: 'Товар 3', sale_cost: 300, photo: null, amount: 12 },
  { id: 5, title: 'Товар 5', sale_cost: 500, photo: null, amount: 12 },
  { id: 6, title: 'Товар 6', sale_cost: 600, photo: null, amount: 12 },
  { id: 4, title: 'Товар 4', sale_cost: 400, photo: null, amount: 12 },
  { id: 5, title: 'Товар 5', sale_cost: 500, photo: null, amount: 12 },
  { id: 6, title: 'Товар 6', sale_cost: 600, photo: null, amount: null },
  { id: 6, title: 'Товар 6', sale_cost: 600, photo: null, amount: 12 },
  { id: 6, title: 'Товар 6', sale_cost: 600, photo: null, amount: 12 },
  { id: 6, title: 'Товар 6', sale_cost: 600, photo: null, amount: 12 },
  { id: 6, title: 'Товар 6', sale_cost: 600, photo: null, amount: 12 },
])
const closeModal = () => {
  emit('close')
}
</script>
<template>
  <div
    class="w-[90%] bg-white max-h-[90vh] rounded-lg flex flex-col overflow-hidden"
  >
    <h2 class="p-4 text-lg font-semibold border-0 border-b border-gray-300">
      Быстрые товары
    </h2>
    <div
      class="px-4 flex flex-wrap gap-5 overflow-y-auto w-full h-full bg-gray-100 pt-4"
    >
      <ProductCard v-for="item in items" :key="item.id" :item="item" />
    </div>
    <div
      class="flex items-center justify-end gap-5 p-4 border-0 border-t border-gray-300"
    >
      <button
        class="px-4 py-3 text-white rounded-lg"
        style="background: var(--color-black)"
        @click="closeModal"
      >
        Закрыть
      </button>
      <button
        class="px-4 py-3 text-white rounded-lg"
        style="background: var(--color-green)"
        @click="closeModal"
      >
        Добавить в корзину
      </button>
    </div>
  </div>
</template>
