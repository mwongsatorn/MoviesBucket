<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <AppHeader></AppHeader>
  <RouterView v-slot="{ Component }">
    <Suspense timeout="0">
      <template #default>
        <component :is="Component"></component>
      </template>
      <template #fallback>
        <div>Loading from app</div>
      </template>
    </Suspense>
  </RouterView>
</template>

<style></style>
