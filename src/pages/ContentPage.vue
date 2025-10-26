<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import MainFooter from '@/components/MainFooter.vue'

const route = useRoute()
const orderStore = useOrderStore()

const showFooter = computed(() => {
  return route.name === 'TablePage'
})

onMounted(async () => {
  await orderStore.ensureOrderExists()
})
</script>

<template>
  <div class="w-full h-full flex flex-col gap-2">
    <div class="p-2 w-full flex-1 overflow-y-auto">
      <router-view></router-view>
    </div>
    <MainFooter v-if="showFooter" />
  </div>
</template>

<style scoped></style>
