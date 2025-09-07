import http from "@/api/http";

class FilialService {
  getPlaces() {
    return http.post("/mobile/places", {});
  }
  getEmployees(orderId) {
    return http.post("/mobile/waiters", { order_id: orderId });
  }
  getClients() {
    return http.post("/mobile/clients", {});
  }
}

export default new FilialService();
