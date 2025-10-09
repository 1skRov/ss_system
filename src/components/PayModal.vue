<script setup>
import NumPanel from './NumPanel.vue'
import TogglePaymentTypeButtons from './UiComponents/TogglePaymentTypeButtons.vue'
import InputComponent from './UiComponents/InputComponent.vue'
import { ref } from 'vue'

const selectedPaymentType = ref(null)
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const handlePaymentTypeSelect = (paymentTypeId) => {
  selectedPaymentType.value = paymentTypeId
  console.log('payment_type', paymentTypeId)
}
</script>
<template>
  <div
    class="w-[98vw] max-w-[1100px] bg-white h-[95vh] rounded-md flex flex-col gap-4 items-center justify-center p-6"
  >
    <div class="flex gap-4 w-full items-center justify-center">
      <div>
        <NumPanel />
      </div>
      <div class="flex flex-col gap-4">
        <TogglePaymentTypeButtons @select="handlePaymentTypeSelect" />
        <InputComponent />
        <div
          class="rounded-md border border-gray-300 text-gray-800 font-medium px-5 py-4"
        >
          <div class="flex items-center justify-between mb-2">
            <p>Перевод/QR</p>
            <p>0</p>
          </div>
          <div class="flex items-center justify-between mb-2">
            <p>Наличка</p>
            <p>0</p>
          </div>
          <div class="flex items-center justify-between mb-2">
            <p>Карта</p>
            <p>0</p>
          </div>
          <div class="flex items-center justify-between">
            <p>Бонус</p>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-3">
      <button
        @click="closeModal"
        class="py-5 px-8 rounded-md text-white font-medium w-[200px]"
        style="background: var(--color-black)"
      >
        Отмена
      </button>
      <button
        class="py-5 px-8 rounded-md text-white font-medium w-[200px]"
        style="background: var(--color-gray)"
      >
        Возврат
      </button>
      <button
        class="py-5 px-8 rounded-md text-white font-medium w-[200px]"
        style="background: var(--color-navy-blue)"
      >
        Оплатить и чек
      </button>
      <button
        class="py-5 px-8 rounded-md text-white font-medium w-[200px]"
        style="background: var(--color-green)"
      >
        Оплатить
      </button>
    </div>
  </div>
</template>
