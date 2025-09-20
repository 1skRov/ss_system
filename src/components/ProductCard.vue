<script setup>
import Image from '@/assets/icons/Image.vue'
import { computed } from 'vue'

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
  return null
})
</script>

<template>
  <article
    class="min-w-[200px] w-[300px] overflow-hidden rounded-lg p-1.5 bg-white border border-gray-400"
  >
    <div class="flex gap-3">
      <div
        class="flex items-center w-20 h-20 overflow-hidden bg-gray-100 rounded-md"
      >
        <img
          class="object-cover w-full h-full"
          v-if="item.photo"
          :src="imageUrl"
          :alt="item.title"
        />
        <Image v-else class="text-gray-500 w-full h-full" />
      </div>
      <p
        class="flex-1 text-base font-bold uppercase min-h-18 h-18 m-0 overflow-hidden"
      >
        {{ item.title }}
      </p>
    </div>
    <div
      class="flex justify-between items-center text-sm font-medium mt-2 mb-1"
    >
      <div class="flex gap-1">
        <p class="m-0">Цена:</p>
        <p class="m-0 text-green-700 font-semibold">{{ item.sale_cost }}₸</p>
      </div>
      <div class="flex gap-1 items-center">
        <p class="m-0">Остаток:</p>
        <p class="m-0 font-semibold" v-if="item.amount > 0">
          {{ item.amount }}
        </p>
        <p
          class="m-0 font-bold px-2 py-1 bg-yellow-300 text-yellow-900 rounded-lg"
          v-else
        >
          не осталось
        </p>
      </div>
    </div>
  </article>
  <!-- <div
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
  </div> -->
</template>
