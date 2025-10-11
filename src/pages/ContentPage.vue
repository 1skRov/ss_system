<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, provide } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import MainFooter from '@/components/MainFooter.vue'

const route = useRoute()
const orderStore = useOrderStore()

const showFooter = computed(() => {
  return route.name === 'TablePage'
})

provide('orderData', {
  items: computed(() => orderStore.orderItems),
  totalPrice: computed(() => orderStore.totalPrice),
  isLoading: computed(() => orderStore.isLoading),
  error: computed(() => orderStore.error),
})

onMounted(async () => {
  const activeOrderId = orderStore.activeOrderId
  if (activeOrderId) {
    await orderStore.getOrder(activeOrderId)
  }
})
</script>

<template>
  <div class="w-full h-full flex flex-col gap-2">
    <div class="p-2 w-full flex-1 overflow-y-auto">
      <router-view></router-view>
    </div>
    <MainFooter
      v-if="showFooter"
      :total-price="orderStore.totalPrice"
      :items-count="orderStore.orderItems.length"
    />
  </div>
</template>

<style scoped></style>
