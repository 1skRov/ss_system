<script setup>
import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import LoginKeyboard from '@/widjets/LoginKeyboard.vue';
import { useAuthStore } from '@/stores/authStore';
import { useFilialStore } from '@/stores/filialStore';
import InputComponent from '@/components/UiComponents/InputComponent.vue';
import UserIcon from '@/assets/icons/UserIcon.vue';
import LockClosedIcon from '@/assets/icons/LockClosedIcon.vue';
const authStore = useAuthStore();
const filialStore = useFilialStore();
const router = useRouter();
const login = ref('');
const password = ref('');
const activeInput = ref(null);
const showKeyboard = ref(false);

const notification = ref({
  show: false,
  type: 'error',
  title: 'Ошибка',
  message: ''
});

let notifyTimer = null;

const showNotification = (message, { type = 'error', title, duration = 3000 } = {}) => {
  if (notifyTimer) clearTimeout(notifyTimer);
  notification.value = {
    show: true,
    type,
    title: title ?? (type === 'error' ? 'Ошибка' : 'Сообщение'),
    message
  };
  if (duration) {
    notifyTimer = setTimeout(() => (notification.value.show = false), duration);
  }
};

const closeNotification = () => {
  notification.value.show = false;
  if (notifyTimer) clearTimeout(notifyTimer);
};

onUnmounted(() => {
  if (notifyTimer) clearTimeout(notifyTimer);
});

const handleLogin = async () => {
  const success = await authStore.login(login.value, password.value);

  if (success) {
    await filialStore.fetchPlaces();
    router.push('/');
  } else if (authStore.error) {
    showNotification(authStore.error, { type: 'error', title: 'Ошибка входа' });
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
  if (key === 'BACKSPACE') target.value = target.value.slice(0, -1);
  else target.value += key;
};

const handleClear = () => {
  if (!activeInput.value) return;
  if (activeInput.value === 'login') login.value = '';
  else password.value = '';
};

const handleClose = () => {
  showKeyboard.value = false;
  activeInput.value = null;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-full">
    <div class="flex flex-col justify-center w-full">
      <p class="text-blue-600 font-bold text-3xl text-center">SSS</p>
      <p class="text-xs text-blue-600 text-center">Вход в систему</p>
    </div>

    <div class="flex flex-col gap-3 p-10">
      <div>
        <label for="username" class="block text-sm text-gray-500 mb-2">Логин</label>
        <input-component v-model="login" placeholder="Введите логин" input-type="text">
          <template #icon>
            <user-icon class="text-gray-400/70"></user-icon>
          </template>
        </input-component>
      </div>
      <div>
        <label for="username" class="block text-sm text-gray-500 mb-2">Пароль</label>
        <input-component v-model="password" placeholder="Введите пароль" input-type="password">
          <template #icon>
            <lock-closed-icon class="text-gray-400/70"></lock-closed-icon>
          </template>
        </input-component>
      </div>
      <button
        class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
        Войти
      </button>
    </div>
  </div>

  <!-- <div class="w-full h-full flex flex-col items-center justify-center">
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
  </div> -->
</template>

<style scoped lang="scss">
.label {
  font-size: 0.9rem;
}
</style>