<script setup>
import QuickItems from "@/widjets/QuickItems.vue";
import { ref } from "vue";
import PaymentDrawer from "@/widjets/PaymentDrawer.vue";
import { useDeferredStore } from '@/stores/deferred';
import { useCartStore } from '@/stores/cart';

const quickItems = ref(false);
const payDrawer = ref(false);
const deferredStore = useDeferredStore();
const cartStore = useCartStore();

const deferCurrentOrder = () => {
  if (cartStore.products.length > 0) {
    deferredStore.deferOrder(cartStore.products);
    cartStore.clearCart();
    // Maybe navigate to the deferred products page or show a notification
  } else {
    // Handle case where cart is empty
    alert("Корзина пуста!");
  }
};
</script>
<template>
  <footer class="bg-base-300 p-2 footer flex justify-between">
    <div class="footer-add-buttons flex fex-col flex-wrap justify-between h-full">
      <button class="w-full btn btn-secondary text-white text-3xl add-button-footer font-medium">
        Закрыть заказ
      </button>
      <button class="w-full btn btn-secondary text-white text-3xl add-button-footer font-medium"
        @click="deferCurrentOrder">
        Добавить в отложку
      </button>
      <div class="drawer drawer-end">
        <input id="quick-item-drawer" type="checkbox" class="drawer-toggle" v-model="quickItems" />
        <div class="drawer-content">
          <button class="w-full btn btn-secondary text-white text-3xl add-button-footer font-medium"
            @click="quickItems = true">
            Быстрые товары
          </button>
        </div>
        <div class="drawer-side" @click.self="quickItems = false">
          <label for="quick-item-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
          <div style="width: 70vw" class="bg-base-100 min-h-full">
            <QuickItems @close="quickItems = false"></QuickItems>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-pay-panel h-full flex flex-col">
      <div class="total-panel w-full h-full bg-base-100 p-3 rounded flex flex-col gap-3">
        <div class="flex justify-between mb-2">
          <h1>Итого</h1>
          <h1>123</h1>
        </div>
        <div class="flex justify-between">
          <p>Внесено</p>
          <p>123</p>
        </div>
        <div class="flex justify-between">
          <p>Сдача</p>
          <p>123</p>
        </div>
        <div class="flex justify-between mt-2">
          <p>Общий чек</p>
          <p>1234</p>
        </div>
      </div>
      <div class="drawer drawer-end">
        <input id="payment-drawer" type="checkbox" class="drawer-toggle" v-model="payDrawer" />
        <div class="drawer-content">
          <button class="w-full btn btn-success text-3xl pay-button" @click="payDrawer = true">
            Оплатить
          </button>
        </div>
        <div class="drawer-side" @click.self="payDrawer = false">
          <label for="payment-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
          <div style="width: 70vw" class="bg-base-100 min-h-full">
            <PaymentDrawer />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  min-height: 26vh;

  .footer-add-buttons {
    min-width: 300px;
    width: 35%;

    .add-button-footer {
      min-height: 70px;
    }
  }

  .footer-pay-panel {
    min-width: 250px;
    width: 35%;

    .total-panel {
      h1 {
        font-size: 32px;
        font-weight: bold;
      }

      p {
        font-size: 24px;
      }
    }

    .pay-button {
      min-height: 70px;
    }
  }

}
</style>