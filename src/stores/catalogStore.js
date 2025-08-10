import catalogService from '@/services/catalogService';
export const useCatalogStore = defineStore('catalog', {
    state: () => ({
        categories: [],
        products: [],
        error: null,
    }),

    actions: {
        async fetchCategories() {
            try {
                const response = await catalogService.getCategories();
                this.categories = response.data || [];
            } catch (e) {
                this.error = e.message || 'Произошла ошибка при получении категорий.';
            }
        },

        async fetchProducts(category) {
            try {
                const response = await catalogService.getProducts(category);
                this.products = response.data || [];
            } catch (e) {
                this.error = e.message || 'Произошла ошибка при получении продуктов.';
            }
        },
    }
});