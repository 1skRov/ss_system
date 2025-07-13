<script setup>
import {ref, onMounted} from 'vue';

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
  <div class="card w-64 bg-base-200 shadow-xl p-4 flex flex-col gap-2">
    <div class="p-2 bg-base-100 rounded-lg text-right text-xl font-mono h-10">
      {{ displayValue }}
    </div>

    <div v-if="field === 'discount'" class="w-full">
      <button class="btn btn-sm w-full" @click="toggleDiscountType">
        Скидка в: {{ discountType === 'percent' ? '%' : '₸' }}
      </button>
    </div>

    <div class="grid grid-cols-3 gap-2">
      <button v-for="i in 9" :key="i" class="btn" @click="append(i.toString())">{{ i }}</button>
      <button class="btn" @click="append('0')">0</button>
      <button class="btn" @click="append('.')">.</button>
      <button class="btn btn-warning" @click="backspace">←</button>
    </div>

    <div class="grid grid-cols-2 gap-2 mt-2">
      <button class="btn btn-error" @click="handleCancel">Отмена</button>
      <button class="btn btn-success" @click="handleConfirm">OK</button>
    </div>
  </div>
</template>