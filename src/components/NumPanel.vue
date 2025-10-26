<script setup>
import { computed } from 'vue'
import BackspaceIcon from '@/assets/icons/Backspaceicon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  decimalSeparator: { type: String, default: '.' },
  maxValue: { type: Number, default: 9999999 },
  maxDecimals: { type: Number, default: 2 },
})
const emit = defineEmits(['update:modelValue', 'input'])

const val = computed({
  get: () => props.modelValue ?? '',
  set: (v) => {
    emit('update:modelValue', v)
    emit('input', v)
  },
})

const validateAndFormat = (newValue) => {
  if (!newValue) return ''

  const cleanValue = newValue.replace(
    new RegExp(`[^0-9${props.decimalSeparator}]`, 'g'),
    ''
  )

  const parts = cleanValue.split(props.decimalSeparator)
  if (parts.length > 2) {
    return parts[0] + props.decimalSeparator + parts.slice(1).join('')
  }

  if (parts.length === 2 && parts[1].length > props.maxDecimals) {
    parts[1] = parts[1].slice(0, props.maxDecimals)
    return parts.join(props.decimalSeparator)
  }

  const numericValue = parseFloat(
    cleanValue.replace(props.decimalSeparator, '.')
  )
  if (!isNaN(numericValue) && numericValue > props.maxValue) {
    return val.value
  }

  return cleanValue
}

const pressDigit = (digit) => {
  const newValue = (val.value || '') + digit
  val.value = validateAndFormat(newValue)
}
const pressSeparator = () => {
  if (val.value.includes(props.decimalSeparator)) return

  if (!val.value) {
    val.value = '0' + props.decimalSeparator
    return
  }

  val.value = val.value + props.decimalSeparator
}
const backspace = () => {
  if (!val.value) return
  val.value = val.value.slice(0, -1)
}
const clearAll = () => {
  val.value = ''
}
</script>

<template>
  <div class="inline-block select-none">
    <div
      class="grid gap-2 p-2 bg-gray-100/90 rounded-lg shadow-sm"
      style="
        grid-template-columns: repeat(4, minmax(0, 85px));
        grid-auto-rows: 76px;
      "
    >
      <button class="num-key" @click="pressDigit('7')">7</button>
      <button class="num-key" @click="pressDigit('8')">8</button>
      <button class="num-key" @click="pressDigit('9')">9</button>

      <button
        class="num-key text-white"
        style="
          grid-row: span 2 / span 2;
          grid-column: 4 / 4;
          background: var(--color-gray);
        "
        @click="backspace"
      >
        <BackspaceIcon />
      </button>

      <button class="num-key" @click="pressDigit('4')">4</button>
      <button class="num-key" @click="pressDigit('5')">5</button>
      <button class="num-key" @click="pressDigit('6')">6</button>

      <button class="num-key" @click="pressDigit('1')">1</button>
      <button class="num-key" @click="pressDigit('2')">2</button>
      <button class="num-key" @click="pressDigit('3')">3</button>

      <button
        class="num-key text-red-600 font-bold"
        style="
          grid-row: span 2 / span 2;
          grid-column: 4 / 4;
          background: var(--color-navy-blue);
          font-size: 24px;
        "
        @click="clearAll"
      >
        C
      </button>

      <button class="num-key" @click="pressSeparator">
        {{ decimalSeparator }}
      </button>
      <button class="num-key" @click="pressDigit('0')">0</button>
      <div></div>
    </div>
  </div>
</template>

<style scoped></style>
