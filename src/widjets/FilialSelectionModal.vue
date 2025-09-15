<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useFilialStore } from '@/stores/filialStore'

const filialStore = useFilialStore()

const localSelectedFilialId = ref(
  filialStore.selectedFilialId ? Number(filialStore.selectedFilialId) : null
)
const localSelectedKassaId = ref(
  filialStore.selectedKassaId ? Number(filialStore.selectedKassaId) : null
)
const localSelectedEmployeeId = ref(
  filialStore.selectedEmployeeId ? Number(filialStore.selectedEmployeeId) : null
)
const localSelectedClientId = ref(filialStore.selectedClientId || null)

onMounted(async () => {
  if (!filialStore.employees.length) await filialStore.fetchEmployees(0)
  if (!filialStore.clients.length) await filialStore.fetchClients()
  filialStore.checkExistingSelection()
  if (filialStore.selectedEmployeeId)
    localSelectedEmployeeId.value = Number(filialStore.selectedEmployeeId)
  if (filialStore.selectedClientId)
    localSelectedClientId.value = Number(filialStore.selectedClientId)
})

const kassasForSelectedFilial = computed(() => {
  if (localSelectedFilialId.value == null) return []
  const fid = Number(localSelectedFilialId.value)
  return filialStore.kassas.filter((k) => Number(k.stock_id) === fid)
})

watch(localSelectedFilialId, () => {
  localSelectedKassaId.value = null
})

const canConfirm = computed(
  () =>
    !!localSelectedFilialId.value &&
    !!localSelectedKassaId.value &&
    !!localSelectedEmployeeId.value
)

function fullName(u) {
  const f = u?.first_name || ''
  const l = u?.last_name || ''
  const name = `${f} ${l}`.trim()
  return name || u?.phone || `ID ${u?._id}`
}

function confirmSelection() {
  if (!canConfirm.value) return

  filialStore.setFilialAndKassa(
    Number(localSelectedFilialId.value),
    Number(localSelectedKassaId.value)
  )

  filialStore.setEmployee(Number(localSelectedEmployeeId.value))

  filialStore.setClient(
    localSelectedClientId.value ? Number(localSelectedClientId.value) : null
  )
}
</script>

<template>
  <dialog id="filial_modal" class="modal modal-open">
    <div class="modal-box w-1/2">
      <div class="form-control w-full flex flex-col gap-0.5">
        <label class="label text-sm">
          <span class="label-text">Выберите филиал из списка</span>
        </label>
        <select
          class="select select-bordered select-sm w-full"
          v-model="localSelectedFilialId"
        >
          <option disabled :value="null" class="text-base">
            Выберите филиал
          </option>
          <option
            v-for="filial in filialStore.filials"
            :key="filial._id"
            :value="Number(filial._id)"
            class="text-base"
          >
            {{ filial.title }}
          </option>
        </select>
      </div>

      <div class="form-control w-full mt-4 flex flex-col gap-0.5">
        <label class="label">
          <span class="label-text">Выберите кассу из списка</span>
        </label>
        <select
          class="select select-bordered select-sm w-full"
          v-model="localSelectedKassaId"
          :disabled="!localSelectedFilialId"
        >
          <option disabled :value="null" class="text-base">
            Выберите кассу
          </option>
          <option
            v-for="kassa in kassasForSelectedFilial"
            :key="kassa._id"
            :value="Number(kassa._id)"
            class="text-base"
          >
            {{ kassa.title }}
          </option>
        </select>
      </div>

      <div class="form-control w-full mt-4 flex flex-col gap-0.5">
        <label class="label">
          <span class="label-text">Выберите сотрудника из списка</span>
        </label>
        <select
          class="select select-bordered select-sm w-full"
          v-model="localSelectedEmployeeId"
        >
          <option disabled :value="null" class="text-base">
            Выберите сотрудника
          </option>
          <option
            v-for="emp in filialStore.employees"
            :key="emp._id"
            :value="Number(emp._id)"
            class="text-base"
          >
            {{ fullName(emp) }}
          </option>
        </select>
      </div>

      <div class="form-control w-full mt-4 flex flex-col gap-0.5">
        <label class="label">
          <span class="label-text"
            >Выберите клиента из списка (необязательно)</span
          >
        </label>
        <select
          class="select select-bordered select-sm w-full"
          v-model="localSelectedClientId"
        >
          <option :value="null" class="text-base">Без клиента</option>
          <option
            v-for="cl in filialStore.clients"
            :key="cl._id"
            :value="Number(cl._id)"
            class="text-base"
          >
            {{ fullName(cl) }}
          </option>
        </select>
      </div>

      <div class="modal-action">
        <button
          class="btn btn-primary w-full btn-sm"
          :disabled="!canConfirm"
          @click="confirmSelection"
        >
          Подтвердить
        </button>
      </div>
    </div>
  </dialog>
</template>
