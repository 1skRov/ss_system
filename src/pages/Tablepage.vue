<script setup>
import TrashIcon from "@/assets/icons/TrashIcon.vue";
import NumPad from "@/widjets/NumPad.vue";
import {ref, watch} from "vue";

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

function handleUpdate({value, discountType}, rowId, field) {
  const row = tableData.value.find(item => item.id === rowId);
  if (!row) return;

  if (field === 'total') {
    row.total = value;
  } else {
    row[field] = value;
    if (field === 'discount') {
      row.discountType = discountType;
    }
    recalculateTotal(row);
  }

  closeDropdown();
}

function handleCancel() {
  closeDropdown();
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
          <td @click="toggleRow(item.id)" class="min-w-[200px] cursor-pointer">
            {{ item.name }}
          </td>

          <td class="p-0">
            <div class="dropdown dropdown-left w-full">
              <div tabindex="0" role="button" class="w-full h-full p-4 flex items-center cursor-pointer">
                {{ item.count }}
              </div>
              <div class="dropdown-content z-[1]">
                <NumPad
                    :initialValue="item.count"
                    field="count"
                    @confirm="handleUpdate($event, item.id, 'count')"
                    @cancel="handleCancel"
                />
              </div>
            </div>
          </td>

          <td>
            <div>
              {{ item.price.toFixed(2) }}
            </div>
          </td>

          <td class="p-0">
            <div class="dropdown dropdown-left w-full">
              <div tabindex="0" role="button" class="w-full h-full p-4 flex items-center cursor-pointer gap-2">
                <div :class="['badge', item.discountType === 'percent' ? 'badge-warning' : 'badge-info']">
                  {{ item.discountType === 'percent' ? '%' : '₸' }}
                </div>
                {{ item.discount }}
              </div>
              <div class="dropdown-content z-[1]">
                <NumPad
                    :initialValue="item.discount"
                    :initialDiscountType="item.discountType"
                    field="discount"
                    @confirm="handleUpdate($event, item.id, 'discount')"
                    @cancel="handleCancel"
                />
              </div>
            </div>
          </td>

          <td class="p-0">
            <div class="dropdown dropdown-left w-full">
              <div tabindex="0" role="button" class="w-full h-full p-4 flex items-center cursor-pointer">
                {{ item.total.toFixed(2) }}
              </div>
              <div class="dropdown-content z-[1]">
                <NumPad
                    :initialValue="item.total"
                    field="total"
                    @confirm="handleUpdate($event, item.id, 'total')"
                    @cancel="handleCancel"
                />
              </div>
            </div>
          </td>

          <th>
            <button class="btn btn-ghost btn-square" @click.stop="deleteRow(item.id)">
              <trash-icon class="text-red-500"/>
            </button>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>