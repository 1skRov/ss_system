<script setup>
import TrashIcon from "@/assets/icons/TrashIcon.vue";
import PencilIcon from "@/assets/icons/EditIcon.vue";
import { ref, watch, computed } from "vue";

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

const isDrawerOpen = ref(false);
const editingItem = ref(null);
const activeEditField = ref('count');
const drawerInputValue = ref('');
const drawerDiscountType = ref('percent');

const drawerFieldTitle = computed(() => {
  if (!editingItem.value) return '';
  switch (activeEditField.value) {
    case 'count': return 'Количество';
    case 'discount': return 'Скидка';
    case 'total': return 'Итого';
    default: return 'Редактирование';
  }
});

function recalculateTotal(row) {
  const subtotal = row.price * row.count;
  if (row.discountType === 'percent') {
    const discountValue = Math.min(row.discount, 100);
    row.total = subtotal - (subtotal * discountValue / 100);
  } else {
    const discountValue = Math.min(row.discount, subtotal);
    row.total = subtotal - discountValue;
  }
}

function increaseCount(item) {
  item.count++;
  recalculateTotal(item);
}

function decreaseCount(item) {
  if (item.count > 1) {
    item.count--;
    recalculateTotal(item);
  }
}

function openEditDrawer(item) {
  editingItem.value = { ...item };
  activeEditField.value = 'count';
  drawerInputValue.value = editingItem.value.count.toString();
  drawerDiscountType.value = editingItem.value.discountType;
  isDrawerOpen.value = true;
}

function closeDrawer() {
  isDrawerOpen.value = false;
  setTimeout(() => {
    editingItem.value = null;
  }, 300);
}

function selectEditField(field) {
  activeEditField.value = field;
  drawerInputValue.value = editingItem.value[field].toString();
}

function handleDrawerInput(char) {
  if (char === '.' && drawerInputValue.value.includes('.')) return;
  if (drawerInputValue.value === '0' && char !== '.') {
    drawerInputValue.value = char;
  } else {
    drawerInputValue.value += char;
  }
}

function handleDrawerBackspace() {
  drawerInputValue.value = drawerInputValue.value.slice(0, -1);
  if (drawerInputValue.value === '') {
    drawerInputValue.value = '0';
  }
}

function toggleDrawerDiscountType() {
  drawerDiscountType.value = drawerDiscountType.value === 'percent' ? 'fixed' : 'percent';
}

function confirmDrawerChanges() {
  const value = parseFloat(drawerInputValue.value);
  if (isNaN(value) || !editingItem.value) {
    closeDrawer();
    return;
  }

  const originalItem = tableData.value.find(i => i.id === editingItem.value.id);
  if (!originalItem) return;

  switch (activeEditField.value) {
    case 'count':
      originalItem.count = value;
      recalculateTotal(originalItem);
      break;
    case 'discount':
      originalItem.discount = value;
      originalItem.discountType = drawerDiscountType.value;
      recalculateTotal(originalItem);
      break;
    case 'total':
      originalItem.total = value;
      break;
  }

  closeDrawer();
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
  <div :class="['drawer drawer-bottom', { 'drawer-open': isDrawerOpen }]">
    <input id="edit-drawer" type="checkbox" class="drawer-toggle" v-model="isDrawerOpen" />

    <div class="drawer-content w-full h-full flex flex-col gap-2 p-4">
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
              <div class="flex items-center justify-center gap-3 h-full px-2">
                <button class="btn btn-sm btn-circle" @click="decreaseCount(item)">-</button>
                <span class="font-mono text-xl w-8 text-center">{{ item.count }}</span>
                <button class="btn btn-sm btn-circle" @click="increaseCount(item)">+</button>
              </div>
            </td>

            <td>
              <div>{{ item.price.toFixed(2) }}</div>
            </td>

            <td>
              <div class="flex items-center justify-between gap-2">
                {{ item.discount }}
                <div :class="['badge', item.discountType === 'percent' ? 'badge-warning' : 'badge-info']" v-show="item.discount > 0">
                  {{ item.discountType === 'percent' ? '%' : '₸' }}
                </div>
              </div>
            </td>

            <td>{{ item.total.toFixed(2) }}</td>

            <th>
              <div class="flex items-center gap-1">
                <button class="btn btn-ghost btn-square" @click.stop="openEditDrawer(item)">
                  <pencil-icon class="text-info"/>
                </button>
                <button class="btn btn-ghost btn-square" @click.stop="deleteRow(item.id)">
                  <trash-icon class="text-error"/>
                </button>
              </div>
            </th>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="drawer-side" style="z-index: 1000;">
      <label for="edit-drawer" class="drawer-overlay" @click="closeDrawer"></label>
      <div v-if="editingItem" class="p-4 w-full max-w-md mx-auto bg-base-200 text-base-content flex flex-col gap-3 rounded-t-box">
        <h3 class="font-bold text-lg text-center">Редактирование: {{ editingItem.name }}</h3>

        <div class="btn-group w-full">
          <button @click="selectEditField('count')" :class="['btn btn-outline w-1/3', { 'btn-active': activeEditField === 'count' }]">Кол-во</button>
          <button @click="selectEditField('discount')" :class="['btn btn-outline w-1/3', { 'btn-active': activeEditField === 'discount' }]">Скидка</button>
          <button @click="selectEditField('total')" :class="['btn btn-outline w-1/3', { 'btn-active': activeEditField === 'total' }]">Итого</button>
        </div>

        <div class="rounded w-full bg-base-300 shadow-xl px-2 py-3 flex flex-col gap-2 border border-accent">
          <p class="text-center font-bold text-base m-0 mb-1">{{ drawerFieldTitle }}</p>
          <div class="p-2 bg-base-100 text-right text-xl font-mono h-10 rounded">{{ drawerInputValue }}</div>

          <button
              v-if="activeEditField === 'discount'"
              class="btn btn-neutral text-white w-full"
              @click="toggleDrawerDiscountType"
          >
            Скидка в: {{ drawerDiscountType === 'percent' ? '%' : '₸' }}
          </button>

          <div class="grid grid-cols-3 gap-2">
            <button v-for="i in 9" :key="i" class="btn btn-lg" @click="handleDrawerInput(i.toString())">{{ i }}</button>
            <button class="btn btn-lg" @click="handleDrawerInput('0')">0</button>
            <button class="btn btn-lg" @click="handleDrawerInput('.')">.</button>
            <button class="btn btn-warning btn-lg" @click="handleDrawerBackspace">←</button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button class="btn btn-error" @click="closeDrawer">Отмена</button>
          <button class="btn btn-success" @click="confirmDrawerChanges">OK</button>
        </div>
      </div>
    </div>

  </div>
</template>