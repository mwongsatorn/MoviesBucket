<script setup lang="ts">
import MediaDisplay from "@/components/MediaDisplay.vue";
import MediaCarousel from "@/components/MediaCarousel.vue";
import {
  getTrendingMedia,
  getPopularMedia,
  getTopRatedMedia,
} from "@/composables/tmdb";

const [
  { data: trendingSeries },
  { data: topRatedSeries },
  { data: popularSeries },
] = await Promise.all([
  getTrendingMedia("tv", "week"),
  getTopRatedMedia("tv"),
  getPopularMedia("tv"),
]);
</script>

<template>
  <main>
    <MediaDisplay
      section-name="trending-series"
      :items="trendingSeries!.results"
    />
    <MediaCarousel
      section-name="top-rated-series"
      header-title="Top Rated Series"
      :media="topRatedSeries!.results"
    />
    <MediaCarousel
      section-name="popular-series"
      header-title="Popular Series"
      :media="popularSeries!.results"
    />
  </main>
</template>
