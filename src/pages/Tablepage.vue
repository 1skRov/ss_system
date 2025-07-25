<script setup>
import TrashIcon from "@/assets/icons/TrashIcon.vue";
import {ref, watch} from "vue";
import EditDrawer from "@/widjets/EditDrawer.vue";
import EditIcin from "@/assets/icons/EditIcin.vue";

const tableData = ref([
  {id: 1, name: "Хлебо-булочное изделие", count: 12, price: 100, discount: 10, discountType: 'percent', total: 1080},
  {id: 2, name: "Молоко", count: 5, price: 80, discount: 0, discountType: 'percent', total: 400},
  {id: 3, name: "Сыр", count: 2, price: 350, discount: 50, discountType: 'fixed', total: 650},
  {id: 4, name: "Яблоки", count: 10, price: 30, discount: 5, discountType: 'percent', total: 285},
  {id: 5, name: "Масло сливочное", count: 1, price: 200, discount: 20, discountType: 'percent', total: 160},
  {id: 6, name: "Куриные яйца", count: 30, price: 12, discount: 0, discountType: 'percent', total: 360},
  {id: 7, name: "Гречневая крупа", count: 3, price: 90, discount: 10, discountType: 'percent', total: 243},
  {id: 8, name: "Колбаса варёная", count: 2, price: 270, discount: 30, discountType: 'fixed', total: 510},
  {id: 9, name: "Томаты", count: 8, price: 45, discount: 5, discountType: 'percent', total: 342},
  {id: 10, name: "Картофель", count: 15, price: 20, discount: 0, discountType: 'percent', total: 300},
  {id: 11, name: "Сахар", count: 4, price: 60, discount: 5, discountType: 'percent', total: 228},
]);

const selectedRows = ref([]);
const allSelected = ref(false);
const drawerOpen = ref(false);

function closeDropdown() {
  if (document.activeElement) {
    document.activeElement.blur();
  }
}

function recalculateTotal(row) {
  const subtotal = row.price * row.count;
  if (row.discountType === 'percent') {
    row.total = subtotal - (subtotal * row.discount / 100);
  } else {
    row.total = subtotal - row.discount;
  }
}

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
    selectedRows.value = tableData.value.map(item => item.id);
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
  allSelected.value = val.length === tableData.value.length && tableData.value.length > 0;
});

watch(tableData, () => {
  allSelected.value = selectedRows.value.length === tableData.value.length && tableData.value.length > 0;
}, {deep: true});
</script>

<template>
  <div class="drawer drawer-end">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" v-model="drawerOpen"/>
    <div class="drawer-content">
    </div>
    <div class="drawer-side" @click.self="drawerOpen = false">
      <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
      <div style="width: 70vw" class="bg-base-100 min-h-full px-3 py-4">
        <EditDrawer></EditDrawer>
      </div>
    </div>
  </div>
  <div class="w-full h-full flex flex-col gap-2">
    <div class="flex items-center justify-between h-10 min-h-10">
      <p class="text-base">Выбрано - {{ selectedRows.length }}</p>
      <button
          class="btn btn-error text-base text-red-100"
          @click="deleteSelectedRows"
          :disabled="selectedRows.length === 0"
      >
        <trash-icon/>
        Удалить
      </button>
    </div>
    <div class="rounded-box border border-base-content/20 bg-base-100 overflow-y-auto">
      <table class="table">
        <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" v-model="allSelected" @change="toggleAllRows"/>
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
        <tr v-for="item in tableData" :key="item.id" :class="{ 'bg-base-200': isSelected(item.id) }" class="text-lg">
          <th>
            <label>
              <input type="checkbox" class="checkbox" :checked="isSelected(item.id)" @click.stop="toggleRow(item.id)"/>
            </label>
          </th>
          <td @click="toggleRow(item.id)" class="min-w-[200px] ">
            {{ item.name }}
          </td>
          <td>
            {{ item.count }}
          </td>
          <td>
            {{ item.price.toFixed(2) }}
          </td>
          <td>
            <div class="flex items-center justify-between gap-2">
              {{ item.discount }}
              <div :class="['badge', item.discountType === 'percent' ? 'badge-warning' : 'badge-info']"
                   v-show="item.discount > 0">
                {{ item.discountType === 'percent' ? '%' : '₸' }}
              </div>
            </div>
          </td>
          <td>
            {{ item.total.toFixed(2) }}
          </td>
          <th>
            <div class="flex"></div>
            <button class="btn btn-error" @click.stop="deleteRow(item.id)">
              <trash-icon class="text-white"/>
            </button>
            <button class="btn btn-info ml-2" @click="drawerOpen = true">
              <edit-icin class="text-white"/>
            </button>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>