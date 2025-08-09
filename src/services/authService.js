import http from '@/api/http';

class AuthService {
    login(login, password) {
        const params = {
            login: login,
            password: password,
        }
        return http.post('/mobile/login', JSON.stringify(params), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
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

export default new AuthService();