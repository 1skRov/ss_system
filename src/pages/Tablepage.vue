<script setup>
import TrashIcon from "@/assets/icons/TrashIcon.vue";
import {ref, watch} from "vue";

const tableData = [
  {id: 1, name: "Хлебо-булочное изделие", count: 12, price: 100, discount: 10, total: 1080},
  {id: 2, name: "Молоко", count: 5, price: 80, discount: 0, total: 400},
  {id: 3, name: "Сыр", count: 2, price: 350, discount: 50, total: 600},
  {id: 4, name: "Яблоки", count: 10, price: 30, discount: 5, total: 250},
  {id: 5, name: "Масло сливочное", count: 1, price: 200, discount: 20, total: 180},
  {id: 6, name: "Куриные яйца", count: 30, price: 12, discount: 0, total: 360},
  {id: 7, name: "Гречневая крупа", count: 3, price: 90, discount: 10, total: 240},
  {id: 8, name: "Колбаса варёная", count: 2, price: 270, discount: 30, total: 480},
  {id: 9, name: "Томаты", count: 8, price: 45, discount: 5, total: 320},
  {id: 10, name: "Картофель", count: 15, price: 20, discount: 0, total: 300},
  {id: 11, name: "Сахар", count: 4, price: 60, discount: 5, total: 220},
];

const selectedRows = ref([]);
const allSelected = ref(false);

function toggleRow(id) {
  if (selectedRows.value.includes(id)) {
    selectedRows.value = selectedRows.value.filter(rowId => rowId !== id);
  } else {
    selectedRows.value.push(id);
  }
}

function isSelected(id) {
  return selectedRows.value.includes(id);
}

function toggleAllRows() {
  if (allSelected.value) {
    selectedRows.value = tableData.map(item => item.id);
  } else {
    selectedRows.value = [];
  }
}

function deleteSelectedRows() {
  tableData.value = tableData.value.filter(item => !selectedRows.value.includes(item.id));
  selectedRows.value = [];
}

function deleteRow(id) {
  tableData.value = tableData.value.filter(item => item.id !== id);
  selectedRows.value = selectedRows.value.filter(rowId => rowId !== id);
}

watch(selectedRows, (val) => {
  allSelected.value = val.length === tableData.length && tableData.length > 0;
});
</script>

<template>
  <div class="w-full h-full flex flex-col gap-2">
    <div class="flex items-center justify-between h-10 min-h-10">
      <p class="text-base">Выбрано - {{ selectedRows.length }}</p>
      <button
          class="btn btn-error text-base text-red-100"
          @click="deleteSelectedRows"
          :disabled="selectedRows.length === 0"
      >
        <trash-icon></trash-icon>
        Удалить
      </button>
    </div>
    <div class="rounded-box border border-base-content/20 bg-base-100 overflow-y-auto">
      <table class="table">
        <thead>
        <tr>
          <th>
            <label>
              <input
                  type="checkbox"
                  class="checkbox"
                  v-model="allSelected"
                  @change="toggleAllRows"
              />
            </label>
          </th>
          <th>Название</th>
          <th>Количество</th>
          <th>Цена</th>
          <th>Скидка</th>
          <th>Итого</th>
          <th>Действие</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in tableData"
            :key="item.id"
            @click="toggleRow(item.id)"
            :class="{ 'bg-base-200': isSelected(item.id) }">
          <th>
            <label>
              <input type="checkbox" class="checkbox" :checked="isSelected(item.id)"
                     @click.stop="toggleRow(item.id)"/>
            </label>
          </th>
          <td>
            <span class="text-lg">{{ item.name }}</span>
          </td>
          <td>
            <span class="text-lg">{{ item.count }}</span>
          </td>
          <td>
            <div class="flex items-center gap-2">
              <span class="text-lg">{{ item.price }}</span>
            </div>
          </td>
          <td>
            <div class="flex items-center gap-2 text-lg">
              <span class="min-w-[70px]">{{ item.discount }}</span>
              <div class="badge badge-warning">%</div>
            </div>
          </td>
          <td>
            <div class="flex items-center gap-2">
              <span class="text-lg">{{ item.total }}</span>
            </div>
          </td>
          <th>
            <button class="px-4 py-3 rounded-lg text-base text-red-600 bg-red-100" @click.stop="deleteRow(item.id)">
              <trash-icon></trash-icon>
            </button>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>