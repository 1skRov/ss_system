import { ref, watch } from 'vue';

// Ключ для сохранения в localStorage
const THEME_KEY = 'pos-app-theme';

// Получаем тему из localStorage или ставим 'clean-contrast' по умолчанию
const currentTheme = ref(localStorage.getItem(THEME_KEY) || 'clean-contrast');

// Эта функция будет следить за изменениями currentTheme и применять их
watch(currentTheme, (newTheme) => {
    // Записываем новую тему в localStorage
    localStorage.setItem(THEME_KEY, newTheme);
    // Устанавливаем атрибут data-theme для тега <html>
    document.documentElement.setAttribute('data-theme', newTheme);
});

// Экспортируем нашу функцию
export function useTheme() {
    const setTheme = (themeName) => {
        currentTheme.value = themeName;
    };

    // Инициализация темы при первой загрузке
    const initTheme = () => {
        document.documentElement.setAttribute('data-theme', currentTheme.value);
    }

    return {
        currentTheme,
        setTheme,
        initTheme,
    };
}