<template>
    <div>
        <main>
            <NavDropDown />
        </main>
        <slot />
    </div>
</template>
<script lang="ts" setup>
import NavDropDown from "@/components/NavDropDown.vue"
const props = defineProps<{ title: string }>()
document.title = props.title
</script>