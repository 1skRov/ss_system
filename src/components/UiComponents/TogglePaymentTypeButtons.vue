<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePaymentStore } from '@/stores/paymentStore'

import CashIcon from '@/assets/icons/CashIcon.vue'
import CardIcon from '@/assets/icons/CreditCardIcon.vue'
import QrIcon from '@/assets/icons/QrIcon.vue'
import Bonus from '@/assets/icons/BonusIcon.vue'
import BookmarkIcon from '@/assets/icons/BookmarkIcon.vue'

const paymentStore = usePaymentStore()
const active = ref(null)
const emit = defineEmits(['select'])

onMounted(async () => {
  await paymentStore.fetchPaymentTypes()
  if (paymentStore.paymentTypes.length > 0) {
    active.value = paymentStore.paymentTypes[0]._id
    emit('select', paymentStore.paymentTypes[0]._id)
  }
})

const iconMap = computed(() => ({
  Kaspi: QrIcon,
  Карта: CardIcon,
  Бонус: Bonus,
  Наличные: CashIcon,
  Долг: BookmarkIcon,
}))

const toggle = (type) => {
  active.value = type._id
  emit('select', type._id)
}
</script>

<template>
  <div class="inline-flex bg-gray-100 rounded-lg p-1">
    <button
      v-for="type in paymentStore.paymentTypes"
      :key="type._id"
      class="toggle"
      :class="{
        'bg-white shadow-sm': active === type._id,
        'text-gray-500 hover:text-gray-700': active !== type._id,
      }"
      @click="toggle(type)"
    >
      <component :is="iconMap[type.title]" />
      <span>{{ type.title }}</span>
    </button>
  </div>
</template>

<style scoped>
button:active {
  transform: scale(0.97);
}
</style>
