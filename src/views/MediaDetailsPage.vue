<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { getMediaDetails } from "../composables/tmdb";

const route = useRoute();

const mediaType = route.name === "MovieDetails" ? "movie" : "tv";

const { data: mediaDetails } = getMediaDetails(
  route.params.id as string,
  mediaType
);

const runtime = computed(() => {
  if (!mediaDetails.value?.runtime) return null;
  const hrs = Math.floor(mediaDetails.value?.runtime / 60).toString();
  const mins = (mediaDetails.value?.runtime % 60).toString();
  return `${hrs}hr${mins}min`;
});
</script>

<template>
  <main>
    <section
      id="overview"
      class="relative bg-cover bg-center"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${mediaDetails?.backdrop_path})`,
      }"
    >
      <div class="absolute top-0 h-full w-full bg-black/80" />
      <div
        class="relative mx-auto flex max-w-7xl flex-col space-y-4 px-4 pt-[calc(56px+2rem)] pb-12 sm:flex-row sm:space-x-8"
      >
        <div class="shrink-0 self-center">
          <img
            class="w-[250px] border-2"
            :src="`https://image.tmdb.org/t/p/w342/${mediaDetails?.poster_path}`"
            alt=""
          />
        </div>
        <div class="space-y-4 text-white">
          <h1 v-if="mediaType === 'movie'" class="text-2xl font-bold">
            {{ mediaDetails?.title }}
            ({{ mediaDetails?.release_date?.split("-")[0] }})
          </h1>
          <h1 v-else class="text-2xl font-bold">
            {{ mediaDetails?.name }} ({{
              mediaDetails?.first_air_date?.split("-")[0]
            }})
          </h1>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-4 text-sm">
            <span v-if="mediaType === 'movie'">
              {{ mediaDetails?.vote_average }}/10 |
              {{ mediaDetails?.release_date }} | {{ runtime }}
            </span>
            <span v-else>
              {{ mediaDetails?.vote_average }}/10 |
              {{ mediaDetails?.first_air_date }}
            </span>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-4">
              <RouterLink
                class="rounded-lg bg-red-700 px-2 py-1 hover:bg-red-800"
                v-for="genre in mediaDetails?.genres"
                :key="genre.id"
                :to="`/genres/${genre.id}`"
              >
                {{ genre.name }}
              </RouterLink>
            </div>
          </div>
          <p class="italic text-white/50" v-if="mediaDetails?.tagline !== ''">
            {{ mediaDetails?.tagline }}
          </p>
          <div class="space-y-4">
            <h2 class="text-lg font-bold">Overview</h2>
            <p>{{ mediaDetails?.overview }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
