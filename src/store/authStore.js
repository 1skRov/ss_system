import { defineStore } from 'pinia';
import router from '@/router';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', {
    // Состояние
    state: () => ({
        isAuthenticated: false,
        isLoading: false,
        error: null,
    }),

    actions: {

        async login(login, password) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await authService.login(login, password);

                const token = response.data?.user?.token;
                console.log('Login response:', token);


                if (token) {
                    localStorage.setItem('x-api-token', token);
                    this.isAuthenticated = true;
                    await router.push('/');
                    return true;
                } else {
                    throw new Error('Неверное имя пользователя или пароль!');
                }
            } catch (e) {
                this.isAuthenticated = false;
                this.error = e.message || 'Произошла ошибка при авторизации.';
                return false;
            } finally {
                this.isLoading = false;
            }
        },
        async getProducts(category) {
            try {
                const response = await authService.getProducts(category);
                return response.data;
            } catch (e) {
                this.error = e.message || 'Произошла ошибка при получении продуктов.';
                return null;
            }
        },
        async getCategories() {
            try {
                const response = await authService.getCategories();
                return response.data;
            } catch (e) {
                this.error = e.message || 'Произошла ошибка при получении категорий.';
                return [];
            }
        },

        logout() {
            this.isAuthenticated = false;
            router.push('/login');
        }
    }
});