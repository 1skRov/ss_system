<script setup></script>
<template>
  <div
    class="w-full h-full flex flex-col justify-between px-2 border-0 border-l border-gray-300 bg-white"
  >
    <p class="m-0 mb-2 text-base font-medium">Заказ №2</p>
    <div class="side-body flex flex-col gap-3 mb-3">
      <div class="item py-1.5">
        <p class="w-full truncate text-base text-gray-800">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt,
          in.
        </p>
        <div class="flex items-center justify-between text-lg">
          <p>2 x 12300 ₸</p>
          <p class="font-semibold">24600 ₸</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3 border-0 border-t border-gray-300">
      <div
        class="flex w-full justify-between items-center font-bold text-lg mt-3"
      >
        <p class="m-0">Итого</p>
        <p class="m-0 text-right">1200</p>
      </div>
      <div class="flex w-full justify-between items-center">
        <p class="m-0 text-sm">Скидка</p>
        <button
          class="rounded-lg px-2 py-1.5 text-white font-medium"
          style="background: var(--color-gray)"
        >
          Добавить
        </button>
      </div>
      <button
        class="w-full text-white font-semibold rounded-lg py-3 mt-3"
        style="background: var(--color-green)"
      >
        Оплатить
      </button>
    </div>
  </div>
</template>
<style scoped>
.side-body {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.item + .item {
  border-top: 1px solid var(--color-gray);
}
</style>
