<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import TransitionFade from "./components/TransitionFade.vue";
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
      <TransitionFade>
        <Suspense timeout="0">
          <template #default>
            <component :is="Component" :key="$route.params"></component>
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
      </TransitionFade>
    </RouterView>
    <AppFooter></AppFooter>
  </div>
</template>

<style></style>
