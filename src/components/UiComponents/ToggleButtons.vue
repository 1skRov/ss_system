<script setup>
import { ref } from 'vue'

const active = ref('preview')

const toggle = (mode) => {
  active.value = mode
}
</script>

<template>
  <div class="inline-flex bg-gray-100 rounded-lg p-1">
    <button
      class="px-5 py-2 text-base font-medium rounded-md transition-all duration-150"
      :class="
        active === 'preview'
          ? 'bg-white shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      "
      @click="toggle('preview')"
    >
      %
    </button>

    <button
      class="px-5 py-2 text-base font-medium rounded-md transition-all duration-150"
      :class="
        active === 'html'
          ? 'bg-white shadow-sm text-gray-900'
          : 'text-gray-500 hover:text-gray-700'
      "
      @click="toggle('html')"
    >
      ₸
    </button>
  </div>
</template>

<style scoped>
button:active {
  transform: scale(0.97);
}
</style>
