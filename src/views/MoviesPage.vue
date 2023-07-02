<script setup lang="ts">
import MediaDisplay from "@/components/MediaDisplay.vue";
import CardCarousel from "@/components/CardCarousel.vue";
import MediaCard from "@/components/MediaCard.vue";
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
      name="top-rated-movies"
      title="Top-rated movies"
      to="/movies/categories/top-rated"
    >
      <template #cards>
        <MediaCard
          class="snap-start"
          v-for="movie in topRatedMovies?.results"
          :key="movie.id"
          :media="movie"
          type="movies"
        />
      </template>
    </CardCarousel>
    <CardCarousel
      name="upcoming-movies"
      title="Upcoming movies"
      to="/movies/categories/upcoming"
    >
      <template #cards>
        <MediaCard
          class="snap-start"
          v-for="movie in upComingMovies?.results"
          :key="movie.id"
          :media="movie"
          type="movies"
        />
      </template>
    </CardCarousel>
    <CardCarousel
      name="popular-movies"
      title="Popular Movies"
      to="/movies/categories/popular"
    >
      <template #cards>
        <MediaCard
          v-for="movie in popularMovies?.results"
          :key="movie.id"
          :media="movie"
          type="movies"
        />
      </template>
    </CardCarousel>
  </main>
</template>
