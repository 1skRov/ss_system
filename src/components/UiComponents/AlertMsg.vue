<script setup>
import BellAlerts from '@/assets/icons/BellAlerts.vue'

defineProps({
  bg: { type: String, default: 'info' }, // error | warning | info | success
  title: { type: String, required: true },
  description: { type: String, required: true },
})
defineEmits(['close'])

const bgColor = {
  error: 'bg-red-400',
  warning: 'bg-yellow-400',
  info: 'bg-blue-400',
  success: 'bg-green-400',
}

const borderColor = {
  error: 'border-red-100',
  warning: 'border-yellow-100',
  info: 'border-blue-100',
  success: 'border-green-100',
}
</script>

<template>
  <div
    :class="[
      'border text-sm rounded-lg p-4 text-white',
      bgColor[bg],
      borderColor[bg],
    ]"
    @click="$emit('close')"
  >
    <div class="flex">
      <div class="shrink-0">
        <BellAlerts />
      </div>
      <div class="ms-4">
        <h3 id="hs-with-description-label" class="text-sm font-semibold">
          {{ title }}
        </h3>
        <div class="mt-1 text-sm text-white">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>
