<script setup lang="ts">
import { apiRequest } from '@/helpers';
import { useToasterStore } from '@/stores';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const { replace } = useRouter()
const { setToast } = useToasterStore()
const handleDeleteExp = async () => {
    await apiRequest.post(`/api/exp/delete?id=${route.params.id}`)
    setToast("Berhasil Hapus Expedisi!")
    return replace("/")
}
</script>
<template>
    <button class="btn btn-error" onclick="deleteExpModal.showModal()">Hapus Expedisi ini</button>
    <dialog id="deleteExpModal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Apa anda yakin?</h3>
            <p class="py-4">Tindakan ini tidak bisa dipulihkan</p>
            <div class="modal-action flex justify-between items-center">
                <button onclick="deleteExpModal.close()" class="btn">Close</button>
                <form @submit.prevent="handleDeleteExp">
                    <button onclick="deleteExpModal.close()" class="btn btn-error">Hapus</button>
                </form>
            </div>
        </div>
    </dialog>
</template>