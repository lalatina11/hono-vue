<template>
    <header class="flex justify-between items-center p-4 border-b">
        <RouterLink class="text-xl font-semibold" to="/">iBlogs</RouterLink>
        <nav class="flex gap-2 items-center">
            <RouterLink class="btn btn-link" to="/">Home</RouterLink>
            <RouterLink class="btn btn-link" to="/about">About</RouterLink>
        </nav>
        <button class="btn" @click="handleSwithTheme">
            <svg v-if="theme === 'dim'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-sun-icon lucide-sun">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <svg v-if="theme === 'silk'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-moon-icon lucide-moon">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
        </button>
    </header>
</template>
<script lang="ts" setup>
import { useThemeStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { RouterLink } from "vue-router"
const { setTheme } = useThemeStore()
const { theme } = storeToRefs(useThemeStore())
const handleSwithTheme = () => {
    if (theme.value === "silk") {
        setTheme("dim")
    } else {
        setTheme("silk")
    }
}

onMounted(() => {
    document.documentElement.setAttribute("data-theme", theme.value)
})
watch(theme, newVal => {
    if (newVal) {
        document.documentElement.setAttribute("data-theme", newVal)
    }
})
</script>