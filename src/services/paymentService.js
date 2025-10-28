import http from '@/api/http'

class PaymentService {
  getPaymentTypes() {
    return http.post('/mobile/payment_types', {})
  }

  closeOrderAsPaid(orderId, paymentInfo) {
    return http.post('/mobile/orders/' + orderId, {
      action: 'close_order_as_paid',
      payment_info: paymentInfo,
    })
  }
}

export default new PaymentService()
