import { defineStore } from 'pinia'
import authService from '@/services/authService'
import { useFilialStore } from './filialStore'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    error: null,
    userName: '',
  }),

  actions: {
    async login(login, password) {
      this.isLoading = true
      this.error = null

      try {
        const response = await authService.login(login, password)
        const token = response.data?.user?.token

        if (token) {
          localStorage.setItem('x-api-token', token)
          this.userName = response.data?.user?.login || ''
          return true
        } else {
          throw new Error('Неверное имя пользователя или пароль!')
        }
      } catch (e) {
        this.error = e.message || 'Произошла ошибка при авторизации.'
        return false
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      const filialStore = useFilialStore()
      filialStore.resetSelection()
      localStorage.removeItem('x-api-token')
      this.userName = ''
    },
  },
})
