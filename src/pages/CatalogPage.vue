<script setup>
import {ref} from 'vue'
import ProductCard from "@/components/ProductCard.vue"

const count = 50;
import axios from 'axios';

axios.get('https://demo.eldor.kz/api/kassa2/95/new/', {
  withCredentials: true, // важно, чтобы отправлялись cookies
  headers: {
    'Cookie': 'PYCKET_ID=2|1:0|10:17535...твоя кука...',
    'User-Agent': navigator.userAgent
  }
}).then(response => {
  console.log('Ответ:', response.data);
}).catch(error => {
  console.error('Ошибка:', error);
});
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="content h-full w-full">
      <form class="filter flex w-full justify-start items-center overflow-x-auto flex-nowrap pb-4">
        <input class="btn" type="radio" name="category" aria-label="Овощи"/>
        <input class="btn" type="radio" name="category" aria-label="Фрукты"/>
        <input class="btn" type="radio" name="category" aria-label="Молочные"/>
        <input class="btn" type="radio" name="category" aria-label="Мясо"/>
        <input class="btn" type="radio" name="category" aria-label="Рыба"/>
        <input class="btn" type="radio" name="category" aria-label="Хлеб"/>
        <input class="btn" type="radio" name="category" aria-label="Крупы"/>
        <input class="btn" type="radio" name="category" aria-label="Макароны"/>
        <input class="btn" type="radio" name="category" aria-label="Замороженные"/>
        <input class="btn" type="radio" name="category" aria-label="Консервы"/>
        <input class="btn" type="radio" name="category" aria-label="Сладости"/>
        <input class="btn" type="radio" name="category" aria-label="Напитки"/>
        <input class="btn" type="radio" name="category" aria-label="Чай и кофе"/>
        <input class="btn" type="radio" name="category" aria-label="Соусы"/>
        <input class="btn" type="radio" name="category" aria-label="Орехи"/>
        <input class="btn btn-square" type="reset" value="×"/>
      </form>
      <div class="grid grid-cols-4 gap-3">
        <ProductCard v-for="c in count" :key="c"></ProductCard>
      </div>
    </div>
  </div>
</template>