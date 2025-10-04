<script setup>
import { ref } from 'vue'
import TrashIcon from '@/assets/icons/TrashIcon.vue'
import EditValueModal from '@/components/EditValueModal.vue'

const items = ref([
  {
    _id: 1,
    name: 'Эспрессо',
    quantity: 1,
    price: 500,
    discount: 0,
    total: 500,
  },
  {
    _id: 2,
    name: 'Латте',
    quantity: 2,
    price: 800,
    discount: 100,
    total: 1500,
  },
  {
    _id: 3,
    name: 'Капучино',
    quantity: 1,
    price: 600,
    discount: 50,
    total: 550,
  },
  {
    _id: 4,
    name: 'Американо',
    quantity: 3,
    price: 400,
    discount: 0,
    total: 1200,
  },
  {
    _id: 5,
    name: 'Мокко',
    quantity: 2,
    price: 700,
    discount: 100,
    total: 1300,
  },
  {
    _id: 6,
    name: 'Фраппучино',
    quantity: 1,
    price: 900,
    discount: 0,
    total: 900,
  },
  {
    _id: 7,
    name: 'Чай',
    quantity: 4,
    price: 300,
    discount: 0,
    total: 1200,
  },
  {
    _id: 8,
    name: 'Матча',
    quantity: 1,
    price: 1000,
    discount: 200,
    total: 800,
  },
  {
    _id: 9,
    name: 'Какао',
    quantity: 2,
    price: 500,
    discount: 50,
    total: 950,
  },
  {
    _id: 10,
    name: 'Лимонад',
    quantity: 3,
    price: 400,
    discount: 0,
    total: 1200,
  },
  {
    _id: 11,
    name: 'Смузи',
    quantity: 1,
    price: 700,
    discount: 0,
    total: 700,
  },
  {
    _id: 12,
    name: 'Молочный коктейль',
    quantity: 2,
    price: 600,
    discount: 100,
    total: 1100,
  },
  {
    _id: 13,
    name: 'Энергетик',
    quantity: 1,
    price: 800,
    discount: 0,
    total: 800,
  },
  {
    _id: 14,
    name: 'Вода',
    quantity: 5,
    price: 100,
    discount: 0,
    total: 500,
  },
  {
    _id: 15,
    name: 'Сок',
    quantity: 2,
    price: 400,
    discount: 50,
    total: 750,
  },
  {
    _id: 16,
    name: 'Чай латте',
    quantity: 1,
    price: 600,
    discount: 0,
    total: 600,
  },
  {
    _id: 17,
    name: 'Раф',
    quantity: 1,
    price: 700,
    discount: 100,
    total: 600,
  },
  {
    _id: 18,
    name: 'Горячий шоколад',
    quantity: 2,
    price: 500,
    discount: 50,
    total: 950,
  },
  {
    _id: 19,
    name: 'Айс кофе',
    quantity: 1,
    price: 800,
    discount: 0,
    total: 800,
  },
  {
    _id: 20,
    name: 'Флэт уайт',
    quantity: 1,
    price: 600,
    discount: 0,
    total: 600,
  },
])

const isModalOpen = ref(false)

function openEditModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}
</script>

<template>
  <section class="w-full h-full">
    <div class="overflow-hidden border border-gray-200 rounded-lg mt-2">
      <table
        class="w-full divide-y divide-gray-200 table-fixed overflow-hidden bg-white"
      >
        <thead>
          <tr>
            <th scope="col">Товар</th>
            <th scope="col" style="width: 180px">Количество</th>
            <th scope="col" style="width: 150px">Цена</th>
            <th scope="col" style="width: 100px">Скидка</th>
            <th scope="col" style="width: 150px">Итого</th>
            <th scope="col" style="width: 90px">Действие</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="item in items" :key="item._id">
            <td>
              {{ item.name }}
            </td>
            <td @click="openEditModal(item, 'quantity')">
              {{ item.quantity }}
            </td>
            <td @click="openEditModal(item, 'price')">
              {{ item.price }}
            </td>
            <td @click="openEditModal(item, 'discount')">
              <div class="flex items-center">
                <span class="mr-2">{{ item.discount }}</span>
                <div
                  class="text-yellow-600 bg-yellow-100 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  %
                </div>
              </div>
            </td>
            <td>
              {{ item.total }}
            </td>
            <td @click="deleteItem()">
              <div class="flex items-center justify-center">
                <button class="text-red-500 hover:text-red-700">
                  <TrashIcon />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <EditValueModal :show="isModalOpen" @close="closeModal" />
</template>
<style scoped lang="scss">
table {
  th {
    text-align: start;
    padding: 10px 0 10px 8px;
    font-size: 1rem;
    font-weight: 500;
  }
  td {
    height: 50px;
    padding: 0 4px 0 10px;
    font-size: 0.875rem;
    min-width: 90px;
    transition: background-color 0.2s ease-in-out;
  }
}
</style>
