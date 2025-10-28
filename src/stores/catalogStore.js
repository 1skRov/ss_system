import { defineStore } from 'pinia'
import catalogService from '@/services/catalogService'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    categories: [],
    products: [],
    searchResults: [],
    error: null,
    isLoadingProducts: false,
    isSearching: false,
    selectedCategory: null,
  }),

  actions: {
    async initCatalog() {
      if (this.categories.length === 0) {
        await this.fetchCategories()
      }
      if (this.categories.length > 0 && this.selectedCategory === null) {
        await this.setSelectedCategory(this.categories[0]._id)
      }
    },
    async fetchCategories() {
      this.isLoadingProducts = true
      this.error = null
      try {
        const response = await catalogService.getCategories()
        this.categories = response.data?.items || []
      } catch (e) {
        this.error = e.message || 'Произошла ошибка при получении категорий.'
        console.error(this.error)
        this.categories = []
      } finally {
        this.isLoadingProducts = false
      }
    },
    async setSelectedCategory(categoryId) {
      if (this.selectedCategory === categoryId) return

      this.selectedCategory = categoryId
      if (categoryId) {
        await this.loadCategoryProducts(categoryId)
      } else {
        this.products = []
      }
    },
    async loadCategoryProducts({ categoryId, limit = 20, offset = 0 }) {
      this.isLoadingProducts = true
      this.error = null
      this.products = []
      try {
        const response = await catalogService.searchProducts({
          categoryId: categoryId,
          limit,
          offset,
        })
        this.products = response.data?.items || []
      } catch (e) {
        this.error = e.message || 'Произошла ошибка при получении продуктов.'
        console.error(this.error)
        this.products = []
      } finally {
        this.isLoadingProducts = false
      }
    },

    async searchProducts({
      search = null,
      categoryId = null,
      limit = 20,
      offset = 0,
    }) {
      this.isSearching = true
      this.error = null
      this.searchResults = []
      try {
        const response = await catalogService.searchProducts({
          search,
          categoryId,
          limit,
          offset,
        })
        this.searchResults = response.data?.items || []
        return this.searchResults
      } catch (e) {
        this.error = e.message || 'Произошла ошибка при поиске товаров.'
        this.searchResults = []
        return []
      } finally {
        this.isSearching = false
      }
    },

    async checkProductByBarcode(barcode) {
      this.error = null
      try {
        const response = await catalogService.checkProductByBarcode(barcode)
        return response.data?._success || false
      } catch (e) {
        this.error = e.message || 'Произошла ошибка при проверке штрих-кода.'
        return false
      }
    },

    clearSearchResults() {
      this.searchResults = []
    },
  },
})
