<script setup>
import { ref, computed } from 'vue'
import ToggleButtons from './UiComponents/ToggleButtons.vue'

const props = defineProps({
  orderTotal: { type: Number, default: 0 },
  orderWithPrice: { type: Number, default: 0 },
  modelValue: { type: [String, Number], default: '0' },
})
const emit = defineEmits([
  'close',
  'focus-input',
  'add-discount',
  'update:modelValue',
])

const discountType = ref('tenge')
const activeInput = ref(null)
const localDiscountValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const closeModal = () => {
  emit('close')
}

const focusInput = (inputName) => {
  activeInput.value = inputName
  emit('focus-input', inputName)
}

const handleDiscountTypeChange = (type) => {
  discountType.value = type
}

const applyDiscount = async () => {
  emit('add-discount', parseFloat(props.modelValue))
  closeModal()
}
</script>
<template>
  <div class="rounded-lg p-3 w-120 border border-gray-300">
    <h2 class="modal-title">Добавить скидку на заказ</h2>
    <div
      class="flex flex-col gap-2 border-0 border-b border-gray-300 text-xl pb-2"
    >
      <p>Итоговая стоимость заказа:</p>
      <p class="font-semibold">{{ orderTotal }} ₸</p>
    </div>
    <div
      class="flex flex-col gap-2 border-0 border-b border-gray-300 text-xl mt-2 pb-2"
    >
      <p>Итоговая стоимость заказа со скидкой:</p>
      <p class="font-semibold text-yellow-600">{{ orderWithPrice }} ₸</p>
    </div>
    <div class="flex gap-3 items-center w-full my-3">
      <input
        v-model="localDiscountValue"
        placeholder="Введите скидку на заказ"
        @focus="focusInput('discount')"
      />
      <ToggleButtons @change="handleDiscountTypeChange" />
    </div>
    <div class="flex items-center justify-end gap-5">
      <button
        class="text-white px-4 py-3 rounded-lg"
        style="background-color: var(--color-black)"
        @click="closeModal"
      >
        Отмена
      </button>
      <button
        class="text-white px-4 py-3 rounded-lg"
        style="background-color: var(--color-green)"
        @click="applyDiscount"
      >
        Применить
      </button>
    </div>
  </div>
</template>

<style scoped></style>
