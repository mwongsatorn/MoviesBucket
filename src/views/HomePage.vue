<script setup lang="ts">
import { getTrendingMedia } from "@/composables/tmdb";
import { mediaDisplayProps } from "@/utils/props";
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
    <section
      id="trending-media"
      class="main-scrollbar flex snap-x snap-mandatory overflow-auto"
    >
      <MediaDisplay
        v-for="media in trendingMedia?.results.slice(0, 7)"
        v-bind="mediaDisplayProps(media)"
        :key="media.id"
      >
      </MediaDisplay>
    </section>
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
