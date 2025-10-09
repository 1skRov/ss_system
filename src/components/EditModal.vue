<script setup>
import InputComponent from './UiComponents/InputComponent.vue'
import ToggleButtons from './UiComponents/ToggleButtons.vue'

const props = defineProps({
  modelValue: Object,
})
const emit = defineEmits(['update:modelValue', 'focus-input', 'close'])

const closeModal = () => {
  emit('close')
}

const focusInput = (inputName) => {
  emit('focus-input', inputName)
}
</script>
<template>
  <div class="w-120 border border-gray-300 rounded-lg p-3">
    <h2 class="modal-title">Изменить товар: Название</h2>
    <div class="flex flex-col gap-3">
      <div>
        <span class="input-label">Количество товара</span>
        <InputComponent
          v-model="modelValue.qty"
          placeholder="Введите количество товара"
          @focus="focusInput('qty')"
        />
      </div>

      <div>
        <span class="input-label">Цена товара</span>
        <InputComponent
          v-model="modelValue.price"
          placeholder="Введите цену товара"
          @focus="focusInput('price')"
        />
      </div>

      <div class="w-full">
        <span class="input-label">Скидка товара</span>
        <div class="flex justify-between items-center w-full">
          <InputComponent
            v-model="modelValue.discount"
            placeholder="Введите скидку товара"
            @focus="focusInput('discount')"
          />
          <ToggleButtons />
        </div>
      </div>
      <div>
        <span class="input-label">Итоговая стоимость товара</span>
        <InputComponent
          v-model="modelValue.total"
          placeholder="Введите итоговую стоимость товара"
          @focus="focusInput('total')"
        />
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
