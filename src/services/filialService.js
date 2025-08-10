import http from "@/api/http";

class FilialService {
  getPlaces() {
    const token = localStorage.getItem("x-api-token");
    return http.post(
      "/mobile/places",
      {},
      {
        headers: {
          "X-Api-Token": token,
        },
      }
    );
  }
}

export default new FilialService();
