<script setup></script>
<template>
  <footer class="p-2 flex justify-between" style="background-color: #dfe5ff">
    <div class="flex flex-col gap-2 w-1/3">
      <button class="button blue-button py-4 px-3">Быстрые товары</button
      ><button class="button blue-button py-4 px-3" @click="deferCurrentOrder">
        Добавить в отложку</button
      ><button class="button blue-button py-4 px-3">Закрыть заказ</button>
    </div>
    <div class="flex gap-3">
      <div
        class="rounded-lg bg-white h-full p-2 flex flex-col justify-around"
        style="min-height: 150px; width: 400px"
      >
        <div class="flex items-center w-full justify-between">
          <p class="label">Итого</p>
          <p class="value">123</p>
        </div>
        <div class="flex items-center w-full justify-between">
          <p class="label">Внесено</p>
          <p class="value">123</p>
        </div>
        <div class="flex items-center w-full justify-between">
          <p class="label">Сдача</p>
          <p class="value">123</p>
        </div>
        <div class="flex items-center w-full justify-between">
          <p class="label">Общий чек</p>
          <p class="value">1234</p>
        </div>
      </div>
      <button class="button green-button px-4" style="font-size: 22px">
        Оплатить
      </button>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.label {
  font-size: 20px;
  font-weight: 500;
  color: #000000;
}
.value {
  font-size: 24px;
  font-weight: 600;
  color: #000000;
}
</style>
