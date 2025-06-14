<script setup lang="ts">
import { apiRequest } from '@/helpers'
import { useAdminStore, useToasterStore } from '@/stores'
import type { Expeditions as ExpeditionsType } from '@/types'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
const { setToast } = useToasterStore()
const { admin } = storeToRefs(useAdminStore())

const { isPending: expeditonFetchPending, isError: expeditionFetchIsError, data: expeditionsData, error: expeditionsFetchError } = useQuery({
    queryKey: ['expeditions'],
    queryFn: async () => {
        if (!admin.value) throw new Error("login dulu bos")
        const { res } = await apiRequest.get("/api/exp")
        const result = await res.json()
        return result.data as ExpeditionsType[]
    },
})

const expeditions = ref<ExpeditionsType[]>(expeditionsData.value ?? [])
watch(expeditionsData, (newVal) => {
    expeditions.value = newVal ?? []
})
const handleAddExp = async (e: Event) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    try {
        const formData = new FormData(form)
        const body = Object.fromEntries(formData.entries()) as { title: string; desc: string }
        if (body.desc.trim().length && body.title.length) {
            const { res } = await apiRequest.post("/api/exp", body)
            const result = await res.json()
            if (!res.ok || result.error) {
                throw new Error(result.message || "Something went wrong")
            }
            expeditions.value = [result.data, ...expeditions.value]
            setToast("Expedisi berhasil ditambahkan!")
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
    <section class="flex gap-2 items-center">

        <button class="btn btn-primary" onclick="addExpModal.showModal()">Add new Expedition</button>
        <dialog id="addExpModal" class="modal space-y-6">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Add new Expedition!</h3>
                <form @submit.prevent="handleAddExp" class="space-y-6">
                    <div class="flex flex-col gap-3">
                        <label class="label floating-label" for="title">Title</label>
                        <input class="input input-secondary" type="text" name="title" id="title">
                    </div>
                    <div class="flex flex-col gap-3">
                        <label class="label floating-label" for="desc">Desc</label>
                        <input class="input input-secondary" type="text" name="desc" id="desc">
                    </div>
                    <div class="flex gap-3 justify-between items-center">
                        <button type="button" onclick="addExpModal.close()" class="btn">Close</button>
                        <button type="submit" onclick="addExpModal.close()" class="btn btn-secondary">Submit</button>
                    </div>
                </form>
            </div>
        </dialog>
    </section>
    <section v-if="expeditonFetchPending" class="grid grid-cols-3 gap-4">
        <div v-for="i in 9" :key="i" class="card w-96 bg-base-100 card-lg shadow-sm shadow-zinc-500">
            <div class="card-body">
                <span class="card-title bg-zinc-500 filter blur-6px w-full h-3 rounded-md"></span>
                <span class="bg-zinc-500 filter blur-6px w-full h-3 rounded-md"></span>
                <span class="bg-zinc-500 filter blur-6px w-full h-3 rounded-md"></span>
                <span class="bg-zinc-500 filter blur-6px w-full h-3 rounded-md"></span>
                <span class="bg-zinc-500 filter blur-6px w-full h-3 rounded-md"></span>
            </div>
        </div>
    </section>
    <section v-if="expeditions.length" class="grid grid-cols-3 gap-4">
        <div v-for="exp in expeditions" :key="exp.id" class="card w-96 bg-base-100 card-lg shadow-sm shadow-zinc-500">
            <div class="card-body">
                <span class="card-title">Judul expedisi: {{ exp.title }}</span>
                <span>Deskripsi expedisi: {{ exp.desc }}</span>
                <span>No Resi: {{ exp.resi }}</span>
            </div>
        </div>
    </section>
    <span v-if="expeditionFetchIsError">{{
        expeditionsFetchError?.message }}</span>
    <span v-if="!expeditions.length">Belum ada expedisi</span>
</template>