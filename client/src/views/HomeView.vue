<script setup lang="ts">
import Expeditions from "@/components/Expeditions.vue";
import { apiRequest } from "@/helpers";
import MainLayout from '@/layouts/MainLayout.vue';
import { useAdminStore, useToasterStore, type AdminType } from '@/stores';
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from 'pinia';
import { watch } from "vue";
const { admin } = storeToRefs(useAdminStore())
const { setAdmin, removeAdmin } = useAdminStore()
const { setToast } = useToasterStore()
const getAdmin = async () => {
  const { res } = await apiRequest.get('/api/admin/current-admin')
  if (!res.ok) {
    removeAdmin()
    return handleLogout()
  }
  const result = await res.json()
  return result.data as AdminType
}
const { data: adminData, isError: isFetchAdminError } = useQuery({ queryKey: ['admin'], queryFn: getAdmin })

if (!adminData) {
  location.replace("/auth?type=login")
} else {
  setAdmin(adminData.value as AdminType)
}

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
watch(adminData, (newVal) => {
  if (newVal) {
    setAdmin(adminData.value as AdminType)
  } else {
    removeAdmin()
    return location.replace("/auth?type=login")
  }
})
watch(isFetchAdminError, (newVal) => {
  if (newVal && !admin.value || isFetchAdminError) {
    removeAdmin()
    return location.replace("/auth?type=login")
  }
})
</script>

<template>
  <MainLayout title="iExpress | Home">
    <main class="flex flex-col gap-6">
      <h1>{{ admin?.username }}</h1>
      <section>
        <form @submit.prevent="handleLogout">
          <button class="btn btn-error">Logout</button>
        </form>
      </section>
      <Expeditions />
    </main>
  </MainLayout>
</template>
