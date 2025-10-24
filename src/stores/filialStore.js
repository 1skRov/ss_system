import { defineStore } from 'pinia'
import filialService from '@/services/filialService'

export const useFilialStore = defineStore('filial', {
  state: () => ({
    filials: [],
    kassas: [],
    employees: [],
    clients: [],
    error: null,
    selectedFilialId: null,
    selectedKassaId: null,
    selectedEmployeeId: null,
    selectedClientId: null,
  }),

  getters: {
    selectedEmployee(state) {
      return (
        state.employees.find(
          (e) => Number(e._id) === Number(state.selectedEmployeeId)
        ) || null
      )
    },
    selectedClient(state) {
      if (!state.selectedClientId) return null
      return (
        state.clients.find(
          (c) => Number(c._id) === Number(state.selectedClientId)
        ) || null
      )
    },
  },

  actions: {
    async initSelectionFlow() {
      await this.fetchPlaces()
      this.checkExistingSelection()
    },

    async fetchPlaces() {
      if (this.filials.length && this.kassas.length) return
      try {
        const { data } = await filialService.getPlaces()
        this.filials = data?.place_types || []
        this.kassas = data?.places || []
      } catch (e) {
        this.error = e?.message || 'Произошла ошибка при получении филиалов.'
        console.error(this.error)
        this.filials = []
        this.kassas = []
      }
    },

    async fetchEmployees(orderId = 0) {
      try {
        const { data } = await filialService.getEmployees(orderId)
        this.employees = data?.items ?? []
      } catch (e) {
        this.error = e?.message || 'Ошибка при получении сотрудников.'
        console.error(this.error)
        this.employees = []
      }
    },

    async fetchClients() {
      try {
        const { data } = await filialService.getClients()
        this.clients = data?.items ?? []
      } catch (e) {
        this.error = e?.message || 'Ошибка при получении клиентов.'
        console.error(this.error)
        this.clients = []
      }
    },

    setSelection(filialId, kassaId, employeeId, clientId) {
      this.selectedFilialId = filialId
      this.selectedKassaId = kassaId
      this.selectedEmployeeId = employeeId ?? null
      this.selectedClientId = clientId ?? null

      if (filialId) localStorage.setItem('selectedFilialId', String(filialId))
      else localStorage.removeItem('selectedFilialId')

      if (kassaId) localStorage.setItem('selectedKassaId', String(kassaId))
      else localStorage.removeItem('selectedKassaId')

      if (employeeId)
        localStorage.setItem('selectedEmployeeId', String(employeeId))
      else localStorage.removeItem('selectedEmployeeId')

      if (clientId) localStorage.setItem('selectedClientId', String(clientId))
      else localStorage.removeItem('selectedClientId')
    },

    checkExistingSelection() {
      const filialId = localStorage.getItem('selectedFilialId')
      const kassaId = localStorage.getItem('selectedKassaId')
      const empId = localStorage.getItem('selectedEmployeeId')
      const clientId = localStorage.getItem('selectedClientId')

      if (filialId && kassaId) {
        const isFilialValid = this.filials.some(
          (f) => String(f._id) === filialId
        )
        const isKassaValid = this.kassas.some(
          (k) => String(k._id) === kassaId && String(k.stock_id) === filialId
        )

        if (isFilialValid && isKassaValid) {
          this.selectedFilialId = Number(filialId)
          this.selectedKassaId = Number(kassaId)
        } else {
          this.resetSelection()
          return
        }
      } else {
        return
      }

      if (this.employees.length && empId) {
        const hasEmp = this.employees.some((e) => String(e._id) === empId)
        this.selectedEmployeeId = hasEmp ? Number(empId) : null
        if (!hasEmp) localStorage.removeItem('selectedEmployeeId')
      }

      if (this.clients.length && clientId) {
        const hasClient = this.clients.some((c) => String(c._id) === clientId)
        this.selectedClientId = hasClient ? Number(clientId) : null
        if (!hasClient) localStorage.removeItem('selectedClientId')
      }
    },

    resetSelection() {
      this.selectedFilialId = null
      this.selectedKassaId = null
      this.selectedEmployeeId = null
      this.selectedClientId = null

      localStorage.removeItem('selectedFilialId')
      localStorage.removeItem('selectedKassaId')
      localStorage.removeItem('selectedEmployeeId')
      localStorage.removeItem('selectedClientId')
    },
  },
})
