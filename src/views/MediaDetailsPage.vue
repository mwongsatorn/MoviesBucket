<script setup lang="ts">
import { computed, provide } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { getMediaDetails } from "../composables/tmdb";

import MediaCard from "@/components/MediaCard.vue";
import MediaDetails from "@/components/MediaDetails.vue";
import MediaMoreDetails from "@/components/MediaMoreDetails.vue";

const route = useRoute();

const mediaType = route.name === "MovieDetails" ? "movie" : "tv";
const mediaEndpointType = route.name === "MovieDetails" ? "movies" : "series";

const { data: mediaDetails } = await getMediaDetails(
  route.params.id as string,
  mediaType
);

const mediaRecommendationList = computed(() => {
  return mediaDetails.value?.recommendations?.results.slice(0, 7);
});

const mediaRuntime = computed(() => {
  if (!mediaDetails.value) return null;
  if (!("runtime" in mediaDetails.value)) return null;
  if (mediaDetails.value.runtime === null) return null;
  const hrs = Math.floor(mediaDetails.value.runtime / 60).toString();
  const mins = (mediaDetails.value.runtime % 60).toString();
  return `${hrs}hr${mins}min`;
});

const mediaReleaseDate = computed(() => {
  if (!mediaDetails.value) return null;
  return "release_date" in mediaDetails.value
    ? mediaDetails.value.release_date
    : mediaDetails.value.first_air_date;
});

const mediaReleaseYear = computed(() => {
  return mediaReleaseDate.value?.split("-")[0];
});

const mediaTitle = computed(() => {
  if (!mediaDetails.value) return null;
  return "title" in mediaDetails.value
    ? mediaDetails.value.title
    : mediaDetails.value.name;
});

const moneyFormat = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});

const mediaBudget = computed(() => {
  if (!mediaDetails.value) return null;
  return "budget" in mediaDetails.value
    ? moneyFormat.format(mediaDetails.value.budget)
    : null;
});

const mediaRevenue = computed(() => {
  if (!mediaDetails.value) return null;
  return "revenue" in mediaDetails.value
    ? moneyFormat.format(mediaDetails.value.revenue)
    : null;
});

const mediaKeywords = computed(() => {
  if (!mediaDetails.value) return null;
  return "keywords" in mediaDetails.value.keywords
    ? mediaDetails.value.keywords.keywords
    : mediaDetails.value.keywords.results;
});

const mediaCredits = computed(() => {
  if (!mediaDetails.value) return null;
  return "aggregate_credits" in mediaDetails.value
    ? mediaDetails.value.aggregate_credits
    : mediaDetails.value.credits;
});

provide("credits", mediaCredits);
provide("images", mediaDetails.value?.images);
</script>

<template>
  <main>
    <section
      id="overview"
      class="relative bg-cover bg-center"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${mediaDetails?.backdrop_path})`,
      }"
    >
      <div class="absolute top-0 h-full w-full bg-black/80" />
      <div
        class="relative mx-auto flex max-w-7xl flex-col space-y-4 px-4 pb-12 pt-[calc(56px+2rem)] sm:flex-row sm:space-x-8"
      >
        <div class="shrink-0 self-center">
          <img
            class="w-[250px] border-2"
            :src="`https://image.tmdb.org/t/p/w342/${mediaDetails?.poster_path}`"
            alt=""
          />
        </div>
        <div class="space-y-4 text-white">
          <h1 class="text-2xl font-bold">
            {{ mediaTitle }} ({{ mediaReleaseYear }})
          </h1>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-4 text-sm">
            <span>
              {{ mediaDetails?.vote_average }}/10 | {{ mediaReleaseDate }} |
              {{ mediaRuntime }}
            </span>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-4">
              <RouterLink
                class="rounded-lg bg-rose-800 px-2 py-1 hover:bg-amber-500"
                v-for="genre in mediaDetails?.genres"
                :key="genre.id"
                :to="`/genres/${genre.id}`"
              >
                {{ genre.name }}
              </RouterLink>
            </div>
          </div>
          <p class="italic text-white/50" v-if="mediaDetails?.tagline !== ''">
            {{ mediaDetails?.tagline }}
          </p>
          <div class="space-y-4">
            <h2 class="text-lg font-bold">Overview</h2>
            <p>{{ mediaDetails?.overview }}</p>
          </div>
        </div>
      </div>
    </section>
    <div class="mx-auto grid max-w-7xl md:grid-cols-[1fr_240px]">
      <div class="overflow-hidden">
        <MediaDetails />
        <section id="recommendation-media" class="my-8 overflow-hidden px-4">
          <h1 class="text-2xl font-bold">Recommendations</h1>
          <div class="main-scrollbar flex space-x-2 overflow-auto px-1 py-6">
            <MediaCard
              v-for="media in mediaRecommendationList"
              :key="media.id"
              :id="media.id"
              :release_date="
                'release_date' in media
                  ? media.release_date
                  : media.first_air_date
              "
              :vote_average="media.vote_average"
              :media_type="mediaEndpointType"
              :poster_path="media.poster_path"
              :title="'title' in media ? media.title : media.name"
            />
          </div>
        </section>
      </div>
      <MediaMoreDetails
        :keywords="mediaKeywords"
        :homepage="mediaDetails?.homepage"
        :original_language="mediaDetails?.original_language"
        :status="mediaDetails?.status"
        :budget="mediaBudget"
        :revenue="mediaRevenue"
        :external_ids="mediaDetails?.external_ids"
      />
    </div>
  </main>
</template>
