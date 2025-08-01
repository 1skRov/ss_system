import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuickItemsStore = defineStore('quickItems', () => {
    const items = ref([
        { id: 101, name: 'Пакет майка', price: 5 },
        { id: 102, name: 'Салфетки влажные', price: 50 },
        { id: 103, name: 'Жевательная резинка Orbit', price: 35 },
        { id: 104, name: 'Вода негазированная 0.5л', price: 45 },
        { id: 105, name: 'Шоколадный батончик Snickers', price: 60 },
        { id: 106, name: 'Чипсы Lays 50г', price: 70 },
        { id: 107, name: 'Батарейка AA', price: 40 },
        { id: 108, name: 'Зажигалка', price: 25 },
        { id: 109, name: 'Кофе 3в1', price: 20 },
        { id: 110, name: 'Чайный пакетик Greenfield', price: 15 },
    ])

    return { items }
})
