<script setup lang="ts">
import { getPopularMedia } from "@/composables/tmdb";
import MediaCard from "@/components/MediaCard.vue";
const { data: popularMovies } = getPopularMedia("movie");
const { data: popularSeries } = getPopularMedia("tv");
</script>

<template>
  <main class="">
    <section class="mx-auto max-w-7xl py-8">
      <h1 class="px-4 text-2xl font-bold">Popular Movies</h1>
      <div class="flex space-x-2 overflow-auto py-8 px-4">
        <MediaCard
          v-for="movie in popularMovies?.results"
          :key="movie.id"
          :id="movie.id"
          :title="movie.title"
          :vote_average="movie.vote_average"
          :release_date="movie.release_date"
          :poster_path="movie.poster_path"
        />
      </div>
    </section>
    <section class="mx-auto max-w-7xl py-8">
      <h1 class="px-4 text-2xl font-bold">Popular Series</h1>
      <div class="flex space-x-2 overflow-auto py-8 px-4">
        <MediaCard
          v-for="serie in popularSeries?.results"
          :key="serie.id"
          :id="serie.id"
          :title="serie.name"
          :vote_average="serie.vote_average"
          :release_date="serie.first_air_date"
          :poster_path="serie.poster_path"
        />
      </div>
    </section>
  </main>
</template>
