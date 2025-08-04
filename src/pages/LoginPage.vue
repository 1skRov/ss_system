<script setup>
import {ref} from 'vue';
import http from '@/api/http';
import LoginKeyboard from '../widjets/LoginKeyboard.vue';

const emit = defineEmits(['login-success']);

const login = ref('');
const password = ref('');
const activeInput = ref(null);
const showKeyboard = ref(false);

const notification = ref({show: false, message: '', type: 'success'});

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

const showNotification = (message, type = 'success', duration = 3000) => {
  notification.value = {show: true, message, type};
  setTimeout(() => {
    notification.value.show = false;
  }, duration);
};

const handleLogin = async () => {
  notification.value = {show: false, message: '', type: 'success'};
  try {
    const params = new URLSearchParams();
    params.append('login', login.value);
    params.append('password', password.value);

    await http.post('/api/login', params);
    if (document.cookie.includes('PYCKET_ID')) {
      emit('login-success');
    } else {
      notification.value = {show: true, message: 'Ошибка авторизации', type: 'error'};
    }
  } catch (e) {
    notification.value = {show: true, message: 'Ошибка запроса', type: 'error'};
  }
};
</script>

<style scoped>
input[readonly] {
  cursor: text;
  background-color: white;
}
</style>
<template>
  <div class="w-full h-full flex flex-col justify-end items-center bg-base-100">

    <div class="toast toast-top toast-center z-50">
      <div v-if="notification.show"
           :class="['alert', notification.type === 'success' ? 'alert-success' : 'alert-error']">
        <span>{{ notification.message }}</span>
      </div>
    </div>

    <div class="flex-grow flex flex-col justify-center items-center p-4 w-full max-w-sm">
      <h1 class="text-4xl font-bold mb-8 text-primary">Вход в систему</h1>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Имя пользователя</span>
        </label>
        <input
            type="text"
            v-model="login"
            @focus="setActiveInput('login')"
            readonly
            class="input input-bordered w-full text-lg"
        />
      </div>
      <div class="form-control w-full mt-4">
        <label class="label">
          <span class="label-text">Пароль</span>
        </label>
        <input
            type="password"
            v-model="password"
            @focus="setActiveInput('password')"
            readonly
            class="input input-bordered w-full text-lg"
        />
      </div>
      <button class="btn btn-primary w-full mt-8" @click="handleLogin">
        Войти
      </button>
    </div>

    <div class="w-full" v-if="showKeyboard">
      <LoginKeyboard
          @key-press="handleKeyPress"
          @clear="handleClear"
          @close="handleClose"
      />
    </div>
  </div>
</template>