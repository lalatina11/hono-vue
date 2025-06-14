<script setup lang="ts">
import DeleteExp from '@/components/SingleExp/DeleteExp.vue';
import UpdateExp from '@/components/SingleExp/UpdateExp.vue';
import { apiRequest } from '@/helpers';
import MainLayout from '@/layouts/MainLayout.vue';
import { useToasterStore } from '@/stores';
import type { Expeditions } from '@/types';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const router = useRoute()
const { setToast } = useToasterStore()
const expId = router.params.id
const fetchSingleExp = async () => {
    const { res } = await apiRequest.get(`/api/exp/single?id=${expId}`)
    const result = await res.json()
    if (!res.ok || result.error) {
        return location.replace('/')
    }
    if (!result.data) return location.replace('/')
    return result.data as Expeditions
}
const { data, isLoading, error } = useQuery({ queryKey: ['expedition'], queryFn: fetchSingleExp })
const expeditionData = ref<Expeditions>(data.value as Expeditions)
watch(data, (newVal) => {
    if (newVal) {
        expeditionData.value = newVal
    }
})

const updateExp = async (e: Event) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    try {
        const formData = new FormData(form)
        const body = Object.fromEntries(formData.entries()) as { title: string; desc: string }
        if (body.desc.trim().length && body.title.length) {
            const { res } = await apiRequest.post(`/api/exp/update?id=${expId}`, body)
            const result = await res.json()
            if (!res.ok || result.error) {
                throw new Error(result.message || "Something went wrong")
            }
            expeditionData.value = result.data
            setToast("Expedisi berhasil diupdate!")
            form.reset()
        } else {
            throw new Error("isi form yang bener woi")
        }
    } catch (error) {
        setToast((error as Error).message)
        form.reset()
    }
}
</script>
<template>
    <MainLayout :title="`Expedition | ${expId}`">
        <main class="flex flex-col gap-3">
            <section>
                <RouterLink to="/" class="btn">Back</RouterLink>
            </section>
            <section v-if="isLoading" class="card w-sm md:w-full bg-base-100 card-lg shadow-sm shadow-zinc-500">
                <div class="card-body">
                    <span class="h-3 w-full bg-zinc-500 rounded-md card-title"></span>
                    <span class="h-3 w-full bg-zinc-500 rounded-md"></span>
                    <span class="h-3 w-full bg-zinc-500 rounded-md"></span>
                </div>
            </section>
            <section v-if="expeditionData" class="card w-sm md:w-full bg-base-100 card-lg shadow-sm shadow-zinc-500">
                <div class="card-body">
                    <span class="card-title">Judul expedisi: {{ expeditionData.title }}</span>
                    <span>Deskripsi expedisi: {{ expeditionData.desc }}</span>
                    <span>No Resi: {{ expeditionData.resi }}</span>
                </div>
            </section>
            <section class="flex gap-3 justify-center items-center">
                <button class="btn btn-primary" onclick="updateExpModal.showModal()">Update Expedisi ini</button>
                <dialog id="updateExpModal" class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                        <h3 class="text-lg font-bold">Update Expedisi!</h3>
                        <form v-if="expeditionData" @submit.prevent="updateExp" class="space-y-6">
                            <div class="flex flex-col gap-3">
                                <label class="label floating-label" for="title">Title</label>
                                <input class="input input-secondary" type="text" :value="expeditionData.title"
                                    name="title" id="title">
                            </div>
                            <div class="flex flex-col gap-3">
                                <label class="label floating-label" for="desc">Desc</label>
                                <input class="input input-secondary" type="text" :value="expeditionData.desc"
                                    name="desc" id="desc">
                            </div>
                            <div class="flex gap-3 justify-between items-center">
                                <button type="button" onclick="updateExpModal.close()"
                                    class="btn btn-primary">Close</button>
                                <button type="submit" onclick="updateExpModal.close()"
                                    class="btn btn-secondary">Submit</button>
                            </div>
                        </form>
                    </div>
                </dialog>
                <DeleteExp />
            </section>
        </main>
    </MainLayout>
</template>