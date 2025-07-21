// EditDrawer.vue — компонент для редактирования товара в POS drawer (снизу)
<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  model: Object,
  show: Boolean,
});

const emit = defineEmits(['close', 'confirm']);

const localModel = ref({});

watch(() => props.model, (val) => {
  if (val) {
    localModel.value = { ...val };
  }
}, { immediate: true });

const isEditingTotal = ref(false);

const title = computed(() => `Редактирование: ${localModel.value.name || ''}`);

function updateField(field, value) {
  localModel.value[field] = value;
  if (!isEditingTotal.value && ['count', 'price', 'discount', 'discountType'].includes(field)) {
    recalculateTotal();
  }
}

function recalculateTotal() {
  const { count, price, discount, discountType } = localModel.value;
  const subtotal = count * price;
  if (discountType === 'percent') {
    localModel.value.total = +(subtotal - subtotal * (discount / 100)).toFixed(2);
  } else {
    localModel.value.total = +(subtotal - discount).toFixed(2);
  }
}

function confirm() {
  emit('confirm', { ...localModel.value });
}
</script>

<template>
  <div v-if="show" class="fixed bottom-0 left-0 w-full bg-base-100 shadow-xl z-50 p-4 border-t border-base-300">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">{{ title }}</h2>
      <button class="btn btn-sm btn-ghost" @click="emit('close')">✕</button>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="label">Количество</label>
        <input type="number" v-model.number="localModel.count" class="input input-bordered w-full" @input="updateField('count', localModel.count)" />
      </div>
      <div>
        <label class="label">Цена</label>
        <input type="number" v-model.number="localModel.price" class="input input-bordered w-full" @input="updateField('price', localModel.price)" />
      </div>
      <div>
        <label class="label">Скидка</label>
        <input type="number" v-model.number="localModel.discount" class="input input-bordered w-full" @input="updateField('discount', localModel.discount)" />
      </div>
      <div>
        <label class="label">Тип скидки</label>
        <select v-model="localModel.discountType" class="select select-bordered w-full" @change="updateField('discountType', localModel.discountType)">
          <option value="percent">%</option>
          <option value="fixed">₸</option>
        </select>
      </div>
      <div class="col-span-2">
        <label class="label">Итоговая сумма</label>
        <input type="number" v-model.number="localModel.total" class="input input-bordered w-full" @focus="isEditingTotal = true" @input="isEditingTotal = true" />
        <small class="text-xs">Если редактируете вручную — поля выше не будут менять итог</small>
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <button class="btn btn-error" @click="emit('close')">Отмена</button>
      <button class="btn btn-success" @click="confirm">Сохранить</button>
    </div>
  </div>
</template>

<style scoped>
input::-webkit-inner-spin-button {
  appearance: none;
}
</style>

<!-- Использование: <EditDrawer :model="editItem" :show="showDrawer" @close="showDrawer = false" @confirm="handleDrawerConfirm" /> -->
