import { defineStore } from 'pinia'
import paymentService from '@/services/paymentService'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    paymentTypes: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchPaymentTypes() {
      this.isLoading = true
      this.error = null
      try {
        const response = await paymentService.getPaymentTypes()
        this.paymentTypes = response.data?.payment_types || []
      } catch (e) {
        this.error = e.message || 'Ошибка при загрузке типов оплаты.'
      } finally {
        this.isLoading = false
      }
    },
  },
})
