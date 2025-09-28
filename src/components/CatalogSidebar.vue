<script setup>
import TableComponent from './TableComponent.vue'
</script>
<template>
  <div
    class="w-full h-full flex flex-col justify-between px-2 border-0 border-l border-gray-300"
  >
    <p class="m-0 mb-2 text-sm">Заказ №2</p>
    <div class="side-body">
      <table-component
        :has-discount="false"
        :has-price="false"
        :has-count="false"
      ></table-component>
    </div>
    <div class="flex flex-col gap-2 border-0 border-t border-gray-300">
      <div class="flex w-full justify-between items-center font-bold text-base">
        <p class="m-0">Итого</p>
        <p class="m-0 w-1/3 text-center">1200</p>
      </div>
      <div class="flex w-full justify-between items-center text-green-600">
        <p class="m-0 text-sm">Общяя скидка</p>
        <p
          class="m-0 py-1.5 text-sm font-bold w-1/3 text-center bg-gray-200 rounded-md"
        >
          0%
        </p>
      </div>
      <button
        class="w-full button blue-button text-white font-semibold rounded-xl py-3"
      >
        Оплатить
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.side-body {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .item {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    .cost {
      p {
        margin: 0;
      }
    }
  }
  .item + .item {
    border-top: 1px solid #d1d5dc;
  }
}
</style>
