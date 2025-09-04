import http from "@/api/http";

class CatalogService {
  getCategories() {
    return http.post("/mobile/categories");
  }

  getProducts(category) {
    return http.post("/mobile/search", { q: `cat:${category}` });
  }
}

export default new CatalogService();
