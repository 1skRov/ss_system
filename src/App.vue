<script setup>
import { onMounted } from 'vue';
import { useTheme } from './composables/useTheme';

const { initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div class="w-screen h-screen">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
