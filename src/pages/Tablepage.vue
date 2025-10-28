<script setup>
import { ref, watch, computed, onMounted, reactive } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import EditModal from '@/components/EditModal.vue'
import NumPanel from '@/components/NumPanel.vue'

const orderStore = useOrderStore()

const showModal = ref(false)
const activeInput = ref(null)
const modalData = ref({
  qty: '',
  price: '',
  discount: '',
  total: '',
  name: '',
  orderItemId: null,
})
const checkedState = reactive({})
const orderItems = computed(() => orderStore.orderItems)

const rows = computed(() => {
  if (!Array.isArray(orderItems.value)) {
    return []
  }

  return orderItems.value
    .filter((item) => item && item._id && item.good)
    .map((item) => {
      const rowId = item._id.toString()
      if (checkedState[rowId] === undefined) {
        checkedState[rowId] = false
      }
      return {
        id: rowId,
        name: item.good.title || 'Без названия',
        qty: item.amount || 0,
        price: item.good.sale_cost || 0,
        discount: item.discount || 0,
        total: item.cost || 0,
        checked: checkedState[rowId],
      }
    })
})

const selectAll = ref(false)

watch(selectAll, (value) => {
  rows.value.forEach((row) => (checkedState[row.id] = value))
})

const openModal = (row) => {
  modalData.value = {
    name: row.name,
    qty: row.qty.toString(),
    price: row.price.toString(),
    discount: (row.discount * 100).toString(),
    total: row.total.toString(),
    orderItemId: row.id,
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  activeInput.value = null
}

const removeProduct = async (orderItemId) => {
  try {
    await orderStore.removeProduct(orderItemId)
    delete checkedState[orderItemId.toString()]
  } catch (error) {
    console.error('Ошибка при удалении продукта:', error.message)
  }
}

onMounted(async () => {
  if (!orderStore.activeOrderId) {
    await orderStore.ensureOrderExists()
  }
})
</script>

<template>
  <article class="border border-gray-300 rounded-lg overflow-hidden">
    <div v-if="orderStore.error" class="text-center py-8 text-red-500">
      {{ orderStore.error }}
    </div>
    <div v-else-if="rows.length === 0" class="text-center py-8 text-gray-500">
      Корзина пуста. Добавьте товары из каталога.
    </div>
    <table v-else class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th scope="col" class="w-12 text-center">
            <input
              id="hs-table-checkbox-all"
              v-model="selectAll"
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
        <tr v-for="row in rows" :key="row.id">
          <td class="flex items-center justify-center">
            <input
              :id="`row-${row.id}`"
              v-model="row.checked"
              type="checkbox"
              class="rounded-sm w-5 h-5"
              @click.stop
            />
          </td>

          <td class="cursor-pointer text-left">
            <label :for="`row-${row.id}`" class="block w-full">
              {{ row.name }}
            </label>
          </td>

          <td class="text-center" @click="openModal(row)">{{ row.qty }}</td>
          <td class="text-center" @click="openModal(row)">{{ row.price }} ₸</td>
          <td
            class="text-center text-orange-500 font-semibold"
            @click="openModal(row)"
          >
            {{ Math.round(row.discount * 100) }}%
          </td>
          <td class="text-center" @click="openModal(row)">{{ row.total }}</td>
          <td>
            <div
              class="text-red-500 text-center font-semibold cursor-pointer"
              @click="removeProduct(row.id)"
            >
              Удалить
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      @click.self="closeModal"
    >
      <div
        class="w-[90vw] h-[90vh] bg-white rounded-lg p-6 flex gap-5 items-center justify-center"
      >
        <EditModal
          v-model="modalData"
          @focus-input="(input) => (activeInput = input)"
          @close="closeModal"
        />
        <NumPanel v-model="modalData[activeInput]" />
      </div>
    </div>
  </article>
</template>

<style scoped></style>
