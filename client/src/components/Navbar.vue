<script setup lang="ts">
import { RouterLink } from "vue-router";
import ModeToggle from "./ModeToggle.vue";
import NavDropDown from "./NavDropDown.vue";

</script>
<template>
    <header class="flex justify-between items-center p-4 border-b">
        <NavDropDown />
        <RouterLink class="text-xl font-semibold" to="/">iExpress</RouterLink>
        <nav class="gap-2 items-center hidden md:flex">
            <RouterLink class="btn btn-link" to="/">Home</RouterLink>
            <RouterLink class="btn btn-link" to="/about">About</RouterLink>
        </nav>
        <ModeToggle class="hidden md:block" />
    </header>
</template>
