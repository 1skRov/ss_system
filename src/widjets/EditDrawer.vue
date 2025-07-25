<script setup>

import Bars3Icon from "@/assets/icons/Bars3Icon.vue";
import NumPad from "@/widjets/NumPad.vue";
import XCircleIcon from "@/assets/icons/XCircleIcon.vue";
import CheckCircleIcon from "@/assets/icons/CheckCircleIcon.vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <div class="flex items-center gap-2 text-gray-800">
        <Bars3Icon/>
        <span class=" text-sm">название товара</span>
      </div>
      <p class="font-medium">Lorem ipsum dolor sit amet, consectetur.</p>
    </div>
    <div class="flex justify-between">
      <NumPad/>
      <div class="flex flex-col justify-between w-full ml-4">
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Количество товара</span>
          <input type="text" class="input w-full" placeholder="Введите количество товара"/>
        </div>
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Цена товара</span>
          <input type="text" class="input w-full" placeholder="Введите цену товара"/>
        </div>
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Скидка для товара</span>
          <input type="text" class="input w-full" placeholder="Введите скидку"/>
        </div>
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Итоговая стоимость</span>
          <input type="text" class="input w-full" placeholder="Введите итоговую стоимость"/>
        </div>
      </div>
    </div>
      <div class="flex w-full justify-between mt-5">
        <button class="btn btn-error btn-xl flex items-center gap-3 text-xl">
          <XCircleIcon/>
          Отменить
        </button>
        <button class="btn btn-success btn-xl flex items-center gap-3 text-xl">
          <CheckCircleIcon/>
          Сохранить
        </button>
      </div>
  </div>
</template>

<style scoped>

</style>