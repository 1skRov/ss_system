<template>
  <div data-theme="bluetheme"
       class="w-full bg-base-300 p-2 rounded-t-lg shadow-lg flex flex-col gap-2 transition-all duration-300">

    <div class="flex w-full gap-2">
      <button class="btn btn-secondary btn-sm flex-grow" @click="toggleLanguage">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM1.826 8.5h2.49a6.959 6.959 0 0 0-.656-2.5H1.17c.174.782.282 1.623.312 2.5zM8.5 11v2.5h2.99c.187-.765.306-1.608.338-2.5H8.5zm-1 2.5V11H4.847c.044.896.144 1.76.288 2.5H7.5zm-2.653-1.461a6.7 6.7 0 0 1-.597.933A9.268 9.268 0 0 1 3.509 12H2.255a7.024 7.024 0 0 0 1.591 1.539zM1.171 12h1.123c.174.782.282 1.623.312 2.5a6.958 6.958 0 0 0 .656-2.5h-2.49zm10.322 0h1.123c.174.782.282 1.623.312 2.5a6.958 6.958 0 0 0 .656-2.5h-2.49zM12.49 12h1.084c.171.71.299 1.423.394 2.153.27-.433.52-.894.736-1.385A9.267 9.267 0 0 1 15.91 12h-1.123a7.97 7.97 0 0 0-1.29-2.5H11.5v2.5h.99zM11.91 4h1.084a9.266 9.266 0 0 1-.64 1.539 6.7 6.7 0 0 1-.597.933A7.025 7.025 0 0 0 13.745 4h-1.835zm-1.055 3.5c.03-.877.138-1.718.312-2.5h2.49a6.958 6.958 0 0 0-.656 2.5h-2.146z"/>
        </svg>
        {{ currentLanguage.toUpperCase() }}
      </button>
      <button class="btn btn-ghost btn-sm flex-grow" @click="onClear">Очистить</button>
      <button class="btn btn-error btn-sm flex-grow" @click="onClose">Закрыть</button>
    </div>
    <div class="flex w-full gap-1 sm:gap-2">
      <button
          v-for="key in processedNumberRow"
          :key="key"
          class="btn btn-base-100 flex-grow text-primary font-bold text-2xl py-2 px-1 min-h-14"
          @click="onKeyPress(key)"
      >
        {{ key }}
      </button>
    </div>
    <div class="flex w-full gap-1 sm:gap-2">
      <button
          v-for="key in processedQwertyRow"
          :key="key"
          class="btn btn-base-100 flex-grow text-primary font-bold text-2xl py-2 px-1 min-h-14"
          @click="onKeyPress(key)"
      >
        {{ key }}
      </button>
    </div>
    <div class="flex w-full gap-1 sm:gap-2">
      <button
          v-for="key in processedAsdfRow"
          :key="key"
          class="btn btn-base-100 flex-grow text-primary font-bold text-2xl py-2 px-1 min-h-14"
          @click="onKeyPress(key)"
      >
        {{ key }}
      </button>
    </div>
    <div class="flex w-full gap-1 sm:gap-2">
      <button
          v-for="key in processedZxcvRow"
          :key="key"
          class="btn btn-base-100 flex-grow text-primary font-bold text-2xl py-2 px-1 min-h-14"
          @click="onKeyPress(key)"
      >
        {{ key }}
      </button>
    </div>
    <div class="flex w-full gap-1 sm:gap-2">
      <button
          class="btn btn-secondary flex-grow-[2] font-bold text-lg"
          :class="{'btn-active': isCaps}"
          @click="toggleCaps"
      >
        ↑ Caps
      </button>
      <button class="btn btn-primary flex-grow-[5] font-bold text-lg" @click="onKeyPress(' ')">
        Пробел
      </button>
      <button class="btn btn-secondary flex-grow-[2] font-bold text-lg" @click="onKeyPress('BACKSPACE')">
        ⌫
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';

const currentLanguage = ref('ru');
const isCaps = ref(false);
const emit = defineEmits(['key-press', 'clear', 'close']);

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
  }
};

const processedNumberRow = computed(() => layouts.numbers);

const processedQwertyRow = computed(() => {
  const langKey = isCaps.value ? `${currentLanguage.value}_upper` : currentLanguage.value;
  return layouts[langKey].qwerty;
});

const processedAsdfRow = computed(() => {
  const langKey = isCaps.value ? `${currentLanguage.value}_upper` : currentLanguage.value;
  return layouts[langKey].asdf;
});

const processedZxcvRow = computed(() => {
  const langKey = isCaps.value ? `${currentLanguage.value}_upper` : currentLanguage.value;
  return layouts[langKey].zxcv;
});
const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'ru' ? 'en' : 'ru';
};

const toggleCaps = () => {
  isCaps.value = !isCaps.value;
};

const onKeyPress = (key) => {
  emit('key-press', key);
};

const onClear = () => {
  emit('clear');
};

const onClose = () => {
  emit('close');
};
</script>

<style scoped>
.btn {
  min-width: 28px;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.btn:active {
  transform: scale(0.95);
}
</style>
