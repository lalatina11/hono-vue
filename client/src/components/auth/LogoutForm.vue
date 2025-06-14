<script setup lang="ts">
import { apiRequest } from '@/helpers'
import { useAdminStore, useToasterStore } from '@/stores'
const { removeAdmin } = useAdminStore()
const { setToast } = useToasterStore()
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
    <section>
        <form @submit.prevent="handleLogout">
            <button class="btn btn-error">Logout</button>
        </form>
    </section>
</template>