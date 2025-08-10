<script setup>
import { ref, computed, watch } from 'vue';
import { useFilialStore } from '@/stores/filialStore';

const filialStore = useFilialStore();

const localSelectedFilialId = ref(null);
const localSelectedKassaId = ref(null);

const kassasForSelectedFilial = computed(() => {
    if (!localSelectedFilialId.value) return [];
    return filialStore.kassas.filter(kassa => kassa.stock_id === localSelectedFilialId.value);
});

watch(localSelectedFilialId, () => {
    localSelectedKassaId.value = null;
});

const canConfirm = computed(() => {
    return localSelectedFilialId.value && localSelectedKassaId.value;
});

function confirmSelection() {
    if (canConfirm.value) {
        filialStore.setFilialAndKassa(localSelectedFilialId.value, localSelectedKassaId.value);
    }
}
</script>

<template>
    <dialog id="filial_modal" class="modal modal-open">
        <div class="modal-box">
            <h3 class="font-bold text-lg mb-5">Выберите филиал и кассу</h3>
            <div class="form-control w-full flex justify-between">
                <label class="label">
                    <span class="label-text">Филиал</span>
                </label>
                <select class="select select-bordered select-sm" v-model="localSelectedFilialId">
                    <option disabled :value="null">Выберите филиал</option>
                    <option v-for="filial in filialStore.filials" :key="filial._id" :value="filial._id">
                        {{ filial.title }}
                    </option>
                </select>
            </div>

            <div class="form-control w-full mt-4 flex justify-between">
                <label class="label">
                    <span class="label-text">Касса</span>
                </label>
                <select class="select select-bordered select-sm" v-model="localSelectedKassaId"
                    :disabled="!localSelectedFilialId">
                    <option disabled :value="null">Выберите кассу</option>
                    <option v-for="kassa in kassasForSelectedFilial" :key="kassa._id" :value="kassa._id">
                        {{ kassa.title }}
                    </option>
                </select>
            </div>

            <div class="modal-action">
                <button class="btn btn-primary w-full btn-sm" :disabled="!canConfirm" @click="confirmSelection">
                    Подтвердить
                </button>
            </div>
        </div>
    </dialog>
</template>
<style lang="scss" scoped>
.label {
    font-size: 20px;
}
</style>