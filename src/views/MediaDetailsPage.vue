<script setup lang="ts">
import { ref, computed, provide } from "vue";
import { getMediaDetails } from "../composables/tmdb";
import MediaOverview from "@/components/MediaOverview.vue";
import CardCarousel from "@/components/CardCarousel.vue";
import MediaCard from "@/components/MediaCard.vue";
import MediaMoreDetails from "@/components/MediaMoreDetails.vue";
import MediaCredits from "@/components/MediaCredits.vue";
import MediaVideos from "@/components/MediaVideos.vue";
import MediaImages from "@/components/MediaImages.vue";
import TransitionFade from "@/components/TransitionFade.vue";

const props = defineProps<{
  media: "movies" | "series";
  id: string;
}>();

const activeTab = ref<string>("Credits");
const sectionTabs: Record<string, any> = {
  Credits: MediaCredits,
  Videos: MediaVideos,
  Images: MediaImages,
};

const type = props.media === "movies" ? "movie" : "tv";

const { data: mediaDetails } = await getMediaDetails(props.id, type);

const mediaRecommendationsList = computed(() => {
  return mediaDetails.value!.recommendations.results.slice(0, 7);
});

const mediaCredits = computed(() => {
  return "aggregate_credits" in mediaDetails.value!
    ? mediaDetails.value!.aggregate_credits
    : mediaDetails.value!.credits;
});

provide("credits", mediaCredits.value);
provide("images", mediaDetails.value?.images);
provide("videos", mediaDetails.value?.videos.results);
</script>

<template>
  <main>
    <MediaOverview :media="mediaDetails!" :type="props.media"></MediaOverview>
    <div class="mx-auto grid max-w-7xl md:grid-cols-[1fr_240px]">
      <div class="overflow-hidden">
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
        <CardCarousel name="recommendations" title="Recommendations">
          <template #cards>
            <MediaCard
              class="snap-start"
              v-for="media in mediaRecommendationsList"
              :key="media.id"
              :media="media"
              :type="props.media"
            />
            <div
              v-if="mediaRecommendationsList.length === 0"
              class="grow italic text-rose-800"
            >
              There are no recommendations for this media
            </div>
          </template>
        </CardCarousel>
      </div>
      <MediaMoreDetails :media="mediaDetails!" :type="props.media" />
    </div>
  </main>
</template>
