import { defineStore } from "pinia";
import authService from "@/services/authService";
import { useFilialStore } from "./filialStore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    isLoading: false,
    error: null,
    first_name: "",
    last_name: "",
    userName: "",
  }),

  actions: {
    async login(login, password) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await authService.login(login, password);
        const token = response.data?.user?.token;

        if (token) {
          localStorage.setItem("x-api-token", token);
          this.first_name = response.data?.user?.first_name || "";
          this.last_name = response.data?.user?.last_name || "";
          this.userName = response.data?.user?.login || "";
          this.isAuthenticated = true;
          return true;
        } else {
          throw new Error("Неверное имя пользователя или пароль!");
        }
      } catch (e) {
        this.isAuthenticated = false;
        this.error = e.message || "Произошла ошибка при авторизации.";
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      const filialStore = useFilialStore();
      filialStore.resetSelection();
      localStorage.removeItem("x-api-token");
      this.isAuthenticated = false;
      this.first_name = "";
      this.last_name = "";
      this.userName = "";
    },
  },
});
