<script setup>
import TrashIcon from '@/assets/icons/TrashIcon.vue'
import PlusIcon from '@/assets/icons/plusIcon.vue'
import MinusIcon from '@/assets/icons/MinusIcon.vue'

const props = defineProps({
  hasPrice: {
    type: Boolean,
    default: true,
  },
  hasDiscount: {
    type: Boolean,
    default: true,
  },
  hasCount: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <section class="w-full h-full">
    <div class="overflow-hidden border border-gray-200 rounded-lg mt-2">
      <table
        class="w-full divide-y divide-gray-200 table-fixed overflow-hidden bg-white"
      >
        <thead>
          <tr>
            <th scope="col">
              <div class="flex items-center gap-2">
                <input type="checkbox" class="rounded w-4 h-4" />Товар
              </div>
            </th>
            <th scope="col" style="width: 180px" v-if="hasCount">Количество</th>
            <th scope="col" style="width: 150px" v-if="hasPrice">Цена</th>
            <th scope="col" style="width: 100px" v-if="hasDiscount">Скидка</th>
            <th scope="col" style="width: 150px">Итого</th>
            <th scope="col" style="width: 90px">Действие</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr>
            <td>
              <div class="flex items-center gap-2 w-full overflow-hidden">
                <input type="checkbox" class="rounded w-4 h-4" />
                <span class="font-medium w-full truncate">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Expedita aliquid, est, culpa aut deserunt voluptate nulla
                  cupiditate quae sapiente optio aliquam rem hic, quisquam
                  libero quam? Minus placeat corporis fugit.
                </span>
              </div>
            </td>
            <td v-if="hasCount">
              <div class="items-center flex justify-between">
                <button class="button blue-button px-5 py-2.5">
                  <minus-icon></minus-icon>
                </button>
                <p class="font-medium">10</p>
                <button class="button blue-button px-5 py-2.5">
                  <plus-icon></plus-icon>
                </button>
              </div>
            </td>
            <td class="text-center" v-if="hasPrice">12000</td>
            <td class="text-center" v-if="hasDiscount">
              <div class="text-yellow-500 font-bold">5 %</div>
            </td>
            <td class="text-center">15000</td>
            <td class="text-center">
              <div class="flex justify-center items-center">
                <div
                  class="bg-red-100 rounded-md w-10 h-8 flex items-center justify-center text-red-500"
                >
                  <trash-icon :iconSize="5"></trash-icon>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<style scoped lang="scss">
table {
  th {
    padding: 8px 4px;
    font-size: 1rem;
    font-weight: 500;
  }
  td {
    height: 50px;
    padding: 0 4px;
    font-size: 0.875rem;
    min-width: 90px;
  }
}
</style>
