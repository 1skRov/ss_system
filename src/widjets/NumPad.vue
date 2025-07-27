<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const props = defineProps({
  initialValue: {
    type: Number,
    default: 0
  },
  field: {
    type: String,
    required: true
  },
  initialDiscountType: {
    type: String,
    default: 'percent'
  }
});

const emit = defineEmits(['confirm', 'cancel', 'discountTypeChange']);

const displayValue = ref('');
const discountType = ref('percent');

onMounted(() => {
  displayValue.value = props.initialValue.toString();
  if (props.field === 'discount') {
    discountType.value = props.initialDiscountType;
  }
});
watch(() => props.initialValue, (newValue) => {
  displayValue.value = newValue.toString();
}, { immediate: true });

function confirm() {
  emit('confirm', parseFloat(displayValue.value) || 0);
}

function clear() {
  displayValue.value = '0';
}

function append(char) {
  if (char === '.' && displayValue.value.includes('.')) return;
  if (displayValue.value === '0' && char !== '.') {
    displayValue.value = char;
  } else {
    displayValue.value += char;
  }
}

function backspace() {
  displayValue.value = displayValue.value.slice(0, -1);
  if (displayValue.value === '') {
    displayValue.value = '0';
  }
}
</script>

<template>
  <div class="rounded w-70 min-w-70 bg-base-200 px-2 py-3 flex flex-col gap-2 border border-base-300">
    <div class="w-full grid grid-cols-2 gap-2">
      <button class="btn" :class="discountType === 'percent' ? 'btn-primary text-white' : 'btn-outline'"
        @click="discountType = 'percent'; emit('discountTypeChange', 'percent')">
        Скидка в %
      </button>
      <button class="btn" :class="discountType === 'fixed' ? 'btn-primary text-white' : 'btn-outline'"
        @click="discountType = 'fixed'; emit('discountTypeChange', 'fixed')">
        Скидка в ₸
      </button>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <button v-for="i in 9" :key="i" class="btn btn-xl bg-base-100 text-xl font-bold" @click="append(i.toString())">
        {{ i }}
      </button>
      <button class="btn bg-base-100 btn-xl text-xl font-bold" @click="append('0')">0</button>
      <button class="btn bg-base-100 btn-xl text-xl font-bold" @click="append('.')">.</button>
      <button class="btn btn-warning btn-xl text-xl font-bold" @click="backspace">←</button>
    </div>
  </div>
</template>