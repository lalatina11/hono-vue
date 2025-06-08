<template>
    <div>
        <Navbar />
        <slot />
    </div>
</template>
<script lang="ts" setup>
import Navbar from "../components/Navbar.vue"
const props = defineProps<{ title: string }>()
document.title = props.title
</script>