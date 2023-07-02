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

const moneyFormat = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});

const mediaBudget = computed(() => {
  return "budget" in mediaDetails.value!
    ? moneyFormat.format(mediaDetails.value.budget)
    : null;
});

const mediaRevenue = computed(() => {
  return "revenue" in mediaDetails.value!
    ? moneyFormat.format(mediaDetails.value.revenue)
    : null;
});

const mediaKeywords = computed(() => {
  return "keywords" in mediaDetails.value!.keywords
    ? mediaDetails.value!.keywords.keywords
    : mediaDetails.value!.keywords.results;
});

const mediaCredits = computed(() => {
  return "aggregate_credits" in mediaDetails.value!
    ? mediaDetails.value!.aggregate_credits
    : mediaDetails.value!.credits;
});

function mediaMoreDetailsProps() {
  return {
    keywords: mediaKeywords.value,
    homepage: mediaDetails.value!.homepage,
    originalLanguage: mediaDetails.value!.original_language,
    status: mediaDetails.value!.status,
    budget: mediaBudget.value,
    revenue: mediaRevenue.value,
    externalIds: mediaDetails.value!.external_ids,
  };
}

provide("credits", mediaCredits);
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
      <MediaMoreDetails v-bind="mediaMoreDetailsProps()" />
    </div>
  </main>
</template>
