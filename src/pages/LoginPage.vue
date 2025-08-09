<script setup>
import { ref } from 'vue';
import LoginKeyboard from '../widjets/LoginKeyboard.vue';
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();

const login = ref('');
const password = ref('');
const activeInput = ref(null);
const showKeyboard = ref(false);

const notification = ref({ show: false, message: '', type: 'error' });

const showNotification = (message, duration = 3000) => {
  notification.value = { show: true, message, type: 'error' };
  setTimeout(() => {
    notification.value.show = false;
  }, duration);
};

const handleLogin = async () => {
  const success = await authStore.login(login.value, password.value);

  if (!success && authStore.error) {
    showNotification(authStore.error);
    password.value = '';
  }
};


const setActiveInput = (inputName) => {
  activeInput.value = inputName;
  showKeyboard.value = true;
};

const handleKeyPress = (key) => {
  if (!activeInput.value) return;

  const target = activeInput.value === 'login' ? login : password;

  if (key === 'BACKSPACE') {
    target.value = target.value.slice(0, -1);
  } else {
    target.value += key;
  }
};

const handleClear = () => {
  if (!activeInput.value) return;
  if (activeInput.value === 'login') {
    login.value = '';
  } else {
    password.value = '';
  }
};

const handleClose = () => {
  showKeyboard.value = false;
  activeInput.value = null;
};
</script>

<template>
  <div class="w-full h-full flex flex-col justify-end items-center bg-base-100">

    <div class="toast toast-top toast-center z-50">
      <div v-if="notification.show" class="alert alert-error">
        <span>{{ notification.message }}</span>
      </div>
    </div>

    <div class="flex-grow flex flex-col justify-center items-center p-4 w-full max-w-sm">
      <h1 class="text-4xl font-bold mb-8 text-primary">Вход в систему</h1>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Имя пользователя</span>
        </label>
        <input type="text" v-model="login" @focus="setActiveInput('login')"
          class="input input-bordered w-full text-lg" />
      </div>
      <div class="form-control w-full mt-4">
        <label class="label">
          <span class="label-text">Пароль</span>
        </label>
        <input type="password" v-model="password" @focus="setActiveInput('password')"
          class="input input-bordered w-full text-lg" />
      </div>
      <button class="btn btn-primary w-full mt-8" @click="handleLogin" :disabled="authStore.isLoading">
        <span v-if="authStore.isLoading" class="loading loading-spinner"></span>
        <span v-else>Войти</span>
      </button>
    </div>

    <div class="w-full" v-if="showKeyboard">
      <LoginKeyboard @key-press="handleKeyPress" @clear="handleClear" @close="handleClose" />
    </div>
  </div>
</template>

<style scoped>
input[readonly] {
  cursor: text;
  background-color: white;
}
</style>