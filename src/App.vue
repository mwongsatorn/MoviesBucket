<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import TransitionFade from "./components/TransitionFade.vue";
import { ref, onErrorCaptured } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const error = ref();

onErrorCaptured((e) => {
  error.value = e;
});
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader></AppHeader>
    <RouterView v-slot="{ Component }">
      <TransitionFade>
        <Suspense timeout="0">
          <template #default>
            <component :is="Component" :key="route.params"></component>
          </template>
          <template #fallback>
            <div v-if="error">
              {{ error }}
            </div>
            <div
              class="fixed inset-0 z-[9999] flex items-center justify-center bg-white px-4"
              v-else
            >
              <div class="w-full max-w-[400px]">
                <img
                  class="aspect-auto w-full"
                  src="./assets/mediabucket-logo.svg"
                  alt=""
                />
              </div>
            </div>
          </template>
        </Suspense>
      </TransitionFade>
    </RouterView>
    <AppFooter></AppFooter>
  </div>
</template>

<style></style>
