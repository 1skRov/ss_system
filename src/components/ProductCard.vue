<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  initialQuantity: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update:quantity']);
const VITE_API_BASE_URL = 'https://demo.eldor.kz';

const quantity = ref(props.initialQuantity);

const step = props.item.delimiter || 1;

function increaseQuantity() {
  quantity.value += step;
}

function decreaseQuantity() {
  const newQuantity = quantity.value - step;
  if (newQuantity >= 0) {
    quantity.value = newQuantity;
  }
}

watch(quantity, (newQuantity) => {
  emit('update:quantity', { id: props.item._id, quantity: newQuantity });
});

const imageUrl = computed(() => {
  if (props.item.photo) {
    return `${VITE_API_BASE_URL}${props.item.photo}`;
  }
  return 'https://via.placeholder.com/150';
});

</script>

<template>
  <div class="card bg-base-100 w-54 max-h-64 border border-base-300 rounded-lg">
    <figure class="px-1.5 pt-1.5">
      <img :src="imageUrl" :alt="item.title" class="rounded" />
    </figure>
    <div class="card-body items-center text-center p-1.5 flex flex-col">
      <span class="card-title">{{ item.title }}</span>
      <span class="text-gray-600 text-sm">{{ item.sale_cost }}₸</span>
      <div class="card-actions w-full">
        <!-- <template v-if="!added">
          <button class="btn btn-secondary w-full text-white font-semibold text-lg" @click="setAdded">
            Добавить
          </button>
        </template> -->
        <div class="flex items-center justify-between w-full">
          <button class="btn text-xl" @click="decreaseQuantity" :disabled="quantity === 0">-</button>
          <p class="mx-2 w-1/3 border border-base-300 rounded text-lg font-semibold py-2">{{ quantity }}</p>
          <button class="btn text-xl" @click="increaseQuantity">+</button>
        </div>
      </div>
    </div>
  </div>
</template>