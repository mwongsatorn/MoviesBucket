<script setup lang="ts">
import { getTrendingMedia } from "@/composables/tmdb";
import MediaDisplay from "@/components/MediaDisplay.vue";
import MediaCarousel from "@/components/MediaCarousel.vue";

const [
  { data: trendingMedia },
  { data: trendingMovies },
  { data: trendingSeries },
] = await Promise.all([
  getTrendingMedia("all", "week"),
  getTrendingMedia("movie", "week"),
  getTrendingMedia("tv", "week"),
]);
</script>

<template>
  <main>
    <MediaDisplay section-name="trending-all" :items="trendingMedia!.results" />
    <MediaCarousel
      section-name="trending-movies"
      header-title="Trending Movies"
      :media="trendingMovies!.results"
    />
    <MediaCarousel
      section-name="trending-series"
      header-title="Trending Series"
      :media="trendingSeries!.results"
    />
  </main>
</template>
