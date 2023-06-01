<script setup lang="ts">
import { computed, provide } from "vue";
import { useRoute } from "vue-router";
import { getMediaDetails } from "../composables/tmdb";
import MediaOverview from "@/components/MediaOverview.vue";
import MediaDetails from "@/components/MediaDetails.vue";
import CardCarousel from "@/components/CardCarousel.vue";
import MediaCard from "@/components/MediaCard.vue";
import MediaMoreDetails from "@/components/MediaMoreDetails.vue";
import { mediaCardProps } from "@/utils/props";

const route = useRoute();

const mediaType = route.name === "MovieDetails" ? "movie" : "tv";

const { data: mediaDetails } = await getMediaDetails(
  route.params.id as string,
  mediaType
);

const mediaRecommendationsList = computed(() => {
  return mediaDetails.value!.recommendations.results.slice(0, 7);
});

const mediaRuntime = computed(() => {
  if (!("runtime" in mediaDetails.value!)) return null;
  if (mediaDetails.value.runtime === null) return null;
  const hrs = Math.floor(mediaDetails.value.runtime / 60).toString();
  const mins = (mediaDetails.value.runtime % 60).toString();
  return `${hrs} hr ${mins} min`;
});

const mediaReleaseDate = computed(() => {
  return "release_date" in mediaDetails.value!
    ? mediaDetails.value!.release_date
    : mediaDetails.value!.first_air_date;
});

const mediaReleaseYear = computed(() => {
  return mediaReleaseDate.value!.split("-")[0];
});

const mediaTitle = computed(() => {
  return "title" in mediaDetails.value!
    ? mediaDetails.value!.title
    : mediaDetails.value!.name;
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

function mediaOverviewProps() {
  return {
    backdropPath: mediaDetails.value!.backdrop_path,
    posterPath: mediaDetails.value!.poster_path,
    title: mediaTitle.value,
    releaseYear: mediaReleaseYear.value,
    voteAverage: mediaDetails.value!.vote_average,
    releaseDate: mediaReleaseDate.value,
    runtime: mediaRuntime.value,
    genres: mediaDetails.value!.genres,
    tagline: mediaDetails.value!.tagline,
    overview: mediaDetails.value!.overview,
  };
}

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
    <MediaOverview v-bind="mediaOverviewProps()"></MediaOverview>
    <div class="mx-auto grid max-w-7xl md:grid-cols-[1fr_240px]">
      <div class="overflow-hidden">
        <MediaDetails />
        <CardCarousel
          section-name="recommendations"
          header-title="Recommendations"
        >
          <MediaCard
            class="snap-start"
            v-for="media in mediaRecommendationsList"
            :key="media.id"
            v-bind="mediaCardProps(media)"
          />
        </CardCarousel>
      </div>
      <MediaMoreDetails v-bind="mediaMoreDetailsProps()" />
    </div>
  </main>
</template>
