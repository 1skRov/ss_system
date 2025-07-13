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

function handleConfirm() {
  const value = parseFloat(displayValue.value);
  if (!isNaN(value)) {
    emit('confirm', {
      value: value,
      discountType: discountType.value
    });
  } else {
    emit('cancel');
  }
}

function handleCancel() {
  emit('cancel');
}
</script>

<template>
  <div class="rounded w-64 bg-base-300 shadow-xl px-2 py-3 flex flex-col gap-2 border border-accent">
    <p class="text-center font-bold text-base m-0 mb-1">
      {{ fieldTitle }}
    </p>

    <div class="p-2 bg-base-100 text-right text-xl font-mono h-10 rounded">
      {{ displayValue }}
    </div>

    <div class="w-full">
      <button class="btn btn-neutral text-white w-full" @click="toggleDiscountType">
        Скидка в: {{ discountType === 'percent' ? '%' : '₸' }}
      </button>
    </div>

    <div class="grid grid-cols-3 gap-2">
      <button v-for="i in 9" :key="i" class="btn btn-lg" @click="append(i.toString())">{{ i }}</button>
      <button class="btn btn-lg" @click="append('0')">0</button>
      <button class="btn btn-lg" @click="append('.')">.</button>
      <button class="btn btn-warning btn-lg" @click="backspace">←</button>
    </div>

    <div class="grid grid-cols-2 gap-2 mt-2">
      <button class="btn btn-error" @click="handleCancel">Отмена</button>
      <button class="btn btn-success" @click="handleConfirm">OK</button>
    </div>
  </div>
</template>