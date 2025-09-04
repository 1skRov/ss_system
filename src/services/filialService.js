import http from "@/api/http";

class FilialService {
  getPlaces() {
    return http.post("/mobile/places", {});
  }
  getEmployees() {
    return http.post("/mobile/waiters", {});
  }
  getClients() {
    return http.post("/mobile/clients", {});
  }
}

export default new FilialService();
