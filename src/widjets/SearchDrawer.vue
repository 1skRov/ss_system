<script setup>

import {ref} from "vue";
import LoginKeyboard from "@/widjets/LoginKeyboard.vue";

</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="w-full px-2 py-1.5">
      <input type="text" placeholder="Поиск..." class="input input-sm w-full"/>
    </div>
    <div class="flex flex-row flex-grow w-full h-0 overflow-hidden">
      <div class="w-full h-full flex flex-col">
        <p class="text-base font-medium text-black mt-0">Товары</p>
        <div class="flex flex-col flex-grow overflow-y-auto">
          <ul class="list bg-base-100 rounded-box shadow-md">
            <li class="list-row">
              <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
              <div>
                <div>Dio Lupa</div>
                <div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
              </div>
              <button class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
              <button class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                    <path
                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
                </svg>
              </button>
            </li>

            <li class="list-row">
              <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div>
              <div>
                <div>Ellie Beilish</div>
                <div class="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
              </div>
              <button class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
              <button class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                    <path
                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
                </svg>
              </button>
            </li>
            <li class="list-row">
              <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div>
              <div>
                <div>Ellie Beilish</div>
                <div class="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
              </div>
              <button class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
              <button class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                    <path
                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
                </svg>
              </button>
            </li>

            <li class="list-row">
              <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div>
              <div>
                <div>Sabrino Gardener</div>
                <div class="text-xs uppercase font-semibold opacity-60">Cappuccino</div>
              </div>
              <button class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
              <button class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                    <path
                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
                </svg>
              </button>
            </li>

          </ul>
        </div>
      </div>
      <div class="border-0 border-l border-gray-400 pl-2 h-full flex flex-col" style="width: 20%; min-width: 190px">
        <p class="text-base font-medium text-black mt-0">Категории</p>
        <form class="filter flex flex-wrap justify-center items-center gap-1 overflow-y-auto">
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
      </div>
    </div>
    <div class="flex w-full items-end">
      <LoginKeyboard/>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>