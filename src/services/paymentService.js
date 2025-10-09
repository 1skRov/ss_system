import http from '@/api/http'

class PaymentService {
  getPaymentTypes() {
    return http.post('/mobile/payment_types', {})
  }
}

export default new PaymentService()
