<script setup>
import { useTheme } from '@/composables/useTheme';
import CircleIcon from '@/assets/icons/CircleIcon.vue'; // Используем вашу иконку

const { currentTheme, setTheme } = useTheme();

const themes = [
  { name: 'clean-contrast', label: 'Контрастная' },
  { name: 'bluetheme', label: 'Синяя' },
  { name: 'warm-terracotta', label: 'Терракотовая' },
  { name: 'deep-blue', label: 'Глубокий Синий' },
];
</script>

<template>
  <li>
    <details>
      <summary>
        <CircleIcon />
        Тема
      </summary>
      <ul class="p-2 bg-base-100 rounded-t-none z-10">
        <li v-for="theme in themes" :key="theme.name">
          <a @click="setTheme(theme.name)" :class="{ 'active': currentTheme === theme.name }">
            {{ theme.label }}
          </a>
        </li>
      </ul>
    </details>
  </li>
</template>