<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useFilialStore } from '@/stores/filialStore'
import { useOrderStore } from '@/stores/orderStore'
import Alert from '@/components/UiComponents/AlertMsg.vue'

const router = useRouter()
const filialStore = useFilialStore()
const orderStore = useOrderStore()

const {
  selectedFilialId,
  selectedKassaId,
  selectedEmployeeId,
  selectedClientId,
} = storeToRefs(filialStore)

const alert = ref(null)

onMounted(async () => {
  await filialStore.initSelectionFlow()

  if (!filialStore.employees.length) await filialStore.fetchEmployees(0)
  if (!filialStore.clients.length) await filialStore.fetchClients()
})

watch(selectedFilialId, (newValue, oldValue) => {
  if (oldValue !== null && newValue !== oldValue) {
    selectedKassaId.value = null
  }
})

watch(alert, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      alert.value = null
    }, 3000)
  }
})

const kassasForSelectedFilial = computed(() => {
  if (selectedFilialId.value == null) return []
  const fid = Number(selectedFilialId.value)
  return filialStore.kassas.filter((k) => Number(k.stock_id) === fid)
})

const canConfirm = computed(
  () => !!selectedFilialId.value && !!selectedKassaId.value
)

function fullName(u) {
  const f = u?.first_name || ''
  const l = u?.last_name || ''
  const name = `${f} ${l}`.trim()
  return name || u?.phone || `ID ${u?._id}`
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

  filialStore.setSelection(
    Number(selectedFilialId.value),
    Number(selectedKassaId.value),
    selectedEmployeeId.value ? Number(selectedEmployeeId.value) : null,
    selectedClientId.value ? Number(selectedClientId.value) : null
  )

  try {
    const placeId = Number(selectedFilialId.value)
    await orderStore.createOrder(placeId)
    router.push('/')
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
  <div class="flex items-center justify-center w-full h-full">
    <div class="mt-4">
      <Alert
        v-if="alert"
        :bg="alert.bg"
        :title="alert.title"
        :description="alert.description"
        class="absolute top-0 right-0 w-[500px]"
        @close="alert = null"
      />
    </div>
    <div class="w-full max-w-2xl mx-4 rounded-lg p-5 border border-gray-300">
      <h3 class="modal-title">Выберите филиал и кассу, чтобы продолжить</h3>
      <div class="mt-5 grid grid-cols-2 gap-4">
        <div class="w-full">
          <label class="select-label">Филиал</label>
          <select v-model="selectedFilialId" class="filial-select" autofocus>
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
          <label class="select-label">Касса</label>
          <select
            v-model="selectedKassaId"
            :disabled="!selectedFilialId"
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
          <label class="select-label">Сотрудник (необязательно)</label>
          <select
            v-model="selectedEmployeeId"
            :disabled="!selectedFilialId"
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
          <label class="select-label">Клиент (необязательно)</label>
          <select
            v-model="selectedClientId"
            :disabled="!selectedFilialId"
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
