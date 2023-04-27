<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import MediaCredits from "@/components/MediaCredits.vue";
import MediaVideos from "./MediaVideos.vue";
import MediaImages from "./MediaImages.vue";

const route = useRoute();
const mediaType = route.name === "MovieDetails" ? "movie" : "serie";

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
      class="flex-grow px-2 py-4 text-center text-sm uppercase sm:text-base"
      :class="[activeTab === tab ? 'bg-rose-800 text-white' : '']"
    >
      {{ tab }}
    </button>
  </div>
  <component :is="sectionTabs[activeTab]"></component>
</template>
