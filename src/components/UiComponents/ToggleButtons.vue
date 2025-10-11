<script setup>
import { ref } from 'vue'

const active = ref('tenge')
const emit = defineEmits(['change'])

const toggle = (mode) => {
  active.value = mode
  emit('change', mode)
}
</script>

<template>
  <div class="inline-flex bg-gray-100 rounded-lg p-1">
    <button
      class="px-5 py-2 text-base font-medium rounded-md transition-all duration-150"
      :class="
        active === 'percentage'
          ? 'bg-white shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      "
      @click="toggle('percentage')"
    >
      %
    </button>

    <button
      class="px-5 py-2 text-base font-medium rounded-md transition-all duration-150"
      :class="
        active === 'tenge'
          ? 'bg-white shadow-sm text-gray-900'
          : 'text-gray-500 hover:text-gray-700'
      "
      @click="toggle('tenge')"
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
