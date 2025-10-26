import { defineStore } from 'pinia'
import orderService from '@/services/orderService'
import { useFilialStore } from './filialStore'

export const useOrderStore = defineStore('order', {
  state: () => ({
    currentOrder: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    orderItems: (state) => state.currentOrder?.items || [],
    totalPrice: (state) => {
      return state.currentOrder?.order?.price || 0
    },
    discount: (state) => {
      return state.currentOrder?.order?.discount || 0
    },
    payed_summ: (state) => {
      return state.currentOrder?.order?.payed_summ || 0
    },
    activeOrderId: (state) => state.currentOrder?.id || null,
  },

  actions: {
    async ensureOrderExists() {
      if (this.activeOrderId) {
        return this.activeOrderId
      }

      const storedOrderId = localStorage.getItem('activeOrderId')
      if (storedOrderId) {
        await this.getOrder(Number(storedOrderId))
        if (this.currentOrder) {
          return this.activeOrderId
        }
      }

      const filialStore = useFilialStore()
      const placeId = filialStore.selectedKassaId
      if (!placeId) {
        this.error = 'Касса не выбрана. Невозможно создать заказ.'
        return null
      }

      return await this.createOrder(placeId)
    },

    async createOrder(placeId) {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await orderService.createOrder(placeId)
        const orderId = data?.order?._id
        if (!orderId) {
          throw new Error('Не удалось получить ID нового заказа')
        }
        this.currentOrder = { id: orderId, items: [], order: data.order }
        localStorage.setItem('activeOrderId', orderId.toString())
        return orderId
      } catch (e) {
        this.error = `Ошибка при создании заказа: ${e.message}`
        return null
      } finally {
        this.isLoading = false
      }
    },

    async getOrder(orderId) {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await orderService.getOrder(orderId)
        console.log('add')

        this.currentOrder = {
          id: data.order._id,
          items: data.order_items || [],
          order: data.order,
        }
        localStorage.setItem('activeOrderId', this.currentOrder.id.toString())
      } catch (e) {
        this.error = `Ошибка при загрузке заказа: ${e.message}`
        this.clearOrder()
      } finally {
        this.isLoading = false
      }
    },

    async addProduct(product, count = 1) {
      this.isLoading = true
      this.error = null
      try {
        const orderId = await this.ensureOrderExists()
        if (!orderId) return

        await orderService.addProductToOrder({
          orderId,
          productId: product._id,
          count,
        })

        await this.getOrder(orderId)
      } catch (e) {
        this.error = `Ошибка при добавлении товара: ${e.message}`
        console.error(this.error)
      } finally {
        this.isLoading = false
      }
    },

    async removeProduct(orderItemId) {
      if (!this.activeOrderId) return
      this.isLoading = true
      this.error = null
      try {
        await orderService.removeProductFromOrder({
          orderId: this.activeOrderId,
          productId: orderItemId,
        })
        await this.getOrder(this.activeOrderId)
      } catch (e) {
        this.error = `Ошибка при удалении товара: ${e.message}`
        console.error(this.error)
      } finally {
        this.isLoading = false
      }
    },

    async updateItemAmount({ orderItemId, amount }) {
      if (!this.activeOrderId) return
      this.isLoading = true
      this.error = null
      try {
        await orderService.setItemAmount({
          orderId: this.activeOrderId,
          productId: orderItemId,
          amount: amount,
        })

        await this.getOrder(this.activeOrderId)
      } catch (e) {
        this.error = `Ошибка при изменении количества товара: ${e.message}`
        console.error(this.error)
      } finally {
        this.isLoading = false
      }
    },

    async setOrderDiscount({ discount, discountType = 'tenge' }) {
      if (!this.activeOrderId) return
      this.isLoading = true
      this.error = null
      try {
        let discountValue = discount

        if (discountType === 'percentage') {
          const totalPrice = this.totalPrice
          discountValue = (totalPrice * discount) / 100
        }

        await orderService.setDiscount({
          orderId: this.activeOrderId,
          discount: discountValue,
        })

        await this.getOrder(this.activeOrderId)
      } catch (e) {
        this.error = `Ошибка при установке скидки: ${e.message}`
        console.error(this.error)
        throw e
      } finally {
        this.isLoading = false
      }
    },

    clearOrder() {
      this.currentOrder = null
      localStorage.removeItem('activeOrderId')
    },
  },
})
