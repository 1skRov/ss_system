<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import GlobeIcon from '@/assets/icons/GlobeIcon.vue'
import ArrowLongUpIcon from '@/assets/icons/ArrowLongUpIcon.vue'
import Backspaceicon from '@/assets/icons/Backspaceicon.vue'

const emit = defineEmits(['key-press', 'clear', 'submit', 'update:modelValue'])
const props = defineProps({
  modelValue: { type: String, default: '' },
})

const currentLanguage = ref('ru')
const isCaps = ref(false)

const layouts = {
  numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  en: {
    qwerty: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    asdf: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    zxcv: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  },
  en_upper: {
    qwerty: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    asdf: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    zxcv: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  },
  ru: {
    qwerty: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    asdf: ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    zxcv: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'],
  },
  ru_upper: {
    qwerty: ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
    asdf: ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
    zxcv: ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю'],
  },
}
const langKey = computed(() =>
  isCaps.value ? `${currentLanguage.value}_upper` : currentLanguage.value
)
const processedNumberRow = computed(() => layouts.numbers)
const processedQwertyRow = computed(() => layouts[langKey.value].qwerty)
const processedAsdfRow = computed(() => layouts[langKey.value].asdf)
const processedZxcvRow = computed(() => layouts[langKey.value].zxcv)

const pressedKey = ref(null)
let holdTimer = null
let repeatTimer = null
const REPEAT_DELAY = 300
const REPEAT_RATE = 60

function handleKey(payload) {
  let newValue = props.modelValue

  switch (payload) {
    case 'BACKSPACE':
      newValue = props.modelValue.slice(0, -1)
      emit('update:modelValue', newValue)
      emit('key-press', payload)
      break
    case 'CLEAR':
      newValue = ''
      emit('update:modelValue', newValue)
      emit('clear')
      break

    case 'TOGGLE_LANG':
      currentLanguage.value = currentLanguage.value === 'ru' ? 'en' : 'ru'
      break
    case 'TOGGLE_CAPS':
      isCaps.value = !isCaps.value
      break
    case 'SUBMIT':
      emit('submit')
      break

    default:
      if (payload.length === 1 || payload === ' ') {
        newValue = props.modelValue + payload
        emit('update:modelValue', newValue)
        emit('key-press', payload)
      }
  }
}
function onDown(payload) {
  pressedKey.value = payload
  handleKey(payload)

  if (payload === 'BACKSPACE') {
    holdTimer = setTimeout(() => {
      repeatTimer = setInterval(() => handleKey('BACKSPACE'), REPEAT_RATE)
    }, REPEAT_DELAY)
  }
}
function onUp() {
  pressedKey.value = null
  clearTimeout(holdTimer)
  clearInterval(repeatTimer)
  holdTimer = null
  repeatTimer = null
}

onBeforeUnmount(() => {
  clearTimeout(holdTimer)
  clearInterval(repeatTimer)
})
</script>

<template>
  <div
    class="w-full bg-gray-100/80 p-3 rounded-t-lg flex flex-col gap-2 border-t border-gray-300 select-none"
  >
    <!-- numbers -->
    <div class="flex justify-between w-full">
      <button
        class="num-key text-white font-medium h-16 w-[110px]"
        style="background: var(--color-gray)"
        :class="{ 'is-pressed': pressedKey === 'TOGGLE_CAPS' }"
        @pointerdown.stop.prevent="onDown('TOGGLE_CAPS')"
        @pointerup="onUp"
        @pointerleave="onUp"
        @pointercancel="onUp"
      >
        <ArrowLongUpIcon /> Caps
      </button>
      <button
        v-for="key in processedNumberRow"
        :key="`num-${key}`"
        class="num-key h-16 w-[70px]"
        :class="{ 'is-pressed': pressedKey === key }"
        @pointerdown.stop.prevent="onDown(key)"
        @pointerup="onUp"
        @pointerleave="onUp"
        @pointercancel="onUp"
      >
        {{ key }}
      </button>
      <button
        class="num-key text-white font-medium h-16 w-[110px]"
        style="background: var(--color-gray)"
        :class="{ 'is-pressed': pressedKey === 'BACKSPACE' }"
        @pointerdown.stop.prevent="onDown('BACKSPACE')"
        @pointerup="onUp"
        @pointerleave="onUp"
        @pointercancel="onUp"
      >
        <Backspaceicon />
      </button>
    </div>

    <!-- qwerty -->
    <div class="flex w-full gap-2 justify-center">
      <button
        v-for="key in processedQwertyRow"
        :key="`q-${key}`"
        type="button"
        class="num-key h-16 w-[80px]"
        :class="{ 'is-pressed': pressedKey === key }"
        @pointerdown.stop.prevent="onDown(key)"
        @pointerup="onUp"
        @pointerleave="onUp"
        @pointercancel="onUp"
      >
        {{ key }}
      </button>
    </div>

    <!-- asdf -->
    <div class="flex w-full gap-2 justify-center">
      <button
        v-for="key in processedAsdfRow"
        :key="`a-${key}`"
        type="button"
        class="num-key h-16 w-[80px]"
        :class="{ 'is-pressed': pressedKey === key }"
        @pointerdown.stop.prevent="onDown(key)"
        @pointerup="onUp"
        @pointerleave="onUp"
        @pointercancel="onUp"
      >
        {{ key }}
      </button>
    </div>

    <!-- zxcv -->
    <div class="flex w-full gap-2 justify-center">
      <button
        v-for="key in processedZxcvRow"
        :key="`z-${key}`"
        type="button"
        class="num-key h-16 w-[80px]"
        :class="{ 'is-pressed': pressedKey === key }"
        @pointerdown.stop.prevent="onDown(key)"
        @pointerup="onUp"
        @pointerleave="onUp"
        @pointercancel="onUp"
      >
        {{ key }}
      </button>
    </div>

    <!-- bottom row -->
    <div class="flex w-full gap-2">
      <div class="w-1/3 flex gap-2">
        <button
          class="num-key text-white font-medium h-16 w-full"
          style="background: var(--color-gray)"
          :class="{ 'is-pressed': pressedKey === 'TOGGLE_LANG' }"
          @pointerdown.stop.prevent="onDown('TOGGLE_LANG')"
          @pointerup="onUp"
          @pointerleave="onUp"
          @pointercancel="onUp"
        >
          <GlobeIcon /> {{ currentLanguage.toUpperCase() }}
        </button>
      </div>

      <button
        class="rounded-lg w-full h-16 text-white font-medium"
        style="background: var(--color-navy-blue)"
        :class="{ 'is-pressed': pressedKey === ' ' }"
        @pointerdown.stop.prevent="onDown(' ')"
        @pointerup="onUp"
        @pointerleave="onUp"
        @pointercancel="onUp"
      >
        Пробел
      </button>
      <div class="w-1/3 flex gap-2">
        <button
          class="num-key text-white font-medium h-16 w-full"
          style="background: var(--color-gray)"
          :class="{ 'is-pressed': pressedKey === 'SUBMIT' }"
          @pointerdown.stop.prevent="onDown('SUBMIT')"
          @pointerup="onUp"
          @pointerleave="onUp"
          @pointercancel="onUp"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
