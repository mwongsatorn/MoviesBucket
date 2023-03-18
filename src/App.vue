<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { ref, onErrorCaptured } from "vue";

const error = ref();

onErrorCaptured((e) => {
  error.value = e;
});
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
        <Suspense timeout="0">
          <template #default>
            <component :is="Component"></component>
          </template>
          <template #fallback>
            <div>
              <div v-if="error">
                {{ error }}
              </div>
              <div v-else>Loading......</div>
            </div>
          </template>
        </Suspense>
      </Transition>
    </RouterView>
    <AppFooter></AppFooter>
  </div>
</template>

<style></style>
