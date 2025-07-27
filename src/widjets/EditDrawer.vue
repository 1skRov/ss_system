<script setup>

import Bars3Icon from "@/assets/icons/Bars3Icon.vue";
import NumPad from "@/widjets/NumPad.vue";
import XCircleIcon from "@/assets/icons/XCircleIcon.vue";
import CheckCircleIcon from "@/assets/icons/CheckCircleIcon.vue";
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['save', 'cancel']);

const editedItem = ref({});
const activeField = ref('count');


onMounted(() => {
  editedItem.value = { ...props.item };
});

// Watch for changes in props.item to update editedItem when a new product is passed
watch(() => props.item, (newItem) => {
  editedItem.value = { ...newItem };
}, { immediate: true, deep: true });

function recalculateTotal() {
  const subtotal = editedItem.value.price * editedItem.value.count;
  if (editedItem.value.discountType === 'percent') {
    editedItem.value.total = subtotal - (subtotal * editedItem.value.discount / 100);
  } else {
    editedItem.value.total = subtotal - editedItem.value.discount;
  }
}

function updateFromNumPad(value) {
  editedItem.value[activeField.value] = parseFloat(value) || 0;
  recalculateTotal();
}

function updateDiscountType(type) {
  editedItem.value.discountType = type;
  recalculateTotal();
}

function setActiveField(field) {
  activeField.value = field;
}

function save() {
  emit('save', editedItem.value);
}

function cancel() {
  emit('cancel');
}

watch(() => [editedItem.value.count, editedItem.value.price, editedItem.value.discount, editedItem.value.discountType], () => {
  recalculateTotal();
}, { deep: true });
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <div class="flex items-center gap-2 text-gray-800">
        <Bars3Icon />
        <span class=" text-sm">название товара</span>
      </div>
      <p class="font-medium">{{ editedItem.name }}</p>
    </div>
    <div class="flex justify-between">
      <NumPad :initialValue="editedItem[activeField]" :field="activeField"
        :initialDiscountType="editedItem.discountType" @confirm="updateFromNumPad"
        @discountTypeChange="updateDiscountType" />
      <div class="flex flex-col justify-between w-full ml-4">
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Количество</span>
          <input type="number" class="input w-full" :class="{ 'input-primary': activeField === 'count' }"
            placeholder="Введите количество" v-model.number="editedItem.count" @focus="setActiveField('count')" />
        </div>
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Цена товара</span>
          <input type="number" class="input w-full" :class="{ 'input-primary': activeField === 'price' }"
            placeholder="Введите цену товара" v-model.number="editedItem.price" @focus="setActiveField('price')" />
        </div>
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Скидка для товара</span>
          <input type="number" class="input w-full" :class="{ 'input-primary': activeField === 'discount' }"
            placeholder="Введите скидку" v-model.number="editedItem.discount" @focus="setActiveField('discount')" />
        </div>
        <div class="flex flex-col">
          <span class="text-base mb-1 font-medium">Итоговая стоимость</span>
          <input type="number" class="input w-full" :class="{ 'input-primary': activeField === 'total' }"
            placeholder="Введите итоговую стоимость" v-model.number="editedItem.total" @focus="setActiveField('total')"
            readonly />
        </div>
      </div>
    </div>
    <div class="flex w-full justify-between mt-5">
      <button class="btn btn-error btn-xl flex items-center gap-3 text-xl" @click="cancel">
        <XCircleIcon />
        Отменить
      </button>
      <button class="btn btn-success btn-xl flex items-center gap-3 text-xl" @click="save">
        <CheckCircleIcon />
        Сохранить
      </button>
    </div>
  </div>
</template>

<style scoped></style>