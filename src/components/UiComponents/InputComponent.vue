<script setup>
import { useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const props = defineProps({
  modelValue: String,
  placeholder: { type: String, default: '' },
  inputType: { type: String, default: 'text' },
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])
</script>

<template>
  <div>
    <div class="relative flex items-center mt-0">
      <span
        v-if="$slots.icon"
        class="absolute left-0 flex items-center pl-3 h-full"
      >
        <slot name="icon" />
      </span>
      <input
        v-bind="attrs"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'block w-full placeholder-gray-400/70 rounded-lg px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40',
          error
            ? 'border border-red-400 focus:border-red-400 focus:ring-red-300'
            : 'border border-gray-200 focus:border-black',
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white',
          $slots.icon ? 'pl-11' : '',
        ]"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
    </div>
    <p v-if="error && errorMessage" class="mt-3 text-xs text-red-400">
      {{ errorMessage }}
    </p>
  </div>
</template>
