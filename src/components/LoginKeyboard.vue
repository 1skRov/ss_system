<script setup>
import { ref, computed } from 'vue'
import GlobeIcon from '@/assets/icons/GlobeIcon.vue'
import ArrowLongUpIcon from '@/assets/icons/ArrowLongUpIcon.vue'
import Backspaceicon from '@/assets/icons/Backspaceicon.vue'

const emit = defineEmits(['key-press', 'clear', 'submit'])

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

function fire(payload) {
  switch (payload) {
    case 'TOGGLE_LANG':
      currentLanguage.value = currentLanguage.value === 'ru' ? 'en' : 'ru'
      break
    case 'TOGGLE_CAPS':
      isCaps.value = !isCaps.value
      break
    case 'CLEAR':
      emit('clear')
      break
    case 'SUBMIT':
      emit('submit')
      break
    default:
      emit('key-press', payload)
  }
}
function onDown(payload) {
  pressedKey.value = payload
  fire(payload)
  if (payload === 'BACKSPACE') {
    holdTimer = setTimeout(() => {
      repeatTimer = setInterval(() => fire('BACKSPACE'), REPEAT_RATE)
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
</script>

<template>
  <div
    class="w-full bg-gray-50 p-3 rounded-t-lg flex flex-col gap-2 border-t border-gray-100 select-none"
  >
    <!-- numbers -->
    <div class="flex w-full gap-1">
      <button
        v-for="key in processedNumberRow"
        :key="`num-${key}`"
        type="button"
        class="button light-button"
        :class="{ 'is-pressed': pressedKey === key }"
        @pointerdown.stop.prevent="onDown(key)"
        @pointerup="onUp"
        @pointerleave="onUp"
        @pointercancel="onUp"
      >
        {{ key }}
      </button>
    </div>

    <!-- qwerty -->
    <div class="flex w-full gap-1">
      <button
        v-for="key in processedQwertyRow"
        :key="`q-${key}`"
        type="button"
        class="button light-button"
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
    <div class="flex w-full gap-1">
      <button
        v-for="key in processedAsdfRow"
        :key="`a-${key}`"
        type="button"
        class="button light-button"
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
    <div class="flex w-full gap-1">
      <button
        v-for="key in processedZxcvRow"
        :key="`z-${key}`"
        type="button"
        class="button light-button"
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
          type="button"
          class="button gray-button w-full flex gap-3 justify-center items-center px-5 py-3"
          :class="{ 'is-pressed': pressedKey === 'TOGGLE_CAPS' }"
          @pointerdown.stop.prevent="onDown('TOGGLE_CAPS')"
          @pointerup="onUp"
          @pointerleave="onUp"
          @pointercancel="onUp"
        >
          <ArrowLongUpIcon /> Caps
        </button>
        <button
          type="button"
          class="button gray-button w-full flex gap-3 justify-center items-center px-5 py-3"
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
        type="button"
        class="button gray-button w-full py-3"
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
          type="button"
          class="button gray-button w-full flex gap-3 justify-center items-center py-3"
          :class="{ 'is-pressed': pressedKey === 'BACKSPACE' }"
          @pointerdown.stop.prevent="onDown('BACKSPACE')"
          @pointerup="onUp"
          @pointerleave="onUp"
          @pointercancel="onUp"
        >
          <Backspaceicon />
        </button>
        <button
          type="button"
          class="button green-button w-full flex gap-3 justify-center items-center py-3"
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
