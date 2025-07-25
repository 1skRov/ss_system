<script setup>
import NumPad from "@/widjets/NumPad.vue";
</script>

<template>
  <div class="flex flex-col h-full gap-4 p-2">
    <div class="flex justify-between">
      <NumPad/>
      <div class="flex flex-col justify-between w-full ml-4">
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Наличными</span>
          <input type="text" class="input w-full" placeholder="Введите сумму"/>
        </div>
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Каспи</span>
          <input type="text" class="input w-full" placeholder="Каспи"/>
        </div>
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Карта</span>
          <input type="text" class="input w-full" placeholder="Карта"/>
        </div>
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">В долг</span>
          <input type="text" class="input w-full" placeholder="Долг"/>
        </div>
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Бонус</span>
          <input type="text" class="input w-full" placeholder="Бонус"/>
        </div>
      </div>
    </div>
    <div class="mt-auto w-full flex justify-end">
      <div class="payment-footer flex flex-col gap-2 items-end">
        <button class="btn btn-xl btn-success w-60">Оплатить</button>
        <button class="btn btn-xl btn-info w-60">Оплатить и чек</button>
        <button class="btn btn-xl btn-warning w-60">Оформить возврат</button>
        <button class="btn btn-xl btn-error w-60">Отменить оплату</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.payment-footer {
  position: sticky;
  bottom: 0;
  right: 0;
  background: inherit;
  z-index: 10;
  padding-bottom: 1rem;
}
</style>