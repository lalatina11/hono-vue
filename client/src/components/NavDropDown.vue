<template>
    <details class="dropdown">
        <summary class="btn m-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-chevron-down-icon lucide-chevron-down">
                <path d="m6 9 6 6 6-6" />
            </svg></summary>
        <ul
            class="menu dropdown-content bg-base-100 rounded-box z-1 min-w-32 p-2 shadow-sm flex flex-col justify-center items-center gap-3">
            <li class="w-full">
                <RouterLink class="btn" to="/">Home</RouterLink>
            </li>
            <li class="w-full">
                <LogoutForm />
            </li>
            <li class="w-full">
                <ModeToggle />
            </li>
        </ul>
    </details>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ModeToggle from './ModeToggle.vue';
import LogoutForm from "@/components/auth/LogoutForm.vue"

</script>