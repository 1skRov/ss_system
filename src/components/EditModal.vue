<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import ToggleButtons from './UiComponents/ToggleButtons.vue'

const orderStore = useOrderStore()

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'focus-input', 'close'])

const qty = computed({
  get: () => props.modelValue.qty,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, qty: value })
  },
})

const price = computed({
  get: () => props.modelValue.price,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, price: value })
  },
})

const discount = computed({
  get: () => props.modelValue.discount,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, discount: value })
  },
})

const total = computed({
  get: () => props.modelValue.total,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, total: value })
  },
})

const closeModal = () => {
  emit('close')
}

const focusInput = (inputName) => {
  emit('focus-input', inputName)
}

const applyChanges = async () => {
  const newAmount = parseFloat(qty.value) || 1

  await orderStore.updateItemAmount({
    orderItemId: props.modelValue.orderItemId,
    amount: newAmount,
  })

  closeModal()
}
</script>
<template>
  <div class="w-120 border border-gray-300 rounded-lg p-3">
    <h2 class="modal-title">Изменить товар: {{ props.modelValue.name }}</h2>
    <div class="flex flex-col gap-3">
      <div>
        <span class="input-label">Количество товара</span>
        <input
          v-model="qty"
          placeholder="Введите количество товара"
          @focus="focusInput('qty')"
        />
      </div>

      <div>
        <span class="input-label">Цена товара</span>
        <input
          v-model="price"
          placeholder="Введите цену товара"
          @focus="focusInput('price')"
        />
      </div>

      <div class="w-full">
        <span class="input-label">Скидка товара</span>
        <div class="flex justify-between items-center w-full">
          <input
            v-model="discount"
            placeholder="Введите скидку товара"
            @focus="focusInput('discount')"
          />
          <ToggleButtons />
        </div>
      </div>
      <div>
        <span class="input-label">Итоговая стоимость товара</span>
        <input
          v-model="total"
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
        @click="applyChanges"
      >
        Применить
      </button>
    </div>
  </div>
</template>

<style scoped></style>
