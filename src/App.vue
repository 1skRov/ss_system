<script setup>
import { onMounted } from "vue";
import { useFilialStore } from "@/stores/filialStore";
import FilialSelectionModal from "./widjets/FilialSelectionModal.vue";
const filialStore = useFilialStore();
onMounted(() => {
  filialStore.checkExistingSelection();
});
</script>

<template>
  <div class="w-screen h-screen">
    <router-view></router-view>
    <FilialSelectionModal v-if="filialStore.needsSelection" />
  </div>
</template>

<style scoped lang="scss"></style>
