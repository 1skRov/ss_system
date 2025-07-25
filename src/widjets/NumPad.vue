<script setup>
import {ref, onMounted, computed} from 'vue';

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

const emit = defineEmits(['confirm', 'cancel']);

const displayValue = ref('');
const discountType = ref('percent');

// Новое вычисляемое свойство для заголовка
const fieldTitle = computed(() => {
  switch (props.field) {
    case 'count':
      return 'Количество';
    case 'discount':
      return 'Скидка';
    case 'total':
      return 'Итого';
    default:
      return 'Редактирование';
  }
});


onMounted(() => {
  displayValue.value = props.initialValue.toString();
  if (props.field === 'discount') {
    discountType.value = props.initialDiscountType;
  }
});

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

function toggleDiscountType() {
  discountType.value = discountType.value === 'percent' ? 'fixed' : 'percent';
}
</script>

<template>
  <div class="rounded w-70 min-w-70 bg-base-200 px-2 py-3 flex flex-col gap-2 border border-base-300">
    <div class="w-full">
      <button class="btn btn-neutral text-white w-full" @click="toggleDiscountType">
        Скидка в %
      </button>
      <button class="btn btn-neutral text-white w-full mt-3" @click="toggleDiscountType">
        Скидка в тенге
      </button>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <button v-for="i in 9" :key="i" class="btn btn-xl bg-base-100 text-xl font-bold" @click="append(i.toString())">{{ i }}</button>
      <button class="btn bg-base-100 btn-xl text-xl font-bold" @click="append('0')">0</button>
      <button class="btn bg-base-100 btn-xl text-xl font-bold" @click="append('.')">.</button>
      <button class="btn btn-warning btn-xl text-xl font-bold" @click="backspace">←</button>
    </div>
  </div>
</template>