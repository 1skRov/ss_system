<template>
  <div class="w-full bg-base-200 p-3 rounded-t-lg shadow-lg flex flex-col gap-2 transition-all duration-300">
    <div class="flex w-full gap-2">
      <button class="btn btn-primary btn-sm flex-grow text-lg" @click="toggleLanguage">
        <GlobeIcon></GlobeIcon>
        {{ currentLanguage.toUpperCase() }}
      </button>
      <button class="btn btn-secondary text-lg btn-sm flex-grow" @click="onClear">Очистить поле</button>
      <button class="btn btn-error btn-sm flex-grow text-lg text-white" @click="onClose">Закрыть</button>
    </div>
    <div class="flex w-full gap-1 sm:gap-2">
      <button
          v-for="key in processedNumberRow"
          :key="key"
          class="btn bg-white border border-base-300 text-black flex-grow font-bold text-2xl py-2 px-1 min-h-14"
          @click="onKeyPress(key)"
      >
        {{ key }}
      </button>
    </div>
    <div class="flex w-full gap-1 sm:gap-2">
      <button
          v-for="key in processedQwertyRow"
          :key="key"
          class="btn bg-white border border-base-300 flex-grow font-bold text-2xl py-2 px-1 min-h-14"
          @click="onKeyPress(key)"
      >
        {{ key }}
      </button>
    </div>
    <div class="flex w-full gap-1 sm:gap-2">
      <button
          v-for="key in processedAsdfRow"
          :key="key"
          class="btn bg-white border border-base-300 flex-grow font-bold text-2xl py-2 px-1 min-h-14"
          @click="onKeyPress(key)"
      >
        {{ key }}
      </button>
    </div>
    <div class="flex w-full gap-1 sm:gap-2">
      <button
          v-for="key in processedZxcvRow"
          :key="key"
          class="btn bg-white border border-base-300 flex-grow font-bold text-2xl py-2 px-1 min-h-14"
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
        <ArrowLongUpIcon></ArrowLongUpIcon> Caps
      </button>
      <button class="btn btn-primary flex-grow-[5] font-bold text-lg" @click="onKeyPress(' ')">
        Пробел
      </button>
      <button class="btn btn-secondary flex-grow-[2] font-bold text-lg" @click="onKeyPress('BACKSPACE')">
        <Backspaceicon></Backspaceicon>
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import GlobeIcon from "@/assets/icons/GlobeIcon.vue";
import ArrowLongUpIcon from "@/assets/icons/ArrowLongUpIcon.vue";
import Backspaceicon from "@/assets/icons/Backspaceicon.vue";

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
