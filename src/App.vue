<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader></AppHeader>
    <RouterView v-slot="{ Component }">
      <component :is="Component"></component>
    </RouterView>
    <AppFooter></AppFooter>
  </div>
</template>

<style></style>
