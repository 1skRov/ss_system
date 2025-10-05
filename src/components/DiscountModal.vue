<script setup>
import { defineEmits } from 'vue'
import InputComponent from './UiComponents/InputComponent.vue'
import ToggleButtons from './UiComponents/ToggleButtons.vue'
const emit = defineEmits(['close'])
const closeModal = () => {
  emit('close')
}
</script>
<template>
  <div class="bg-white rounded-lg p-3 w-120">
    <h2 class="text-xl font-semibold mb-4 text-center">
      Добавить скидку на заказ
    </h2>
    <div class="flex flex-col gap-3">
      <p class="flex items-center justify-between">
        Итоговая стоимость заказа:
        <span class="font-semibold text-2xl ml-3">12345 ₸</span>
      </p>
      <div>
        <span class="block text-sm text-gray-600">Скидка на заказ</span>
        <div class="flex justify-between items-center w-full">
          <InputComponent placeholder="Введите скидку на заказ" />
          <ToggleButtons />
        </div>
      </div>
      <div class="flex items-center justify-end">
        <button
          class="text-white px-4 py-2 rounded-lg"
          style="background-color: var(--color-gray)"
        >
          Применить
        </button>
      </div>
      <div class="flex items-center justify-between">
        <span class="block text-sm text-gray-600 mb-1"
          >Итоговая стоимость заказа с учетом скидки</span
        >
        <p class="font-bold text-2xl" style="color: var(--color-green)">
          12345 ₸
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
