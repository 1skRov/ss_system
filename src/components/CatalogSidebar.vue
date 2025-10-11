<script setup>
import { ref, inject, computed } from 'vue'
import NumPanel from './NumPanel.vue'
import DiscountModal from './DiscountModal.vue'

const showModal = ref(false)
const orderData = inject('orderData')
const orderItems = computed(() => orderData.items.value)
const totalPrice = computed(() => orderData.totalPrice.value)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>
<template>
  <div
    class="w-full h-full flex flex-col justify-between px-2 border-0 border-l border-gray-300 bg-white"
  >
    <p class="m-0 mb-2 text-base font-medium">Заказ №2</p>
    <div class="side-body flex flex-col gap-3 mb-3">
      <div v-for="item in orderItems" :key="item._id" class="item py-1.5">
        <p class="w-full truncate text-base text-gray-800">
          {{ item.title }}
        </p>
        <div class="flex items-center justify-between text-lg">
          <p>{{ item.amount }} x {{ item.sale_cost }} ₸</p>
          <p class="font-semibold">{{ item.amount * item.sale_cost }} ₸</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3 border-0 border-t border-gray-300">
      <div
        class="flex w-full justify-between items-center font-bold text-lg mt-3"
      >
        <p class="m-0">Итого</p>
        <p class="m-0 text-right">{{ totalPrice }} ₸</p>
      </div>
      <div class="flex w-full justify-between items-center">
        <p class="m-0 text-sm">Скидка</p>
        <button
          style="background: var(--color-gray)"
          class="rounded-lg px-2 py-1.5 text-white font-medium"
          @click="openModal"
        >
          Добавить
        </button>
      </div>
      <button
        class="w-full text-white font-semibold rounded-lg py-3 mt-3"
        style="background: var(--color-green)"
      >
        Оплатить
      </button>
    </div>
  </div>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center gap-5 justify-center bg-black/70 z-50"
    @click.self="closeModal"
  >
    <DiscountModal @close="closeModal" />
    <NumPanel />
  </div>
</template>
<style scoped>
.side-body {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.item + .item {
  border-top: 1px solid var(--color-gray);
}
</style>
