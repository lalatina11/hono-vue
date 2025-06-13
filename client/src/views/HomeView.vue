<script setup lang="ts">
import { apiRequest } from "@/helpers";
import MainLayout from '@/layouts/MainLayout.vue';
import { useAdminStore, useToasterStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
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

watch(admin, () => {
  if (!admin.value) {
    return location.replace("/auth?type=login")
  }
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
</script>

<template>
  <MainLayout title="iExpress | Home">
    <main>
      <h1>{{ admin?.username }}</h1>
      <form @submit.prevent="handleLogout">
        <button class="btn btn-error">Logout</button>
      </form>
    </main>
  </MainLayout>
</template>
