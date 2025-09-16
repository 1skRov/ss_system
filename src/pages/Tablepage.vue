<script setup>
import TrashIcon from '@/assets/icons/TrashIcon.vue'
import Bar3Icon from '@/assets/icons/Bars3Icon.vue'
</script>

<template>
  <section class="p-2 w-full h-full">
    <!-- actions -->
    <div class="flex items-center justify-between">
      <button
        class="border border-blue-200 bg-blue-100 text-blue-800 text-base font-medium rounded-lg flex gap-3 items-center px-3 py-2"
      >
        <Bar3Icon />
        <span>Выбрать все 13 товаров</span>
      </button>
      <button
        class="button red-button text-sm px-3 py-2 flex items-center gap-2"
      >
        <trash-icon></trash-icon>Удалить выбранные
      </button>
    </div>
    <!-- table -->
    <div class="overflow-hidden border border-gray-200 rounded-lg mt-2">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="flex items-center gap-2">
              <input
                type="checkbox"
                class="text-blue-500 border-gray-300 rounded w-4 h-4"
              />Название
            </th>
            <th scope="col">Количество</th>
            <th scope="col" style="width: 160px">Цена</th>
            <th scope="col" style="width: 100px">Скидка</th>
            <th scope="col">Итого</th>
            <th scope="col" style="width: 90px">Действие</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="flex items-center gap-2">
              <input
                type="checkbox"
                class="text-blue-500 border-gray-300 rounded w-4 h-4"
              />название 1asdasdasdasda
            </td>
            <td class="text-center" style="width: 130px">10</td>
            <td style="width: 160px">12000</td>
            <td class="flex items-center justify-center" style="width: 100px">
              <p
                class="whitespace-nowrap flex items-center justify-center text-blue-600 bg-blue-100 rounded-full px-2 py-1 font-medium"
              >
                5 %
              </p>
            </td>
            <td>15000</td>
            <td
              style="width: 90px"
              class="flex items-center justify-center text-red-500"
            >
              <trash-icon></trash-icon>
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
    padding: 15px 16px;
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    color: black;
  }
  td {
    padding: 16px;
    font-size: 0.875rem;
    white-space: wrap;
    min-width: 90px;
  }
}
</style>
