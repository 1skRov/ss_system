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
      if (!state.currentOrder?.items) return 0
      return state.currentOrder.items.reduce(
        (total, item) => total + item.price * item.amount,
        0
      )
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
        this.currentOrder = { id: orderId, items: [] }
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
        this.currentOrder = {
          id: data.order._id,
          items: data.order_items || [],
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

        const existingItem = this.orderItems.find(
          (item) => item.good_id === product._id
        )

        if (existingItem) {
          const { data } = await orderService.addProductToOrder({
            orderId,
            productId: product._id,
            count,
          })
          const index = this.orderItems.findIndex(
            (item) => item.good_id === product._id
          )
          this.currentOrder.items[index] = data.order_item
        } else {
          const { data } = await orderService.addProductToOrder({
            orderId,
            productId: product._id,
            count,
          })
          this.currentOrder.items.push(data.order_item)
        }
      } catch (e) {
        this.error = `Ошибка при добавлении товара: ${e.message}`
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
        this.currentOrder.items = this.currentOrder.items.filter(
          (item) => item._id !== orderItemId
        )
      } catch (e) {
        this.error = `Ошибка при удалении товара: ${e.message}`
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
