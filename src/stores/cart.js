import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const products = ref([
        { id: 1, name: 'Sample Product 1', price: 100, quantity: 1, discount: 0, discountType: 'percent' },
        { id: 2, name: 'Sample Product 2', price: 200, quantity: 2, discount: 0, discountType: 'percent' },
    ])

    const productsWithTotal = computed(() => {
        return products.value.map(product => {
            let total;
            if (product.discountType === 'percent') {
                total = product.price * product.quantity * (1 - product.discount / 100);
            } else {
                total = (product.price * product.quantity) - product.discount;
            }
            return { ...product, total };
        });
    });

    function clearCart() {
        products.value = []
    }

    function addProduct(product) {
        const existingProduct = products.value.find(p => p.id === product.id)
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            products.value.push({ ...product })
        }
    }

    function deleteProduct(productId) {
        products.value = products.value.filter(p => p.id !== productId)
    }

    function deleteSelectedProducts(productIds) {
        products.value = products.value.filter(p => !productIds.includes(p.id))
    }

    return { products: productsWithTotal, clearCart, addProduct, deleteProduct, deleteSelectedProducts, rawProducts: products }
})
