<template>
  <footer class="bg-base-300 p-2 footer flex justify-between">
    <div class="footer-add-buttons flex fex-col flex-wrap justify-between h-full">
      <button class="w-full btn btn-secondary text-3xl add-button-footer font-medium">
        Закрыть текущий заказ
      </button>
      <button class="w-full btn btn-secondary text-3xl add-button-footer font-medium">
        Добавить в отложку
      </button>
      <button class="w-full btn btn-secondary text-3xl add-button-footer font-medium">
        Быстрые товары
      </button>
    </div>
    <div class="footer-pay-panel h-full flex flex-col">
      <div class="total-panel w-full h-full bg-base-100 p-3 rounded-lg flex flex-col gap-3">
        <div class="flex justify-between mb-2">
          <h1>Итого</h1>
          <h1>123</h1>
        </div>
        <div class="flex justify-between">
          <p>Внесено</p>
          <p>123</p>
        </div>
        <div class="flex justify-between">
          <p>Сдача</p>
          <p>123</p>
        </div>
        <div class="flex justify-between mt-2">
          <p>Общий чек</p>
          <p>1234</p>
        </div>
      </div>
      <button class="w-full btn btn-success text-3xl pay-button">
        Оплатить
      </button>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  min-height: 26vh;

  .footer-add-buttons {
    min-width: 250px;
    width: 30%;

    .add-button-footer {
      min-height: 70px;
    }
  }

  .footer-pay-panel {
    min-width: 250px;
    width: 35%;

    .total-panel {
      h1 {
        font-size: 32px;
        font-weight: bold;
      }

      p {
        font-size: 24px;
      }
    }

    .pay-button {
      min-height: 70px;
    }
  }

}
</style>
<script setup>
import ArrowUpTrayIcon from "@/assets/icons/ArrowUpTrayIcon.vue";
</script>