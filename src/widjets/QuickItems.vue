<script setup>

import ProductCard from "@/components/ProductCard.vue";

const count = 50;
</script>

<template>
  <div class="relative h-full flex flex-col">
    <div class="flex-1 overflow-y-auto px-2 pt-2">
      <div class="flex flex-wrap gap-3">
        <ProductCard v-for="i in count" :key="i"/>
      </div>
    </div>
    <div class="footer-panel bg-base-200 border-t border-base-300 p-3 flex justify-end gap-3">
      <button class="w-1/3 text-xl btn btn-error">Отменить</button>
      <button class="w-1/3 text-xl btn btn-success">Добавить</button>
    </div>
  </div>

</template>

<style scoped lang="scss">
.footer-panel {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
</style>