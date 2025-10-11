<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import LoginKeyboard from '@/components/LoginKeyboard.vue'
import InputComponent from '@/components/UiComponents/InputComponent.vue'

import UserIcon from '@/assets/icons/UserIcon.vue'
import LockClosedIcon from '@/assets/icons/LockClosedIcon.vue'

const authStore = useAuthStore()
const router = useRouter()

const login = ref('')
const password = ref('')
const focusedField = ref(null) // 'login' | 'password' | null
const isLoading = ref(false)

const handleLogin = async () => {
  if (isLoading.value) return
  isLoading.value = true
  try {
    const success = await authStore.login(login.value, password.value)
    if (success) {
      router.push('/select-filial')
    } else {
      password.value = ''
    }
  } finally {
    isLoading.value = false
  }
}

const handleKeyPress = (key) => {
  if (!focusedField.value) return
  const target = focusedField.value === 'login' ? login : password
  if (key === 'BACKSPACE') target.value = target.value.slice(0, -1)
  else target.value += key
}

const handleClear = () => {
  if (!focusedField.value) return
  if (focusedField.value === 'login') login.value = ''
  else password.value = ''
}
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex flex-col items-center justify-center flex-1">
      <div class="flex flex-col w-full">
        <p
          class="text-2xl font-bold text-center"
          style="color: var(--color-navy-blue)"
        >
          SSS
        </p>
        <p class="text-base text-center" style="color: var(--color-gray)">
          Вход в систему
        </p>
      </div>

      <div class="flex flex-col gap-3 pt-5 w-full max-w-md">
        <div>
          <label class="block text-sm text-gray-500 mb-2">Логин</label>
          <InputComponent
            v-model="login"
            placeholder="Введите логин"
            input-type="text"
            @focus="focusedField = 'login'"
            @blur="focusedField = null"
          >
            <template #icon>
              <UserIcon class="text-gray-400/70" />
            </template>
          </InputComponent>
        </div>

        <div>
          <label class="block text-sm text-gray-500 mb-2">Пароль</label>
          <InputComponent
            v-model="password"
            placeholder="Введите пароль"
            input-type="password"
            @focus="focusedField = 'password'"
            @blur="focusedField = null"
            @keydown.enter.prevent="handleLogin"
          >
            <template #icon>
              <LockClosedIcon class="text-gray-400/70" />
            </template>
          </InputComponent>
        </div>
      </div>
    </div>

    <div class="w-full">
      <LoginKeyboard
        @key-press="handleKeyPress"
        @clear="handleClear"
        @submit="handleLogin"
      />
    </div>
  </div>
</template>

<style scoped></style>
