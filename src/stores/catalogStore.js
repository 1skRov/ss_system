import { defineStore } from "pinia";
import catalogService from "@/services/catalogService";
export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    categories: [],
    products: [],
    error: null,
    isLoadingProducts: false,
  }),

  actions: {
    async fetchCategories() {
      try {
        const response = await catalogService.getCategories();
        this.categories = response.data?.items || [];
        console.log("Categories fetched successfully:", this.categories);
      } catch (e) {
        this.error = e.message || "Произошла ошибка при получении категорий.";
      }
    },

    async fetchProducts(categoryId) {
      this.isLoadingProducts = true;
      this.products = [];
      try {
        const response = await catalogService.getProducts(categoryId);
        this.products = response.data?.items || [];
      } catch (e) {
        this.error = e.message || "Произошла ошибка при получении продуктов.";
      } finally {
        this.isLoadingProducts = false;
      }
    },
  },
});
