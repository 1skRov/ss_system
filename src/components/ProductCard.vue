<script setup>
import Image from '@/assets/icons/Image.vue';
import plusIcon from '@/assets/icons/plusIcon.vue';
import minusIcon from '@/assets/icons/MinusIcon.vue';
import { ref, watch, computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
});

const VITE_API_BASE_URL = 'https://demo.eldor.kz';

const imageUrl = computed(() => {
  if (props.item.photo) {
    return `${VITE_API_BASE_URL}${props.item.photo}`;
  }
  return 'https://via.placeholder.com/150';
});
</script>

<template>
  <div class="p-1 border border-base-300 rounded-lg flex gap-2">
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
  </div>
</template>