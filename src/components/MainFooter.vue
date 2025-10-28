<script setup>
import { ref } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import NumPanel from './NumPanel.vue'
import DiscountModal from './DiscountModal.vue'
import QuickItemsModal from './QuickItemsModal.vue'
import PayModal from './PayModal.vue'

const orderStore = useOrderStore()
const showModal = ref(false)
const showQuickItems = ref(false)
const showPayModal = ref(false)
const activeInput = ref(null)
const discountValue = ref('0')

const openModal = () => {
  showModal.value = true
}

const openQuickItems = () => {
  showQuickItems.value = true
}

const openPayModal = () => {
  showPayModal.value = true
}

const closeModal = () => {
  showModal.value = false
  activeInput.value = null
}

const closeQuickItems = () => {
  showQuickItems.value = false
}

const closePayModal = () => {
  showPayModal.value = false
}

const setDiscount = async (discount) => {
  orderStore.setOrderDiscount(discount)
}
</script>
<template>
  <footer class="p-2 flex justify-between border-0 border-t border-gray-300">
    <div class="flex flex-col gap-1 w-1/3">
      <button class="footer-btns" @click="openQuickItems">
        Быстрые товары
      </button>
      <button class="footer-btns">Добавить в отложку</button>
      <button class="footer-btns">Другие действия</button>
    </div>
    <div class="flex gap-3">
      <div
        class="panel rounded-lg h-full p-2 flex flex-col justify-between border border-gray-300"
      >
        <div class="item">
          <p class="label">Итого</p>
          <p class="value flex gap-2">
            <span
              v-if="orderStore.discount && orderStore.discount > 0"
              class="text-orange-500"
              >{{ orderStore.priceWithDiscount }}</span
            >
            <span :class="{ hasDiscount: orderStore.discount > 0 }">{{
              orderStore.totalPrice
            }}</span>
          </p>
        </div>
        <div class="item">
          <p class="label">Внесено</p>
          <p class="value">{{ orderStore.payed_summ }}</p>
        </div>
        <div class="item">
          <p class="label">Сдача</p>
          <p class="value">0</p>
        </div>
        <div class="item">
          <p class="label">Скидка({{ orderStore.discount }} %)</p>
          <button class="dis-btn" @click="openModal">добавить</button>
        </div>
      </div>
      <button
        class="pay-btn"
        style="background: var(--color-green)"
        @click="openPayModal"
      >
        Оплатить
      </button>
    </div>
  </footer>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
    @click.self="closeModal"
  >
    <div
      class="flex items-center justify-center gap-5 bg-white w-[90vw] h-[90vh] rounded-lg p-5"
    >
      <DiscountModal
        v-model="discountValue"
        :order-total="orderStore.totalPrice"
        :order-with-price="orderStore.priceWithDiscount"
        @focus-input="(input) => (activeInput = input)"
        @close="closeModal"
        @add-discount="setDiscount"
      />
      <NumPanel v-model="discountValue" />
    </div>
  </div>
  <div
    v-if="showQuickItems"
    class="fixed inset-0 flex items-center gap-5 justify-center bg-black/70 z-50"
    @click.self="closeQuickItems"
  >
    <QuickItemsModal @close="closeQuickItems" />
  </div>
  <div
    v-if="showPayModal"
    class="fixed inset-0 flex items-center gap-5 justify-center bg-black/70 z-50"
    @click.self="closePayModal"
  >
    <PayModal @close="closePayModal" />
  </div>
</template>
<style scoped>
.hasDiscount {
  text-decoration: line-through;
  color: var(--color-gray);
  font-weight: 500 !important;
}
</style>
