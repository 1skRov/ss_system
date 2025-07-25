<script setup>
import { ref } from 'vue'
import ProductCard from "@/components/ProductCard.vue"

const categories = [
  "Овощи", "Фрукты", "Молочные", "Мясо", "Рыба", "Хлеб", "Напитки", "Сладости", "Бакалея"
]
const expanded = ref(false)
const selected = ref(categories[0])
const count = 50

function selectCategory(cat) {
  selected.value = cat
  expanded.value = false
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="content h-full w-full">
      <div style="width: 65vw">
        <div class="flex flex-wrap gap-2 bg-base-200 border border-base-300 rounded-lg mb-2">
          <template v-if="!expanded">
            <button
                class="btn bg-base-300 border border-accent text-lg"
                :class="{'btn-primary': true}"
                @click="expanded = true"
            >
              {{ selected }}
            </button>
          </template>
          <template v-else>
            <button
                v-for="cat in categories"
                :key="cat"
                class="btn bg-base-300 border border-accent text-lg"
                :class="{'btn-secondary': selected === cat}"
                @click="selectCategory(cat)"
            >
              {{ cat }}
            </button>
          </template>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <ProductCard v-for="c in count" :key="c"></ProductCard>
        </div>
      </div>
    </div>
  </div>
</template>