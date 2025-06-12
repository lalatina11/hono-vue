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
            <RouterLink active-class="btn-accent" class="btn" to="/">Home</RouterLink>
            <RouterLink active-class="btn-accent" class="btn" to="/auth">Login</RouterLink>
        </nav>
        <ModeToggle class="hidden md:block" />
    </header>
</template>
