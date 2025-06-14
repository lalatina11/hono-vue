<script setup lang="ts">
import { apiRequest } from "@/helpers";
import MainLayout from '@/layouts/MainLayout.vue';
import { useAdminStore, useToasterStore } from '@/stores';
import type { Expeditions } from "@/types";
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
const { admin } = storeToRefs(useAdminStore())
const { setAdmin, removeAdmin } = useAdminStore()
const { setToast } = useToasterStore()
const getAdmin = async () => {
  const { res } = await apiRequest.get('/api/admin/current-admin')
  if (!res.ok) {
    return removeAdmin()
  }
  const result = await res.json()
  if (result.error) {
    return setToast(result.message)
  }

  if (!result.data) {
    return removeAdmin()
  }
  setAdmin(result.data)
}

onMounted(async () => {
  await getAdmin()
  if (!admin.value) {
    return location.replace("/auth?type=login")
  }
})

const { isPending: expeditonFetchPending, isError: expeditionFetchIsError, data: expeditionsData, error: expeditionsFetchError } = useQuery({
  queryKey: ['expeditions'],
  queryFn: async () => {
    const { res } = await apiRequest.get("/api/exp")
    const result = await res.json()
    return result.data as Expeditions[]
  },
})

const expeditions = ref<Expeditions[]>(expeditionsData.value ?? [])

watch(admin, () => {
  if (!admin.value) {
    return location.replace("/auth?type=login")
  }
})
watch(expeditionsData, (newVal) => {
  expeditions.value = newVal ?? []
})
const handleLogout = async () => {
  try {
    await apiRequest.post("/api/admin/logout")
    removeAdmin()
    setToast("Logout berhasil")
    location.replace("/auth?type=login")
  } catch (error) {
    setToast((error as Error).message)
  }
}
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
  <MainLayout title="iExpress | Home">
    <main class="flex flex-col gap-6">
      <h1>{{ admin?.username }}</h1>
      <section class="flex gap-2 items-center">
        <form @submit.prevent="handleLogout">
          <button class="btn btn-error">Logout</button>
        </form>
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
            <span class="card-title">{{ exp.title }}</span>
            <span>{{ exp.desc }}</span>
            <span>{{ exp.resi }}</span>
          </div>
        </div>
      </section>
      <span v-if="expeditionFetchIsError">{{
        expeditionsFetchError?.message }}</span>
      <span v-if="!expeditions.length">Belum ada expedisi</span>
    </main>
  </MainLayout>
</template>
