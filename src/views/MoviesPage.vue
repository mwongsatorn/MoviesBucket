<script setup lang="ts">
import MediaDisplay from "@/components/MediaDisplay.vue";
import CardCarousel from "@/components/CardCarousel.vue";
import MediaCard from "@/components/MediaCard.vue";
import { mediaCardProps } from "@/utils/props";
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
    <CardCarousel
      section-name="top-rated-movies"
      header-title="Top Rated Movies"
    >
      <MediaCard
        class="snap-start"
        v-for="movie in topRatedMovies?.results"
        :key="movie.id"
        v-bind="mediaCardProps(movie)"
      />
    </CardCarousel>
    <CardCarousel section-name="upcoming-movies" header-title="Upcoming Movies">
      <MediaCard
        class="snap-start"
        v-for="movie in upComingMovies?.results"
        :key="movie.id"
        v-bind="mediaCardProps(movie)"
      />
    </CardCarousel>
    <CardCarousel section-name="popular-movies" header-title="Popular Movies">
      <MediaCard
        v-for="movie in popularMovies?.results"
        :key="movie.id"
        v-bind="mediaCardProps(movie)"
      />
    </CardCarousel>
  </main>
</template>
