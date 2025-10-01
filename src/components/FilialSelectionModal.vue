<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useFilialStore } from '@/stores/filialStore'

const filialStore = useFilialStore()

const localSelectedFilialId = ref(null)
const localSelectedKassaId = ref(null)
const localSelectedEmployeeId = ref(null)
const localSelectedClientId = ref(null)

const kassasForSelectedFilial = computed(() => {
  if (localSelectedFilialId.value == null) return []
  const fid = Number(localSelectedFilialId.value)
  return filialStore.kassas.filter((k) => Number(k.stock_id) === fid)
})

watch(localSelectedFilialId, () => {
  localSelectedKassaId.value = null
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

function confirmSelection() {
  if (!canConfirm.value) return
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
}
</script>

<template>
  <Transition name="fade-scale">
    <div
      v-if="filialStore.needsSelection"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="absolute inset-0 bg-black/60"></div>

      <div class="relative w-full max-w-2xl mx-4 rounded-lg bg-white">
        <div class="px-6 py-5">
          <h3 id="modal-title" class="text-xl font-semibold text-black">
            Выберите филиал и кассу, чтобы продолжить
          </h3>

          <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Филиал</label
              >
              <select
                v-model="localSelectedFilialId"
                class="block w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                class="block w-full rounded-lg border border-gray-300 bg-white p-3 text-sm disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                class="block w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                class="block w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

          <div class="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              class="button blue-button px-3 py-2"
              :disabled="!canConfirm"
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
    </div>
  </Transition>
</template>

<style scoped></style>
