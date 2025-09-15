<script setup>
import BellAlerts from '@/assets/icons/BellAlerts.vue'
import XCircleIcon from '@/assets/icons/XCircleIcon.vue'
const props = defineProps({
  bg: { type: String, default: 'bg-yellow-400' }, // error | warning | info | success
  text: { type: String, required: true },
})
const emit = defineEmits(['close'])
</script>

<template>
  <div class="w-full text-white" :class="bg">
    <div class="container flex items-center justify-between px-6 py-4 mx-auto">
      <div class="flex">
        <BellAlerts />
        <p class="mx-3">{{ text }}</p>
      </div>
      <button
        @click="$emit('close')"
        class="p-1 transition-colors duration-300 transform rounded-md"
      >
        <XCircleIcon />
      </button>
    </div>
  </div>
</template>
