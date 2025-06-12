<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';
const { admin } = storeToRefs(useAdminStore())
if (!admin.value) {
  location.replace("/auth?type=login")
}
</script>

<template>
  <MainLayout title="iExpress | Home">
    <main>
      <h1>Hello world</h1>
      <h1>Hello world</h1>
    </main>
  </MainLayout>
</template>
