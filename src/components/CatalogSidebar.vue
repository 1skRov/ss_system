<script setup>
import TrashIcon from '@/assets/icons/TrashIcon.vue'
</script>
<template>
  <div
    class="w-full h-full flex flex-col justify-between px-2 border-0 border-l border-gray-200"
  >
    <div
      class="text-gray-800 font-medium text-sm mb-2 border-0 border-b border-gray-300 h-[45px]"
    >
      <p class="m-0">Заказ №1</p>
      <p class="m-0">Товаров: 3</p>
    </div>
    <div class="w-full h-full overflow-y-auto">
      <div class="flex flex-col bg-gray-100 rounded-lg p-2 mb-2">
        <p class="m-0 truncate font-semibold">Товар: Название товара</p>
        <p class="m-0 mt-0.5 text-gray-700 text-sm">Цена: 1000</p>
        <div class="flex justify-between items-center mt-1">
          <button class="button red-button p-2"><TrashIcon /></button>
          <div class="bg-white flex items-center rounded-full">
            <button class="rounded-full border-gray-200 w-10 h-10 bg-gray-200">
              +
            </button>
            <p class="px-3">123</p>
            <button class="rounded-full border-gray-200 w-10 h-10 bg-gray-200">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 border-0 border-t border-gray-300">
      <div class="flex w-full justify-between items-center font-bold text-base">
        <p class="m-0">Итого</p>
        <p class="m-0 w-1/3 text-center">1200</p>
      </div>
      <div class="flex w-full justify-between items-center text-green-600">
        <p class="m-0 text-sm">Общий чек</p>
        <p
          class="m-0 py-1.5 text-sm font-bold w-1/3 text-center bg-gray-200 rounded-md"
        >
          0%
        </p>
      </div>
      <div class="flex w-full justify-between items-center text-sm">
        <p class="m-0">Сдача</p>
        <p class="m-0 font-bold w-1/3 text-center">1200</p>
      </div>
      <button
        class="w-full bg-blue-500 text-white font-semibold rounded-xl py-2"
      >
        Оплатить
      </button>
    </div>
  </div>
</template>
