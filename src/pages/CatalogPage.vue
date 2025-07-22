<script setup>
import ProductCard from "@/components/ProductCard.vue";
const count = 50;
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="content h-full w-full">
      <div class="grid grid-cols-4 gap-4" style="width: 65vw" >
        <ProductCard v-for="c in count" :key="c"></ProductCard>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>