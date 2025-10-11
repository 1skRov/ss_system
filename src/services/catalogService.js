import http from '@/api/http'

class CatalogService {
  getCategories() {
    return http.post('/mobile/categories')
  }

  getProducts(category) {
    return http.post('/mobile/search', { q: `cat:${category}` })
  }

  searchProducts({ search = null, categoryId = null, limit = 10, offset = 0 }) {
    let q = null

    if (search && search.trim() !== '') {
      q = search
    } else if (categoryId !== null && categoryId !== undefined) {
      q = `cat:${categoryId}`
    }

    const data = {
      ...(q && { q }),
      limit,
      offset,
    }

    return http.post('/mobile/search', data)
  }

  checkProductByBarcode(barcode) {
    return http.post('/mobile/products', { q: barcode })
  }
}

export default new CatalogService()
