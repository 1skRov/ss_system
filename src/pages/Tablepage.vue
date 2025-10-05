<script setup></script>

<template>
  <article class="border border-gray-300 rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th scope="col">
            <input
              id="hs-table-checkbox-all"
              type="checkbox"
              class="rounded-sm w-5 h-5"
            />
          </th>
          <th scope="col" class="text-left">Название</th>
          <th scope="col" class="text-center" style="width: 110px">
            Количество
          </th>
          <th scope="col" class="text-center" style="width: 150px">Цена</th>
          <th scope="col" class="text-center" style="width: 120px">Скидка</th>
          <th scope="col" class="text-center" style="width: 190px">Итого</th>
          <th scope="col" class="text-center" style="width: 110px">Действие</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="flex items-center justify-center">
            <input
              id="hs-table-checkbox-1"
              type="checkbox"
              class="rounded-sm w-5 h-5"
            />
          </td>
          <td>John Brown</td>
          <td class="text-center">45</td>
          <td class="text-center">120000</td>
          <td class="text-center text-orange-500 font-semibold">25%</td>
          <td class="text-center">542120</td>
          <td>
            <div class="text-red-500 text-center font-semibold">Удалить</div>
          </td>
        </tr>
      </tbody>
    </table>
  </article>
</template>
<style scoped></style>
