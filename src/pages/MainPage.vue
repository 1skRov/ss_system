<script setup>
import MainHeader from "@/components/MainHeader.vue";
import ContentPage from "@/pages/ContentPage.vue";
</script>

<template>
  <div class="flex flex-col w-full h-full">
      <MainHeader></MainHeader>
    <div class="w-full flex-1 overflow-y-auto">
      <ContentPage></ContentPage>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>