<script setup lang="ts">
import { getTrendingMedia } from "@/composables/tmdb";
import { mediaCardProps, mediaDisplayProps } from "@/utils/props";
import MediaDisplay from "@/components/MediaDisplay.vue";
import MediaCard from "@/components/MediaCard.vue";
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
    >
      <MediaCard
        v-for="movie in trendingMovies?.results"
        v-bind="mediaCardProps(movie)"
        :key="movie.id"
      />
    </MediaCarousel>
    <MediaCarousel
      section-name="trending-series"
      header-title="Trending Series"
    >
      <MediaCard
        v-for="serie in trendingSeries?.results"
        v-bind="mediaCardProps(serie)"
        :key="serie.id"
      />
    </MediaCarousel>
  </main>
</template>
