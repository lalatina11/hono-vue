<template>
    <div class="w-full h-full flex justify-center items-center min-h-screen">
        <slot />
    </div>
</template>
<script setup lang="ts">
const props = defineProps < { title: string } > ()
document.title = props.title
</script>