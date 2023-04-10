<script setup lang="ts">
import { ref } from "vue";
import PersonCard from "@/components/PersonCard.vue";
import CreditsSection from "@/components/MediaDetailPages/DetailsSection/CreditsSection.vue";
import EpisodesSection from "@/components/MediaDetailPages/DetailsSection/EpisodesSection.vue";
import ImagesSection from "@/components/MediaDetailPages/DetailsSection/ImagesSection.vue";
import VideosSection from "@/components/MediaDetailPages/DetailsSection/VideosSection.vue";
import type { CreditsCastDetails } from "@/types";

interface Props {
  cast: CreditsCastDetails[] | undefined;
}

const activeTab = ref<string>("Credits");
const sectionTabs: Record<string, any> = {
  Credits: CreditsSection,
  Episodes: EpisodesSection,
  Images: ImagesSection,
  Videos: VideosSection,
};

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-wrap place-items-center font-bold">
    <button
      v-for="(_, tab) in sectionTabs"
      :key="tab"
      @click="activeTab = tab"
      class="w-1/3 px-4 py-4 text-center uppercase sm:w-1/4"
      :class="[activeTab === tab ? 'bg-rose-800 text-white' : '']"
    >
      {{ tab }}
    </button>
  </div>
  <component :is="sectionTabs[activeTab]"></component>
</template>
