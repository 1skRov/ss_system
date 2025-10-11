import http from '@/api/http'

class OrderService {
  createOrder(placeId) {
    return http.post('/mobile/orders/new', { place_id: placeId })
  }

  getOrder(orderId) {
    return http.post(`/mobile/orders/${orderId}`, { action: 'info' })
  }

  addProductToOrder({ orderId, productId, count }) {
    return http.post(`/mobile/orders/${orderId}`, {
      action: 'add_order_item',
      good_id: productId,
      amount: count,
    })
  }

  removeProductFromOrder({ orderId, productId }) {
    return http.post(`/mobile/orders/${orderId}`, {
      action: 'delete_order_item',
      id: productId,
    })
  }

  setItemAmount({ orderId, productId, amount }) {
    return http.post(`/mobile/orders/${orderId}`, {
      action: 'set_item_amount',
      id: productId,
      amount,
    })
  }
}

export default new OrderService()
