<template>
    <header class="flex justify-between items-center p-4">
        <h1>EmBlogs</h1>
        <nav>
            <RouterLink to="/">Home</RouterLink>
        </nav>
        <button>
            Mode
        </button>
    </header>
</template>
<script lang="ts" setup>
import { RouterLink } from "vue-router"
</script>