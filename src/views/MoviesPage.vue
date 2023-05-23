<script setup lang="ts">
import MediaDisplay from "@/components/MediaDisplay.vue";
import MediaCarousel from "@/components/MediaCarousel.vue";
import {
  getTrendingMedia,
  getPopularMedia,
  getTopRatedMedia,
  getUpcomingMovies,
} from "@/composables/tmdb";

const [
  { data: trendingMovies },
  { data: topRatedMovies },
  { data: popularMovies },
  { data: upComingMovies },
] = await Promise.all([
  getTrendingMedia("movie", "week"),
  getTopRatedMedia("movie"),
  getPopularMedia("movie"),
  getUpcomingMovies(),
]);
</script>

<template>
  <main>
    <MediaDisplay
      section-name="trending-movies"
      :items="trendingMovies!.results"
    />
    <MediaCarousel
      section-name="top-rated-movies"
      header-title="Top Rated Movies"
      :media="topRatedMovies!.results"
    />
    <MediaCarousel
      section-name="upcoming-movies"
      header-title="Upcoming Movies"
      :media="upComingMovies!.results"
    />
    <MediaCarousel
      section-name="popular-movies"
      header-title="Popular Movies"
      :media="popularMovies!.results"
    >
    </MediaCarousel>
  </main>
</template>
