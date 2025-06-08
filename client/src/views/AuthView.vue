<template>
    <AuthLayout title="iExpress">
        <div v-if="authtype === 'login'" class="card bg-base-100 w-96 shadow-sm shadow-zinc-500 border border-zinc-500">
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
        <div v-if="authtype === 'create'">
            <div class="card bg-base-100 w-96 shadow-sm shadow-zinc-500 border border-zinc-500">
                <div class="card-body">
                    <h2 class="card-title">Card Title</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    </AuthLayout>
</template>
<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get("type"));

const login = () => {
    alert("ok")
}

const route = useRoute()
const authtype = route.query.type as "login" | "create"
onMounted(() => {
    if (!authtype) {
        location.replace("/auth?type=login")
    }
})

</script>