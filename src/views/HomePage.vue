<script setup lang="ts">
import { getPopularMedia, getTrendingMedia } from "@/composables/tmdb";
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";
import MediaDisplay from "@/components/MediaDisplay.vue";
import MediaCard from "@/components/MediaCard.vue";
import MediaCarousel from "@/components/MediaCarousel.vue";

const [trendingMediaResult, popularMoviesResult, popularSeriesResult] =
  await Promise.all([
    getTrendingMedia("all", "week"),
    getPopularMedia("movie"),
    getPopularMedia("tv"),
  ]);

const { data: trendingMedia } = trendingMediaResult;
const { data: popularMovies } = popularMoviesResult;
const { data: popularSeries } = popularSeriesResult;

function mediaReleaseYear(date: string) {
  return date.split("-", 1)[0];
}

function mediaCardProps(media: ShortMovieDetails | ShortSerieDetails) {
  return {
    id: media.id,
    title: "title" in media ? media.title : media.name,
    vote_average: media.vote_average,
    release_date:
      "release_date" in media ? media.release_date : media.first_air_date,
    poster_path: media.poster_path,
    media_type: "title" in media ? "movies" : "series",
  };
}

function mediaDisplayProps(media: ShortMovieDetails | ShortSerieDetails) {
  return {
    id: media.id,
    title: "title" in media ? media.title : media.name,
    overview: media.overview,
    releaseYear:
      "release_date" in media
        ? mediaReleaseYear(media.release_date)
        : mediaReleaseYear(media.first_air_date),
    backdropPath: media.backdrop_path,
    mediaType: "title" in media ? "movies" : "series",
  };
}
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
    <MediaCarousel section-name="popular-movies" header-title="Popular Movies">
      <MediaCard
        v-for="movie in popularMovies?.results"
        v-bind="mediaCardProps(movie)"
        :key="movie.id"
      />
    </MediaCarousel>
    <MediaCarousel section-name="popular-series" header-title="Popular Series">
      <MediaCard
        v-for="serie in popularSeries?.results"
        v-bind="mediaCardProps(serie)"
        :key="serie.id"
      />
    </MediaCarousel>
  </main>
</template>
