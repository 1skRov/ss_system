<script setup>
import { ref, computed } from "vue";
import { useCatalogStore } from '@/stores/catalog';
import { useCartStore } from '@/stores/cart';
import LoginKeyboard from './LoginKeyboard.vue';

const catalogStore = useCatalogStore();
const cartStore = useCartStore();

const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split("");

const addedItems = ref({});

function handleQuantityUpdate(item, quantity) {
  if (quantity > 0) {
    addedItems.value[item.id] = quantity;
    cartStore.addProduct({ ...item, quantity: 1 });
  } else {
    delete addedItems.value[item.id];
    cartStore.deleteProduct(item.id);
  }
}

function increment(item) {
  addedItems.value[item.id]++;
  cartStore.addProduct({ ...item, quantity: 1 });
}

function decrement(item) {
  if (addedItems.value[item.id] > 1) {
    addedItems.value[item.id]--;
    const product = cartStore.products.find(p => p.id === item.id);
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      cartStore.deleteProduct(item.id);
    }
  } else {
    delete addedItems.value[item.id];
    cartStore.deleteProduct(item.id);
  }
}

const emit = defineEmits(['close']);

function handleClose() {
  emit('close');
}

function handleKeyPress(key) {
  if (key === 'BACKSPACE') {
    catalogStore.setSearchTerm(catalogStore.searchTerm.slice(0, -1));
  } else {
    catalogStore.setSearchTerm(catalogStore.searchTerm + key);
  }
}

function handleClear() {
  catalogStore.setSearchTerm('');
}
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="w-full px-2 py-1.5">
      <input type="text" placeholder="Поиск..." class="input input-sm w-full" :value="catalogStore.searchTerm"
        @input="catalogStore.setSearchTerm($event.target.value)" />
    </div>
    <div class="filter flex w-full justify-start items-center overflow-x-auto flex-nowrap px-2 pb-2 gap-2">
      <button v-for="category in catalogStore.categories" :key="category" class="btn btn-sm"
        :class="{ 'btn-active': catalogStore.selectedCategory === category }"
        @click="catalogStore.selectCategory(category)">
        {{ category }}
      </button>
    </div>
    <div class="flex flex-col flex-grow w-full h-0 overflow-hidden">
      <div class="w-full h-full flex flex-col">
        <p class="text-base font-medium text-black mt-0 px-2">Товары</p>
        <div class="flex flex-col flex-grow overflow-y-auto">
          <ul class="list bg-base-100 rounded-box shadow-md">
            <li v-for="item in catalogStore.filteredProducts" :key="item.id" class="list-row">
              <div>
                <div>{{ item.name }}</div>
                <div class="text-xs uppercase font-semibold opacity-60">{{ item.price }} ₸</div>
              </div>
              <div class="flex items-center">
                <template v-if="!addedItems[item.id]">
                  <button class="btn btn-sm btn-primary" @click="handleQuantityUpdate(item, 1)">
                    Добавить
                  </button>
                </template>
                <template v-else>
                  <div class="flex items-center justify-between">
                    <button class="btn btn-sm" @click="decrement(item)">-</button>
                    <p class="mx-2 w-12 text-center border border-base-300 rounded py-1">{{ addedItems[item.id] }}</p>
                    <button class="btn btn-sm" @click="increment(item)">+</button>
                  </div>
                </template>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <LoginKeyboard @key-press="handleKeyPress" @clear="handleClear" @close="handleClose" />
  </div>
</template>

<style scoped lang="scss"></style>