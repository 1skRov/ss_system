<script setup>
import TrashIcon from "@/assets/icons/TrashIcon.vue";
import { ref, watch, computed } from "vue";
import EditDrawer from "@/widjets/EditDrawer.vue";
import EditIcon from "@/assets/icons/EditIcin.vue";
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const tableData = computed(() => cartStore.products);

const selectedRows = ref([]);
const drawerOpen = ref(false);
const editingItem = ref(null);

const allSelected = computed({
  get: () => {
    return tableData.value.length > 0 && selectedRows.value.length === tableData.value.length;
  },
  set: (value) => {
    if (value) {
      selectedRows.value = tableData.value.map(item => item.id);
    } else {
      selectedRows.value = [];
    }
  }
});

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

function deleteSelectedRows() {
  cartStore.deleteSelectedProducts(selectedRows.value);
  selectedRows.value = [];
}

function deleteRow(id) {
  cartStore.deleteProduct(id);
  selectedRows.value = selectedRows.value.filter(rowId => rowId !== id);
}

function openEditDrawer(item) {
  editingItem.value = { ...item };
  drawerOpen.value = true;
}

function closeDrawer() {
  drawerOpen.value = false;
  editingItem.value = null;
}

function saveItem(updatedItem) {
  const index = cartStore.rawProducts.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) {
    cartStore.rawProducts[index] = updatedItem;
  }
  closeDrawer();
}

</script>

<template>
  <div class="drawer drawer-end">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" v-model="drawerOpen" />
    <div class="drawer-content">
    </div>
    <div class="drawer-side" @click.self="drawerOpen = false">
      <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
      <div style="width: 70vw" class="bg-base-100 min-h-full px-3 py-4">
        <EditDrawer v-if="editingItem" :item="editingItem" @save="saveItem" @cancel="closeDrawer"></EditDrawer>
      </div>
    </div>
  </div>
  <div class="w-full h-full flex flex-col gap-2">
    <div class="flex items-center justify-between h-10 min-h-10">
      <p class="text-base">Выбрано - {{ selectedRows.length }}</p>
      <button class="btn btn-error text-base text-red-100" @click="deleteSelectedRows"
        :disabled="selectedRows.length === 0">
        <trash-icon />
        Удалить
      </button>
    </div>
    <div class="rounded-box border border-base-content/20 bg-base-100 overflow-y-auto">
      <table class="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" v-model="allSelected" />
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
                <input type="checkbox" class="checkbox" :checked="isSelected(item.id)"
                  @click.stop="toggleRow(item.id)" />
              </label>
            </th>
            <td @click="toggleRow(item.id)" class="min-w-[200px] ">
              {{ item.name }}
            </td>
            <td>
              {{ item.quantity }}
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
                <trash-icon class="text-white" />
              </button>
              <button class="btn btn-info ml-2" @click="openEditDrawer(item)">
                <edit-icon class="text-white" />
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>