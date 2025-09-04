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
      this.isLoadingProducts = true;
      this.error = null;
      try {
        const response = await catalogService.getCategories();
        this.categories = response.data?.items || [];
        console.log("Categories fetched successfully:", this.categories);
      } catch (e) {
        this.error = e.message || "Произошла ошибка при получении категорий.";
        this.categories = [];
      } finally {
        this.isLoadingProducts = false;
      }
    },

    async fetchProducts(categoryId) {
      this.isLoadingProducts = true;
      this.error = null;
      this.products = [];
      try {
        const response = await catalogService.getProducts(categoryId);
        this.products = response.data?.items || [];
      } catch (e) {
        this.error = e.message || "Произошла ошибка при получении продуктов.";
        this.products = [];
      } finally {
        this.isLoadingProducts = false;
      }
    },
  },
});
