import { defineStore } from 'pinia'
import { useCartStore } from './cart';

export const useDeferredStore = defineStore('deferred', {
    state: () => ({
        deferredOrders: [],
    }),
    actions: {
        deferOrder(products) {
            const newOrder = {
                id: Date.now(),
                date: new Date().toLocaleString(),
                products: [...products],
            }
            this.deferredOrders.push(newOrder)
        },
        deleteOrder(orderId) {
            this.deferredOrders = this.deferredOrders.filter(order => order.id !== orderId)
        },
        restoreOrder(orderId) {
            const cartStore = useCartStore();
            const order = this.deferredOrders.find(order => order.id === orderId);
            if (order) {
                order.products.forEach(product => cartStore.addProduct(product));
                this.deleteOrder(orderId);
                return order; // Return the restored order
            }
            return null;
        },
    },
})
