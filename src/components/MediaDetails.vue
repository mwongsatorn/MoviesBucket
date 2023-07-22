<script setup lang="ts">
import { ref } from "vue";
import MediaCredits from "@/components/MediaCredits.vue";
import MediaVideos from "./MediaVideos.vue";
import MediaImages from "./MediaImages.vue";
import TransitionFade from "./TransitionFade.vue";

const activeTab = ref<string>("Credits");
const sectionTabs: Record<string, any> = {
  Credits: MediaCredits,
  Videos: MediaVideos,
  Images: MediaImages,
};
</script>

<template>
  <div class="flex font-bold">
    <button
      v-for="(_, tab) in sectionTabs"
      :key="tab"
      @click="activeTab = tab"
      class="flex-grow bg-gray-50 px-2 py-4 text-center text-sm uppercase sm:text-base"
      :class="[
        activeTab === tab
          ? 'bg-rose-800 text-white'
          : 'hover:bg-amber-500 hover:text-white',
      ]"
    >
      {{ tab }}
    </button>
  </div>
  <TransitionFade>
    <KeepAlive>
      <component :is="sectionTabs[activeTab]"></component>
    </KeepAlive>
  </TransitionFade>
</template>
