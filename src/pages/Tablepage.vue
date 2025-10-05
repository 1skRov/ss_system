<script setup>
import { ref, watch } from 'vue'
import EditModal from '@/components/EditModal.vue'
import NumPanel from '@/components/NumPanel.vue'

const rows = ref([
  {
    id: 1,
    name: 'Круассан с шоколадом',
    qty: 2,
    price: 350,
    discount: 0.1,
    total: 630,
    checked: false,
  },
  {
    id: 2,
    name: 'Слойка с яблоком',
    qty: 1,
    price: 280,
    discount: 0,
    total: 280,
    checked: false,
  },
  {
    id: 3,
    name: 'Пирожок с мясом',
    qty: 3,
    price: 200,
    discount: 0.05,
    total: 570,
    checked: false,
  },
  {
    id: 4,
    name: 'Булочка с изюмом',
    qty: 4,
    price: 150,
    discount: 0,
    total: 600,
    checked: false,
  },
  {
    id: 5,
    name: 'Хачапури по-аджарски',
    qty: 1,
    price: 450,
    discount: 0.15,
    total: 383,
    checked: false,
  },
  {
    id: 6,
    name: 'Самса с курицей',
    qty: 2,
    price: 180,
    discount: 0,
    total: 360,
    checked: false,
  },
  {
    id: 7,
    name: 'Чебурек домашний',
    qty: 1,
    price: 250,
    discount: 0.2,
    total: 200,
    checked: false,
  },
  {
    id: 8,
    name: 'Пицца-слайс Маргарита',
    qty: 2,
    price: 320,
    discount: 0,
    total: 640,
    checked: false,
  },
  {
    id: 9,
    name: 'Штрудель яблочный',
    qty: 1,
    price: 380,
    discount: 0.1,
    total: 342,
    checked: false,
  },
  {
    id: 10,
    name: 'Беляш с картошкой',
    qty: 3,
    price: 160,
    discount: 0.05,
    total: 456,
    checked: false,
  },
  {
    id: 11,
    name: 'Эклер заварной',
    qty: 2,
    price: 220,
    discount: 0,
    total: 440,
    checked: false,
  },
  {
    id: 12,
    name: 'Пончик глазированный',
    qty: 5,
    price: 120,
    discount: 0.1,
    total: 540,
    checked: false,
  },
  {
    id: 13,
    name: 'Кекс шоколадный',
    qty: 1,
    price: 300,
    discount: 0,
    total: 300,
    checked: false,
  },
])

const selectAll = ref(false)
const showModal = ref(false)

watch(selectAll, (value) => {
  rows.value.forEach((row) => (row.checked = value))
})

watch(
  rows,
  (newRows) => {
    const allChecked = newRows.every((row) => row.checked)
    selectAll.value = allChecked
  },
  { deep: true }
)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <article class="border border-gray-300 rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th scope="col" class="w-12 text-center">
            <input
              id="hs-table-checkbox-all"
              type="checkbox"
              class="rounded-sm w-5 h-5"
              v-model="selectAll"
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
              type="checkbox"
              class="rounded-sm w-5 h-5"
              v-model="row.checked"
              @click.stop
            />
          </td>

          <td class="cursor-pointer text-left">
            <label :for="`row-${row.id}`" class="block w-full">
              {{ row.name }}
            </label>
          </td>

          <td class="text-center" @click="openModal">{{ row.qty }}</td>
          <td class="text-center" @click="openModal">{{ row.price }} ₸</td>
          <td
            class="text-center text-orange-500 font-semibold"
            @click="openModal"
          >
            {{ Math.round(row.discount * 100) }}%
          </td>
          <td class="text-center" @click="openModal">{{ row.total }}</td>
          <td>
            <div
              class="text-red-500 text-center font-semibold cursor-pointer"
              @click="null"
            >
              Удалить
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center gap-5 justify-center bg-black/70 z-50"
      @click.self="closeModal"
    >
      <EditModal @close="closeModal" />
      <NumPanel />
    </div>
  </article>
</template>

<style scoped></style>
