import http from "@/api/http";

class OrderService {
  getOrders() {
    return http.post("/mobile/orders", {
      params: {
        action: "get_open_orders",
      },
    });
  }
}

export default new OrderService();
