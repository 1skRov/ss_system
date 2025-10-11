<script setup>
import Image from '@/assets/icons/Image.vue'
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
const orderStore = useOrderStore()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const isInStock = computed(() => props.item.amount > 0)

function addToCart() {
  if (!isInStock.value) {
    return
  }
  orderStore.addProduct(props.item, 1)
}

const VITE_API_BASE_URL = 'https://demo.eldor.kz'

const imageUrl = computed(() => {
  if (props.item.photo) {
    return `${VITE_API_BASE_URL}${props.item.photo}`
  }
  return null
})
</script>

<template>
  <article
    class="min-w-[170px] w-[170px] overflow-hidden rounded-lg p-2 bg-white border border-gray-300 flex flex-col transition-all duration-200"
    :class="{
      'cursor-pointer hover:shadow-md': isInStock,
      'cursor-not-allowed opacity-60': !isInStock,
    }"
    @click="addToCart"
  >
    <div
      class="flex justify-center items-center w-full min-h-20 overflow-hidden"
    >
      <div v-if="item.photo" class="flex items-center w-20 h-20">
        <img
          class="object-cover w-full h-full rounded-md"
          :src="imageUrl"
          :alt="item.title"
        />
      </div>
      <div
        v-else
        class="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-md"
      >
        <Image class="text-gray-500" />
      </div>
    </div>
    <div
      class="flex flex-col gap-2 w-full overflow-hidden text-sm font-semibold"
      :class="{ 'text-gray-500': !isInStock }"
    >
      <span class="truncate text-center">{{ item.title }}</span>
    </div>
    <div
      class="text-center font-semibold"
      :class="!isInStock ? 'text-gray-400' : ''"
      style="color: var(--color-green)"
    >
      {{ item.sale_cost }}₸
    </div>
    <div style="font-size: 0.8rem; text-align: center">
      <span v-if="item.amount > 0">остаток: {{ item.amount }}</span>
      <span v-else class="text-red-600">нет в наличии</span>
    </div>
  </article>
</template>
