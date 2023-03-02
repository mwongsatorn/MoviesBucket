<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader></AppHeader>
    <RouterView v-slot="{ Component }">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-300"
        leave-active-class="transition duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-1"
        leave-from-class="opacity-1"
        leave-to-class="opacity-0"
      >
        <component :is="Component"></component>
      </Transition>
    </RouterView>
    <AppFooter></AppFooter>
  </div>
</template>

<style></style>
