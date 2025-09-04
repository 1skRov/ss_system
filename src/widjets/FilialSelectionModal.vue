<script setup>
import { ref, computed, watch } from 'vue';
import { useFilialStore } from '@/stores/filialStore';

const filialStore = useFilialStore();

const localSelectedFilialId = ref(null);
const localSelectedKassaId = ref(null);

const kassasForSelectedFilial = computed(() => {
    if (localSelectedFilialId.value == null) return [];
    const fid = Number(localSelectedFilialId.value);
    return filialStore.kassas.filter(k => Number(k.stock_id) === fid);
});

watch(localSelectedFilialId, () => {
    localSelectedKassaId.value = null;
});

const canConfirm = computed(() =>
    !!localSelectedFilialId.value && !!localSelectedKassaId.value
);

function confirmSelection() {
    if (canConfirm.value) {
        filialStore.setFilialAndKassa(localSelectedFilialId.value, localSelectedKassaId.value);
    }
}
</script>

<template>
    <dialog id="filial_modal" class="modal modal-open">
        <div class="modal-box w-1/2">
            <h3 class="font-bold text-lg mb-5">Для продолжения работы, выберите филиал и кассу</h3>
            <div class="form-control w-full flex flex-col gap-0.5">
                <label class="label text-sm">
                    <span class="label-text">Выберите филиал из списка</span>
                </label>
                <select class="select select-bordered select-sm w-full" v-model="localSelectedFilialId">
                    <option disabled :value="null" class="text-base">Выберите филиал</option>
                    <option v-for="filial in filialStore.filials" :key="filial._id" :value="Number(filial._id)"
                        class="text-base">
                        {{ filial.title }}
                    </option>
                </select>
            </div>

            <div class="form-control w-full mt-4 flex flex-col gap-0.5">
                <label class="label">
                    <span class="label-text">Выберите кассу из списка</span>
                </label>
                <select class="select select-bordered select-sm w-full" v-model="localSelectedKassaId"
                    :disabled="!localSelectedFilialId">
                    <option disabled :value="null" class="text-base">Выберите кассу</option>
                    <option v-for="kassa in kassasForSelectedFilial" :key="kassa._id" :value="Number(kassa._id)"
                        class="text-base">
                        {{ kassa.title }}
                    </option>
                </select>
            </div>
            <div class="form-control w-full mt-4 flex flex-col gap-0.5">
                <label class="label">
                    <span class="label-text">Выберите сотрудника из списка</span>
                </label>
                <select class="select select-bordered select-sm w-full">
                    <option disabled :value="null" class="text-base">Выберите сотрудника</option>
                </select>
            </div>
            <div class="form-control w-full mt-4 flex flex-col gap-0.5">
                <label class="label">
                    <span class="label-text">Выберите клиента из списка</span>
                </label>
                <select class="select select-bordered select-sm w-full">
                    <option disabled :value="null" class="text-base">Выберите клиента</option>
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
<style lang="scss" scoped></style>