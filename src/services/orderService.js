import http from "@/api/http";

class OrderService {
  getOrders() {
    const token = localStorage.getItem("x-api-token");
    return http.post(
      "/mobile/orders",
      {
        params: {
          action: "get_open_orders",
        },
      },
      {
        headers: {
          "X-Api-Token": token,
        },
      }
    );
  }
}

export default new OrderService();
