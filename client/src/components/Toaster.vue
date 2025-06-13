<template>
    <div v-if="toastMessage" @click="clearToast" class="toast">
        <div class="alert alert-info">
            <span class="font-semibold">{{ toastMessage }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToasterStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const { toastMessage } = storeToRefs(useToasterStore())
const { clearToast } = useToasterStore()



watch(toastMessage, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            clearToast()
        }, 5000);
    }
})

</script>