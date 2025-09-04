<script setup>
import { onMounted } from 'vue'
import { useFilialStore } from '@/stores/filialStore'
import FilialSelectionModal from './widjets/FilialSelectionModal.vue'
const filialStore = useFilialStore();
onMounted(async () => {
  await filialStore.fetchPlaces();
  await filialStore.checkExistingSelection();
})
</script>

<template>
  <div class="w-screen h-screen bg-base-100">
    <router-view></router-view>
    <FilialSelectionModal v-if="filialStore.needsSelection" />
  </div>
</template>

<style scoped lang="scss"></style>
