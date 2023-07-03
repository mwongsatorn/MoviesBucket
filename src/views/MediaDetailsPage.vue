<script setup lang="ts">
import { computed, provide } from "vue";
import { getMediaDetails } from "../composables/tmdb";
import MediaOverview from "@/components/MediaOverview.vue";
import MediaDetails from "@/components/MediaDetails.vue";
import CardCarousel from "@/components/CardCarousel.vue";
import MediaCard from "@/components/MediaCard.vue";
import MediaMoreDetails from "@/components/MediaMoreDetails.vue";

const props = defineProps<{
  media: "movies" | "series";
  id: string;
}>();

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
        <MediaDetails />
        <CardCarousel name="recommendations" title="Recommendations">
          <template #cards>
            <MediaCard
              class="snap-start"
              v-for="media in mediaRecommendationsList"
              :key="media.id"
              :media="media"
              :type="props.media"
            />
          </template>
        </CardCarousel>
      </div>
      <MediaMoreDetails :media="mediaDetails!" :type="props.media" />
    </div>
  </main>
</template>
