<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Отложенные товары</h1>
        <div v-if="deferredStore.deferredOrders.length === 0" class="text-center text-gray-500">
            Нет отложенных заказов.
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="order in deferredStore.deferredOrders" :key="order.id" class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Заказ от {{ order.date }}</h2>
                    <ul>
                        <li v-for="product in order.products" :key="product.id">
                            {{ product.name }} - {{ product.price }}
                        </li>
                    </ul>
                    <div class="card-actions justify-end mt-4">
                        <button class="btn btn-sm btn-outline btn-success"
                            @click="restore(order.id)">Восстановить</button>
                        <button class="btn btn-sm btn-outline btn-error" @click="remove(order.id)">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useDeferredStore } from '@/stores/deferred';
import { useRouter } from 'vue-router';

const deferredStore = useDeferredStore();
const router = useRouter();

const remove = (orderId) => {
    deferredStore.deleteOrder(orderId);
};

const restore = (orderId) => {
    const restoredOrder = deferredStore.restoreOrder(orderId);
    if (restoredOrder) {
        // Here you would typically add the products back to the main cart.
        // For now, we'll just navigate back to the main table page.
        console.log('Restored order:', restoredOrder);
        // You might want to use another store to manage the active cart
        // and add items to it here.
        router.push('/table-page');
    }
};
</script>