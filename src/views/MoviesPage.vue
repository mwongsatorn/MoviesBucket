<script setup lang="ts">
import MediaDisplay from "@/components/MediaDisplay.vue";
import MediaCarousel from "@/components/MediaCarousel.vue";
import MediaCard from "@/components/MediaCard.vue";
import {
  getTrendingMedia,
  getPopularMedia,
  getTopRatedMedia,
  getUpcomingMovies,
} from "@/composables/tmdb";
import { mediaDisplayProps, mediaCardProps } from "@/utils/props";

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
    <section
      id="trending-media"
      class="main-scrollbar flex snap-x snap-mandatory overflow-auto"
    >
      <MediaDisplay
        v-for="media in trendingMovies?.results.slice(0, 10)"
        v-bind="mediaDisplayProps(media)"
        :key="media.id"
      >
      </MediaDisplay>
    </section>
    <MediaCarousel
      section-name="top-rated-movies"
      header-title="Top Rated Movies"
    >
      <MediaCard
        v-for="movie in topRatedMovies?.results"
        v-bind="mediaCardProps(movie)"
        :key="movie.id"
      />
    </MediaCarousel>
    <MediaCarousel
      section-name="upcoming-movies"
      header-title="Upcoming Movies"
    >
      <MediaCard
        v-for="movie in upComingMovies?.results"
        v-bind="mediaCardProps(movie)"
        :key="movie.id"
      />
    </MediaCarousel>
    <MediaCarousel section-name="popular-movies" header-title="Popular Movies">
      <MediaCard
        v-for="movie in popularMovies?.results"
        v-bind="mediaCardProps(movie)"
        :key="movie.id"
      />
    </MediaCarousel>
  </main>
</template>
