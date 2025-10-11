<script setup>
import { ref, computed } from 'vue'
import InputComponent from './UiComponents/InputComponent.vue'
import ToggleButtons from './UiComponents/ToggleButtons.vue'

const props = defineProps({
  orderTotal: { type: Number, default: 12345 },
})
const emit = defineEmits(['close', 'focus-input'])

const discountValue = ref(null)
const discountType = ref('tenge')
const activeInput = ref(null)

const totalWithDiscount = computed(() => {
  const discount = parseFloat(discountValue.value) || 0
  if (discountType.value === 'percentage') {
    return props.orderTotal - (props.orderTotal * discount) / 100
  } else {
    return props.orderTotal - discount
  }
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
</script>
<template>
  <div class="rounded-lg p-3 w-120 border border-gray-300">
    <h2 class="modal-title">Добавить скидку на заказ</h2>
    <div class="flex flex-col gap-4">
      <p
        class="text-sm flex items-center justify-between border-0 border-b border-gray-200"
      >
        Итоговая стоимость заказа:
        <span class="font-semibold text-xl ml-3">{{ orderTotal }} ₸</span>
      </p>
      <div>
        <span class="input-label">Скидка на заказ</span>
        <div class="flex justify-between items-center w-full">
          <InputComponent
            v-model="discountValue"
            placeholder="Введите скидку на заказ"
            @focus="focusInput('discount')"
          />
          <ToggleButtons @change="handleDiscountTypeChange" />
        </div>
      </div>
      <div class="flex items-center justify-end">
        <button
          class="text-white px-4 py-3 rounded-lg"
          style="background-color: var(--color-gray)"
        >
          Применить
        </button>
      </div>
      <div
        class="text-sm flex items-center justify-between border-0 border-b border-gray-200"
      >
        Итог с учетом скидки
        <p class="font-semibold text-xl text-yellow-500">
          {{ totalWithDiscount.toFixed(2) }} ₸
        </p>
      </div>
    </div>

    <div class="flex items-center justify-end gap-5 mt-4">
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
        @click="closeModal"
      >
        Оплатить
      </button>
    </div>
  </div>
</template>

<style scoped></style>
