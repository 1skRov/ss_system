<script setup>
import Image from '@/assets/icons/Image.vue'
import plusIcon from '@/assets/icons/plusIcon.vue'
import minusIcon from '@/assets/icons/MinusIcon.vue'
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
    class="max-w-[220px] overflow-hidden rounded-lg py-1.5 px-2 bg-gray-50 border border-gray-200"
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
  <!-- <div class="p-1 border border-base-300 rounded-lg flex gap-2">
    <div class="flex items-center justify-center bg-base-200 rounded overflow-hidden"
      style="min-width:130px; width: 30%; min-height: 130px; height: 130px;">
      <img v-if="item.photo" :src="imageUrl" :alt="item.title" class="w-full h-full object-fill" />
      <Image v-else class="text-neutral" />
    </div>
    <div class="flex flex-col justify-between w-full pr-2 overflow-hidden">
      <div class="w-full">
        <p class="text-lg font-medium truncate">{{ item.title }}</p>
        <p class="text-neutral text-sm flex justify-between w-full">
          <span>Цена: {{ item.sale_cost }}₸</span>
          <span>Количество: {{ item.amount }}</span>
        </p>
      </div>
      <div class="flex w-full gap-2">
        <button class="btn btn-sm btn-secondary w-1/4">
          <minusIcon></minusIcon>
        </button>
        <input type="text" class="input input-sm text-center text-lg font-medium" :value="item.delimiter"></input>
        <button class="btn btn-sm btn-secondary w-1/4">
          <plusIcon></plusIcon>
        </button>
      </div>
    </div>
  </div> -->
</template>
