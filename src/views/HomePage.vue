<script setup lang="ts">
import { RouterLink } from "vue-router";
import { getPopularMedia, getTrendingMedia } from "@/composables/tmdb";
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";
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

function mediaTitle(media: ShortMovieDetails | ShortSerieDetails) {
  return "title" in media ? media.title : media.name;
}

function mediaReleaseYear(media: ShortMovieDetails | ShortSerieDetails) {
  return "release_date" in media
    ? media.release_date.split("-", 1)[0]
    : media.first_air_date.split("-", 1)[0];
}

function mediaEndpointType(media: ShortMovieDetails | ShortSerieDetails) {
  return media.media_type === "movie" ? "movies" : "series";
}

function mediaCardProps(media: ShortMovieDetails | ShortSerieDetails) {
  return "title" in media
    ? {
        id: media.id,
        title: media.title,
        vote_average: media.vote_average,
        release_date: media.release_date,
        poster_path: media.poster_path,
        media_type: "movies",
      }
    : {
        id: media.id,
        title: media.name,
        vote_average: media.vote_average,
        release_date: media.first_air_date,
        poster_path: media.poster_path,
        media_type: "series",
      };
}
</script>

<template>
  <main>
    <section
      id="trending-media"
      class="main-scrollbar flex snap-x snap-mandatory overflow-auto"
    >
      <div
        v-for="media in trendingMedia?.results.slice(0, 7)"
        :key="media.id"
        class="relative h-[520px] w-full shrink-0 snap-start bg-black"
      >
        <img
          class="absolute right-0 top-0 h-[50%] w-full object-cover sm:h-full sm:w-[50%]"
          :src="`https://image.tmdb.org/t/p/w1280/${media.backdrop_path}`"
          alt=""
        />
        <div
          class="relative mx-auto h-full max-w-7xl bg-gradient-to-t from-black via-black to-transparent sm:bg-gradient-to-r"
        >
          <div
            class="flex h-full w-full flex-col justify-end space-y-8 px-4 pb-12 text-white sm:w-[50%] sm:justify-center"
          >
            <div class="line-clamp-1 text-2xl font-bold">
              {{ mediaTitle(media) }} ({{ mediaReleaseYear(media) }})
            </div>
            <div class="line-clamp-3">
              {{ media.overview }}
            </div>
            <RouterLink
              :to="`${mediaEndpointType(media)}/${media.id}`"
              class="w-fit rounded-lg bg-rose-800 px-4 py-2 text-sm hover:bg-amber-500"
            >
              More details
            </RouterLink>
          </div>
        </div>
      </div>
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
