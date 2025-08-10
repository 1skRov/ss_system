import { defineStore } from "pinia";
import OrderService from "@/services/filialService";

export const useOrderStore = defineStore("order", {
  state: () => ({ orders: null }),

  actions: {
    async fetchOrders() {
      try {
        const response = await OrderService.getOrders();
        this.orders = response.data?.orders || [];
      } catch (e) {
        this.error = e.message || "Произошла ошибка при получении заказов.";
      }
    },
  },
});
