import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCatalogStore = defineStore('catalog', () => {
    const products = ref([
        // Bakery
        { id: 201, name: 'Хлеб "Бородинский"', price: 55, category: 'Хлебобулочные изделия' },
        { id: 202, name: 'Батон "Нарезной"', price: 45, category: 'Хлебобулочные изделия' },
        { id: 203, name: 'Круассан с шоколадом', price: 70, category: 'Хлебобулочные изделия' },
        // Dairy
        { id: 204, name: 'Молоко "Простоквашино" 3.2%', price: 85, category: 'Молочные продукты' },
        { id: 205, name: 'Кефир "Домик в деревне" 1%', price: 75, category: 'Молочные продукты' },
        { id: 206, name: 'Сыр "Российский"', price: 450, category: 'Молочные продукты' },
        { id: 207, name: 'Йогурт "Activia" с черносливом', price: 50, category: 'Молочные продукты' },
        // Fruits & Vegetables
        { id: 208, name: 'Яблоки "Гренни Смит"', price: 120, category: 'Фрукты и овощи' },
        { id: 209, name: 'Бананы', price: 90, category: 'Фрукты и овощи' },
        { id: 210, name: 'Картофель молодой', price: 40, category: 'Фрукты и овощи' },
        { id: 211, name: 'Огурцы', price: 150, category: 'Фрукты и овощи' },
        // Drinks
        { id: 212, name: 'Сок "Добрый" апельсиновый 1л', price: 110, category: 'Напитки' },
        { id: 213, name: 'Coca-Cola 1л', price: 100, category: 'Напитки' },
        { id: 214, name: 'Вода "Aqua Minerale" 1.5л', price: 50, category: 'Напитки' },
    ])

    const categories = computed(() => {
        const allCategories = products.value.map(p => p.category)
        return ['Все', ...new Set(allCategories)]
    })

    const selectedCategory = ref('Все')
    const searchTerm = ref('');
    const selectedLetter = ref('');

    const filteredProducts = computed(() => {
        let result = products.value;

        if (selectedCategory.value !== 'Все') {
            result = result.filter(p => p.category === selectedCategory.value);
        }

        if (searchTerm.value) {
            result = result.filter(p => p.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
        }

        if (selectedLetter.value) {
            result = result.filter(p => p.name.toLowerCase().startsWith(selectedLetter.value.toLowerCase()));
        }

        return result;
    });

    function selectCategory(category) {
        selectedCategory.value = category
        selectedLetter.value = ''; // Reset letter filter when category changes
    }

    function setSearchTerm(term) {
        searchTerm.value = term;
        selectedLetter.value = ''; // Reset letter filter when search term changes
    }

    function selectLetter(letter) {
        selectedLetter.value = letter;
        searchTerm.value = ''; // Reset search term when letter is selected
    }

    return { products, categories, selectedCategory, filteredProducts, selectCategory, searchTerm, setSearchTerm, selectLetter }
})
