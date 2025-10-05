<script setup>
import { ref } from 'vue'
import CashIcon from '@/assets/icons/CashIcon.vue'
import CardIcon from '@/assets/icons/CreditCardIcon.vue'
import Qr from '@/assets/icons/QrIcon.vue'
import Bonus from '@/assets/icons/BonusIcon.vue'
const active = ref('preview')

const toggle = (mode) => {
  active.value = mode
}
</script>

<template>
  <div class="inline-flex bg-gray-100 rounded-lg p-1">
    <button
      class="toggle"
      :class="
        active === 'qr'
          ? 'bg-white shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      "
      @click="toggle('qr')"
    >
      <Qr />
      <span>Перевод/QR</span>
    </button>

    <button
      class="toggle"
      :class="
        active === 'cash'
          ? 'bg-white shadow-sm text-gray-900'
          : 'text-gray-500 hover:text-gray-700'
      "
      @click="toggle('cash')"
    >
      <CashIcon />
      <span>Наличка</span>
    </button>

    <button
      class="toggle"
      :class="
        active === 'cart'
          ? 'bg-white shadow-sm text-gray-900'
          : 'text-gray-500 hover:text-gray-700'
      "
      @click="toggle('cart')"
    >
      <CardIcon />
      <span>Карта</span>
    </button>

    <button
      class="toggle"
      :class="
        active === 'bonus'
          ? 'bg-white shadow-sm text-gray-900'
          : 'text-gray-500 hover:text-gray-700'
      "
      @click="toggle('bonus')"
    >
      <Bonus />
      <span>Бонус</span>
    </button>
  </div>
</template>

<style scoped>
button:active {
  transform: scale(0.97);
}
</style>
