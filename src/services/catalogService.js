import http from '@/api/http';

class CatalogService {
    getCategories() {
        const token = localStorage.getItem('x-api-token');
        return http.post('/mobile/categories', {}, {
            headers: {
                'X-Api-Token': token,
            }
        });
    }

    getProducts(category) {
        const token = localStorage.getItem('x-api-token');
        return http.post('/mobile/search', { q: `cat:${category}` }, {
            headers: {
                'X-Api-Token': token,
            }
        });
    }
}

export default new CatalogService();