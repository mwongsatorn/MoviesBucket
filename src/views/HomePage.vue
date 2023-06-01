<script setup lang="ts">
import { getTrendingMedia } from "@/composables/tmdb";
import MediaDisplay from "@/components/MediaDisplay.vue";
import CardCarousel from "@/components/CardCarousel.vue";
import MediaCard from "@/components/MediaCard.vue";
import { mediaCardProps } from "@/utils/props";

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
    <CardCarousel section-name="trending-movies" header-title="Trending Movies">
      <MediaCard
        class="snap-start"
        v-for="movie in trendingMovies?.results"
        :key="movie.id"
        v-bind="mediaCardProps(movie)"
      />
    </CardCarousel>
    <CardCarousel section-name="trending-series" header-title="Trending Series">
      <MediaCard
        class="snap-start"
        v-for="serie in trendingSeries?.results"
        :key="serie.id"
        v-bind="mediaCardProps(serie)"
      />
    </CardCarousel>
  </main>
</template>
