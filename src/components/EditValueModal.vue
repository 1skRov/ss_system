<script setup>
const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['close'])

function confirm() {
  emit('close')
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <div
        class="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl"
        @click.stop
      >
        <h3 class="text-lg font-semibold">Изменить товар : `name`</h3>
        <input
          ref="inputRef"
          type="number"
          v-model="inputValue"
          class="w-full px-3 py-2 mt-4 text-lg text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div class="flex justify-end mt-6 space-x-3">
          <button
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Отмена
          </button>
          <button
            @click="confirm"
            class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
