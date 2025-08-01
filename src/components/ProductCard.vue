<script setup>
import { ref, watch } from 'vue'

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

const added = ref(props.initialQuantity > 0);
const count = ref(props.initialQuantity);

function increment() {
  count.value++;
}

function decrement() {
  if (count.value > 0) {
    count.value--;
  }
}

function setAdded() {
  added.value = true;
  if (count.value === 0) {
    count.value = 1;
  }
}

watch(count, (newCount) => {
  if (newCount === 0) {
    added.value = false;
  }
  emit('update:quantity', { itemId: props.item.id, quantity: newCount });
});

</script>

<template>
  <div class="card bg-base-100 w-54 max-h-64 border border-base-300 rounded-lg">
    <figure class="px-1.5 pt-1.5">
      <img src="@/assets/images/product1.jpg" alt="Products" class="rounded" />
    </figure>
    <div class="card-body items-center text-center p-1.5 flex flex-col">
      <span class="card-title">{{ item.name }}</span>
      <span class="text-gray-600 text-sm">{{ item.price }}₸</span>
      <div class="card-actions w-full">
        <template v-if="!added">
          <button class="btn btn-secondary w-full text-white font-semibold text-lg" @click="setAdded">
            Добавить
          </button>
        </template>
        <template v-else>
          <div class="flex items-center justify-between w-full">
            <button class="btn text-xl" @click="decrement">-</button>
            <p class="mx-2 w-1/3 border border-base-300 rounded text-lg font-semibold py-2">{{ count }}</p>
            <button class="btn text-xl" @click="increment">+</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>