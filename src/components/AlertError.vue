<script setup>
import XCircleIcon from '@/assets/icons/XCircleIcon.vue';
import AlertIcon from '@/assets/icons/AlertIcon.vue';
const props = defineProps({
    type: { type: String, default: 'error' }, // error | warning | info | success
    title: { type: String, default: '' },
    text: { type: String, required: true },
    closable: { type: Boolean, default: true },
});
const emit = defineEmits(['close']);
</script>

<template>
    <div :class="['alert', `alert-${type}`, 'mb-3']" role="alert">
        <div class="alert-icon">
            <AlertIcon />
        </div>
        <h3 v-if="title" class="font-medium mr-1">{{ title }}:</h3>
        <span class="truncate">{{ text }}</span>
        <button v-if="closable" class="btn btn-ghost btn-xs ml-auto"
            @click="emit('close')"><x-circle-icon></x-circle-icon></button>
    </div>
</template>
