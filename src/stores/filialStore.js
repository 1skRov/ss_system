import { defineStore } from "pinia";
import filialService from "@/services/filialService";

export const useFilialStore = defineStore("filial", {
  state: () => ({
    filials: [], // Для place_types
    kassas: [], // Для places
    error: null,
    needsSelection: false,
    selectedFilialId: null,
    selectedKassaId: null,
  }),

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

    setFilialAndKassa(filialId, kassaId) {
      this.selectedFilialId = filialId;
      this.selectedKassaId = kassaId;
      this.needsSelection = false;
      localStorage.setItem("selectedFilialId", filialId);
      localStorage.setItem("selectedKassaId", kassaId);
    },

    checkExistingSelection() {
      const filialId = localStorage.getItem("selectedFilialId");
      const kassaId = localStorage.getItem("selectedKassaId");
      if (filialId && kassaId) {
        this.selectedFilialId = filialId;
        this.selectedKassaId = kassaId;
        this.needsSelection = false;
      }
    },

    resetSelection() {
      this.filials = [];
      this.kassas = [];
      this.needsSelection = false;
      this.selectedFilialId = null;
      this.selectedKassaId = null;
      localStorage.removeItem("selectedFilialId");
      localStorage.removeItem("selectedKassaId");
    },
  },
});
