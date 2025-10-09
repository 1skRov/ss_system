<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useFilialStore } from '@/stores/filialStore'
import { useOrderStore } from '@/stores/orderStore'
import Alert from './UiComponents/AlertMsg.vue'

const filialStore = useFilialStore()
const orderStore = useOrderStore()

const localSelectedFilialId = ref(null)
const localSelectedKassaId = ref(null)
const localSelectedEmployeeId = ref(null)
const localSelectedClientId = ref(null)

const alert = ref(null)

onMounted(async () => {
  await filialStore.initSelectionFlow()

  if (filialStore.selectedFilialId)
    localSelectedFilialId.value = Number(filialStore.selectedFilialId)
  if (filialStore.selectedKassaId)
    localSelectedKassaId.value = Number(filialStore.selectedKassaId)
  if (filialStore.selectedEmployeeId)
    localSelectedEmployeeId.value = Number(filialStore.selectedEmployeeId)
  if (filialStore.selectedClientId)
    localSelectedClientId.value = Number(filialStore.selectedClientId)

  await ensureOptionalsLoaded()
})

watch(localSelectedFilialId, () => {
  localSelectedKassaId.value = null
})

watch(alert, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      alert.value = null
    }, 3000)
  }
})

const kassasForSelectedFilial = computed(() => {
  if (localSelectedFilialId.value == null) return []
  const fid = Number(localSelectedFilialId.value)
  return filialStore.kassas.filter((k) => Number(k.stock_id) === fid)
})

const canConfirm = computed(
  () => !!localSelectedFilialId.value && !!localSelectedKassaId.value
)

function fullName(u) {
  const f = u?.first_name || ''
  const l = u?.last_name || ''
  const name = `${f} ${l}`.trim()
  return name || u?.phone || `ID ${u?._id}`
}

async function ensureOptionalsLoaded() {
  if (filialStore.needsSelection) {
    if (!filialStore.employees.length) await filialStore.fetchEmployees(0)
    if (!filialStore.clients.length) await filialStore.fetchClients()
    filialStore.checkExistingSelection()
  }
}

async function confirmSelection() {
  if (!canConfirm.value) {
    alert.value = {
      bg: 'error',
      title: 'Не все поля заполнены',
      description: 'Пожалуйста, выберите филиал и кассу для продолжения.',
    }
    return
  }

  filialStore.setFilialAndKassa(
    Number(localSelectedFilialId.value),
    Number(localSelectedKassaId.value)
  )
  filialStore.setEmployee(
    localSelectedEmployeeId.value ? Number(localSelectedEmployeeId.value) : null
  )
  filialStore.setClient(
    localSelectedClientId.value ? Number(localSelectedClientId.value) : null
  )

  try {
    const placeId = Number(localSelectedFilialId.value)
    await orderStore.createOrder(placeId)
  } catch (error) {
    alert.value = {
      bg: 'error',
      title: 'Ошибка при создании заказа',
      description: error.message || 'Не удалось создать заказ.',
    }
  }
}
</script>

<template>
  <div
    v-if="filialStore.needsSelection"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div class="absolute inset-0 bg-black/80"></div>
    <div class="mt-4">
      <Alert
        v-if="alert"
        :bg="alert.bg"
        :title="alert.title"
        :description="alert.description"
        @close="alert = null"
        class="absolute top-0 left-0 right-0 w-1/2 mx-auto"
      />
    </div>
    <div class="relative w-full max-w-2xl mx-4 rounded-lg bg-white px-6 py-5">
      <h3 class="text-xl font-semibold">
        Выберите филиал и кассу, чтобы продолжить
      </h3>

      <div class="mt-5 grid grid-cols-2 gap-4">
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Филиал</label
          >
          <select
            v-model="localSelectedFilialId"
            class="filial-select"
            autofocus
          >
            <option :value="null" disabled>Выберите филиал</option>
            <option
              v-for="filial in filialStore.filials"
              :key="filial._id"
              :value="Number(filial._id)"
            >
              {{ filial.title }}
            </option>
          </select>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Касса</label
          >
          <select
            v-model="localSelectedKassaId"
            :disabled="!localSelectedFilialId"
            class="filial-select"
          >
            <option :value="null" disabled>Выберите кассу</option>
            <option
              v-for="k in kassasForSelectedFilial"
              :key="k._id"
              :value="Number(k._id)"
            >
              {{ k.title }}
            </option>
          </select>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Сотрудник (необязательно)</label
          >
          <select
            v-model="localSelectedEmployeeId"
            :disabled="!localSelectedFilialId"
            class="filial-select"
          >
            <option :value="null">Без сотрудника</option>
            <option
              v-for="emp in filialStore.employees"
              :key="emp._id"
              :value="Number(emp._id)"
            >
              {{ fullName(emp) }}
            </option>
          </select>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Клиент (необязательно)</label
          >
          <select
            v-model="localSelectedClientId"
            :disabled="!localSelectedFilialId"
            class="filial-select"
          >
            <option :value="null">Без клиента</option>
            <option
              v-for="cl in filialStore.clients"
              :key="cl._id"
              :value="Number(cl._id)"
            >
              {{ fullName(cl) }}
            </option>
          </select>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end">
        <button
          class="px-5 py-3 rounded-lg text-white font-medium"
          style="background: var(--color-navy-blue)"
          :class="{ 'opacity-50': !canConfirm }"
          @click="confirmSelection"
        >
          Продолжить
        </button>

        <p v-if="filialStore.error" class="text-sm text-red-600">
          {{ filialStore.error }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filial-select:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}
</style>
