<script setup></script>
<template>
  <footer class="p-2 flex justify-between border-0 border-t border-gray-300">
    <div class="flex flex-col gap-1 w-1/3">
      <button class="footer-btns">Быстрые товары</button>
      <button class="footer-btns">Добавить в отложку</button>
      <button class="footer-btns">Закрыть заказ</button>
    </div>
    <div class="flex gap-3">
      <div
        class="panel rounded-lg h-full p-2 flex flex-col justify-between border border-gray-300"
      >
        <div class="item">
          <p class="label">Итого</p>
          <p class="value">123</p>
        </div>
        <div class="item">
          <p class="label">Внесено</p>
          <p class="value">123</p>
        </div>
        <div class="item">
          <p class="label">Сдача</p>
          <p class="value">123</p>
        </div>
        <div class="item">
          <p class="label">Скидка</p>
          <button class="dis-btn">добавить</button>
        </div>
      </div>
      <button class="pay-btn" style="background: var(--color-green)">
        Оплатить
      </button>
    </div>
  </footer>
</template>
<style scoped></style>
