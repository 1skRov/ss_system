import { defineStore } from "pinia";
import filialService from "@/services/filialService";

export const useFilialStore = defineStore("filial", {
  state: () => ({
    filials: [],
    kassas: [],
    employees: [],
    clients: [],
    error: null,
    needsSelection: false,
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
      );
    },
    selectedClient(state) {
      if (!state.selectedClientId) return null;
      return (
        state.clients.find(
          (c) => Number(c._id) === Number(state.selectedClientId)
        ) || null
      );
    },
  },

  actions: {
    async fetchPlaces() {
      try {
        const response = await filialService.getPlaces();
        this.filials = response.data?.place_types || [];
        this.kassas = response.data?.places || [];

        if (this.filials.length > 0) {
          this.needsSelection = true;
        }
      } catch (e) {
        this.error = e.message || "Произошла ошибка при получении филиалов.";
      }
    },
    async fetchEmployees(orderId = 0) {
      try {
        const { data } = await filialService.getEmployees(orderId);
        this.employees = data?.items ?? [];
      } catch (e) {
        this.error = e.message || "Ошибка при получении сотрудников.";
        this.employees = [];
      }
    },

    async fetchClients() {
      try {
        const { data } = await filialService.getClients();
        this.clients = data?.items ?? [];
      } catch (e) {
        this.error = e.message || "Ошибка при получении клиентов.";
        this.clients = [];
      }
    },

    setFilialAndKassa(filialId, kassaId) {
      this.selectedFilialId = filialId;
      this.selectedKassaId = kassaId;
      this.needsSelection = false;
      localStorage.setItem("selectedFilialId", filialId);
      localStorage.setItem("selectedKassaId", kassaId);
    },

    setEmployee(employeeId) {
      this.selectedEmployeeId = employeeId;
      localStorage.setItem("selectedEmployeeId", String(employeeId));
    },

    setClient(clientId) {
      this.selectedClientId = clientId ?? null;
      if (clientId == null) localStorage.removeItem("selectedClientId");
      else localStorage.setItem("selectedClientId", String(clientId));
    },

    checkExistingSelection() {
      const filialId = localStorage.getItem("selectedFilialId");
      const kassaId = localStorage.getItem("selectedKassaId");
      const empId = localStorage.getItem("selectedEmployeeId");
      const clientId = localStorage.getItem("selectedClientId");

      if (!filialId || !kassaId) {
        this.needsSelection = true;
      } else {
        const hasFilial = this.filials.some(
          (f) => String(f._id) === String(filialId)
        );
        const hasKassa = this.kassas.some(
          (k) =>
            String(k._id) === String(kassaId) &&
            String(k.stock_id) === String(filialId)
        );
        if (hasFilial && hasKassa) {
          this.selectedFilialId = Number(filialId);
          this.selectedKassaId = Number(kassaId);
          this.needsSelection = false;
        } else {
          this.resetSelection();
          this.needsSelection = true;
        }
      }

      if (this.employees.length && empId) {
        const hasEmp = this.employees.some(
          (e) => String(e._id) === String(empId)
        );
        if (hasEmp) this.selectedEmployeeId = Number(empId);
        else localStorage.removeItem("selectedEmployeeId");
      }

      if (this.clients.length && clientId) {
        const hasClient = this.clients.some(
          (c) => String(c._id) === String(clientId)
        );
        if (hasClient) this.selectedClientId = Number(clientId);
        else localStorage.removeItem("selectedClientId");
      }
    },

    resetSelection() {
      this.needsSelection = false;
      this.selectedFilialId = null;
      this.selectedKassaId = null;
      this.selectedEmployeeId = null;
      this.selectedClientId = null;

      localStorage.removeItem("selectedFilialId");
      localStorage.removeItem("selectedKassaId");
      localStorage.removeItem("selectedEmployeeId");
      localStorage.removeItem("selectedClientId");
    },
  },
});
