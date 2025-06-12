<template>
    <AuthLayout title="iExpress">
        <div v-if="authType === 'login'" class="card bg-base-100 w-96 shadow-sm shadow-zinc-500 border border-zinc-500">
            <form @submit.prevent="login" class="flex justify-center items-center flex-col p-6 gap-3">
                <div class="form-control flex flex-col gap-2 w-full">
                    <label for="username" class="label">
                        <span class="label-text">Username</span>
                    </label>
                    <input type="text" placeholder="username" id="username" class="input input-bordered" />
                </div>
                <div class="form-control flex flex-col gap-2 w-full">
                    <label for="password" class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" id="password" class="input input-bordered" />
                </div>
                <div class="form-control flex gap-2 items-center w-full my-2">
                    <input type="checkbox" onclick="password.type = password.type==='password'?'text':'password'"
                        class="checkbox checkbox-md checkbox-accent" id="showpassword">
                    <label for="showpassword" class="label label-text">Show Password</label>
                </div>
                <button class="btn btn-primary w-full my-2">Login</button>
            </form>
        </div>
        <div v-if="authType === 'create'"
            class="card bg-base-100 w-96 shadow-sm shadow-zinc-500 border border-zinc-500">
            <form v-if="isAdminAuthority" @submit.prevent="createAdmin"
                class="flex justify-center items-center flex-col p-6 gap-3">
                <h1 class="text-xl font-semibold">New Admin</h1>
                <div class="form-control flex flex-col gap-2 w-full">
                    <label for="username" class="label">
                        <span class="label-text">Username</span>
                    </label>
                    <input type="text" placeholder="username" id="username" class="input input-bordered" />
                </div>
                <div class="form-control flex flex-col gap-2 w-full">
                    <label for="password" class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" id="password" class="input input-bordered" />
                </div>
                <div class="form-control flex gap-2 items-center w-full my-2">
                    <input type="checkbox" onclick="password.type = password.type==='password'?'text':'password'"
                        class="checkbox checkbox-md checkbox-accent" id="showpassword">
                    <label for="showpassword" class="label label-text">Show Password</label>
                </div>
                <button class="btn btn-primary w-full my-2">Login</button>
            </form>
            <form v-if="!isAdminAuthority" @submit.prevent="handleAdminAuthority" class="flex flex-col p-6 gap-3">
                <label class="label" for="adminauthpass">Password</label>
                <input type="password" class="input input-accent" name="adminauthpass" id="adminauthpass">
                <button class="btn btn-accent">Gasss</button>
            </form>
            <form v-if="isAdminAuthority" @submit.prevent="handleLogoutAdminAuthority"
                class="flex justify-center items-center pb-6 px-6">
                <button class="btn btn-error w-full">Logout</button>
            </form>
        </div>
    </AuthLayout>
</template>
<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useToasterStore } from '@/stores';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
// const searchParams = new URLSearchParams(window.location.search);
// console.log(searchParams.get("type"));
const route = useRoute()
const authType = ref("")
const { setToast } = useToasterStore()
const isAdminAuthority = ref(false)
const login = () => {
    setToast("Login")
}

const handleAdminAuthority = async (e: Event) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement

    const res = await fetch("/api/admin/request-add", {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ password: new FormData(form).get("adminauthpass") })
    })
    if (!res.ok) {
        form.reset()
        return isAdminAuthority.value = false
    }
    const result = await res.json()
    if (result.error) {
        form.reset()
        return isAdminAuthority.value = false
    }
    isAdminAuthority.value = true
    form.reset()
}

const handleLogoutAdminAuthority = async () => {
    await fetch('/api/admin/request-add/logout', { method: "POST", credentials: "include", })
    isAdminAuthority.value = false
}


onMounted(() => {
    const queryType = route.query.type as "login" | "create"
    if (queryType === 'create') {
        authType.value = 'create'
    } else if (queryType === 'login') {
        authType.value = 'login'
    } else {
        location.replace("/auth?type=login")
    }
})

onMounted(async () => {
    const res = await fetch("/api/admin/request-add", { credentials: "include" })
    if (!res.ok) {
        return isAdminAuthority.value = false
    }
    const result = await res.json()
    if (result.error) {
        return isAdminAuthority.value = false
    }
    isAdminAuthority.value = true
})

const createAdmin = async () => {
    // const res = await fetch('')
}

watch(isAdminAuthority, (newVal) => {
    if (newVal) {
        isAdminAuthority.value = newVal
    }
})

</script>