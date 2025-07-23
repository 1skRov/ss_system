<script setup>
import {ref} from 'vue'

const added = ref(false)
const count = ref(1)

function increment() {
  count.value++
}

function decrement() {
  if (count.value > 1) count.value--
}
</script>

<template>
  <div class="card bg-base-100 w-54 max-h-64 border border-base-300 rounded-lg">
    <figure class="px-1.5 pt-1.5">
      <img
          src="@/assets/images/product1.jpg"
          alt="Products"
          class="rounded"/>
    </figure>
    <div class="card-body items-center text-center p-1.5 flex flex-col">
      <span class="card-title">Card Title</span>
      <span class="text-gray-600 text-sm">458₸</span>
      <div class="card-actions w-full">
        <template v-if="!added">
          <button class="btn btn-secondary w-full text-white font-semibold text-lg" @click="added = true">
            Добавить
          </button>
        </template>
        <template v-else>
          <div class="flex items-center justify-between w-full">
            <button class="btn text-lg" @click="decrement">-</button>
            <p class="mx-2 w-1/3 border border-base-300 rounded text-lg font-semibold py-1">{{ count }}</p>
            <button class="btn text-lg" @click="increment">+</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>