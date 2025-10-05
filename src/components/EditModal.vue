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
      Изменить товар: Название
    </h2>
    <div class="flex flex-col gap-3">
      <div>
        <span class="block text-sm text-gray-600 mb-1">Количество товара</span>
        <InputComponent placeholder="Введите количество товара" />
      </div>

      <div>
        <span class="block text-sm text-gray-600 mb-1">Цена товара</span>
        <InputComponent placeholder="Введите цену товара" />
      </div>

      <div>
        <span class="block text-sm text-gray-600 mb-1">Скидка товара</span>
        <div class="flex justify-between items-center w-full">
          <InputComponent placeholder="Введите скидку товара" />
          <ToggleButtons />
        </div>
      </div>
      <div>
        <span class="block text-sm text-gray-600 mb-1"
          >Итоговая стоимость товара</span
        >
        <InputComponent placeholder="Введите итоговую стоимость товара" />
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
        Применить
      </button>
    </div>
  </div>
</template>

<style scoped></style>
