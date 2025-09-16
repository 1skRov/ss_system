<script setup>
import Image from '@/assets/icons/Image.vue'
import { ref, watch, computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const VITE_API_BASE_URL = 'https://demo.eldor.kz'

const imageUrl = computed(() => {
  if (props.item.photo) {
    return `${VITE_API_BASE_URL}${props.item.photo}`
  }
  return 'https://via.placeholder.com/150'
})
</script>

<template>
  <div
    class="max-w-[220px] min-w-[220px] overflow-hidden rounded-lg p-1.5 bg-gray-50 border border-gray-200"
  >
    <div class="relative">
      <div>
        <img
          class="object-cover w-full h-30 rounded-lg"
          v-if="item.photo"
          :src="imageUrl"
          :alt="item.title"
        />
        <Image v-else class="text-slate-800 w-full h-30" />
      </div>
      <div
        class="absolute top-1 right-2 rounded-lg px-2 py-1 text-white text-sm font-semibold"
        style="background: #8677fe"
      >
        {{ item.amount > 0 ? item.amount : 'нет в наличии' }}
      </div>
    </div>
    <div>
      <p
        class="text-base font-bold text-gray-800 uppercase min-h-12 h-12 m-0 mt-1 overflow-hidden"
      >
        {{ item.title }}
      </p>
      <div class="flex flex-col gap-1">
        <p class="m-0 flex-1 text-base text-green-600 font-semibold">
          {{ item.sale_cost }}₸
        </p>
        <button
          class="button blue-button py-2 w-full"
          style="border-radius: 16px"
        >
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>
