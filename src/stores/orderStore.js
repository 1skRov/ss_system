import { defineStore } from "pinia";
import OrderService from "@/services/orderService";

export const useOrderStore = defineStore("order", {
  state: () => ({ orders: [], error: null, isLoading: false }),

  actions: {
    async fetchOrders() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await OrderService.getOrders();
        this.orders = response.data?.orders || [];
      } catch (e) {
        this.error = e.message || "Произошла ошибка при получении заказов.";
        this.orders = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
});
