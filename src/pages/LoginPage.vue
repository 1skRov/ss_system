<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import LoginKeyboard from '@/widjets/LoginKeyboard.vue';
import { useAuthStore } from '@/stores/authStore';
import { useFilialStore } from '@/stores/filialStore';
import AlertIcon from '@/assets/icons/AlertIcon.vue';

const authStore = useAuthStore();
const filialStore = useFilialStore();
const router = useRouter();

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

  if (success) {
    await filialStore.fetchPlaces();
    router.push('/');
  } else if (authStore.error) {
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
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div v-if="notification.show" class="alert alert-danger" role="alert">
      <div class="alert-icon">
        <AlertIcon />
      </div>
      <div>
        <h4 class="alert-heading">Ошибка</h4>
        <div class="alert-description">
          {{ notification.message }}
        </div>
      </div>
    </div>
    <div class="flex-grow flex flex-col justify-center items-center max-w-md w-full">
      <h1 class="text-3xl font-bold mb-4 text-primary">Вход в систему</h1>
      <div :class="['w-full', showKeyboard ? 'flex gap-2 items-end' : '']">
        <div class="form-control w-full">
          <label class="label">Имя пользователя</label>
          <input type="text" v-model="login" @focus="setActiveInput('login')"
            class="input input-sm input-bordered w-full text-lg" />
        </div>
        <div class="form-control w-full mt-2">
          <label class="label">Пароль</label>
          <input type="password" v-model="password" @focus="setActiveInput('password')"
            class="input input-bordered w-full text-lg input-sm" />
        </div>
      </div>
      <button class="btn btn-sm btn-primary mt-5 text-lg w-full" @click="handleLogin" :disabled="authStore.isLoading">
        <span v-if="authStore.isLoading" class="loading loading-spinner"></span>
        <span v-else>Войти</span>
      </button>
    </div>
    <div class="w-full" v-if="showKeyboard">
      <LoginKeyboard @key-press="handleKeyPress" @clear="handleClear" @close="handleClose" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.label {
  font-size: 0.9rem;
}
</style>