<script setup>
import MainFooter from "@/components/MainFooter.vue";
</script>

<template>
  <div class="w-full h-full flex flex-col gap-2">
    <div class="p-2 w-full flex-1 overflow-y-auto">
      <router-view></router-view>
    </div>
    <MainFooter />
  </div>
</template>

<style scoped lang="scss"></style>