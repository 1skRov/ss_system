<script setup>
import { onMounted } from 'vue'
import { useFilialStore } from '@/stores/filialStore'
import MainHeader from '@/components/MainHeader.vue'
import ContentPage from '@/pages/ContentPage.vue'
import FilialSelectionModal from '@/components/FilialSelectionModal.vue'

const filialStore = useFilialStore()

onMounted(() => {
  if (!filialStore.filials.length || !filialStore.kassas.length) {
    filialStore.initSelectionFlow()
  }
})
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <MainHeader></MainHeader>
    <div class="w-full flex-1 overflow-y-auto">
      <ContentPage></ContentPage>
    </div>
  </div>
  <FilialSelectionModal />
</template>

<style scoped></style>
