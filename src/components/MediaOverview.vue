<script setup lang="ts">
import type { MovieDetails, SerieDetails } from "@/types";
interface Props {
  media: MovieDetails | SerieDetails;
  type: "movies" | "series";
}

const props = defineProps<Props>();

function runtime() {
  if (!("runtime" in props.media)) return null;
  if (props.media.runtime === null) return null;
  const hrs = Math.floor(props.media.runtime / 60).toString();
  const mins = (props.media.runtime % 60).toString();
  return `${hrs} hr ${mins} min`;
}
</script>

<template>
  <section
    id="overview"
    class="relative bg-cover bg-center"
    :style="{
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${props.media.backdrop_path})`,
    }"
  >
    <div class="absolute top-0 h-full w-full bg-black/80" />
    <div
      class="relative mx-auto flex max-w-7xl flex-col space-y-4 px-4 pb-12 pt-[calc(56px+2rem)] sm:flex-row sm:space-x-8"
    >
      <div class="shrink-0 self-center">
        <img
          class="w-[250px] border-2"
          :src="`https://image.tmdb.org/t/p/w342/${props.media.poster_path}`"
          alt=""
        />
      </div>
      <div class="space-y-4 text-white">
        <h1 v-if="'title' in props.media" class="text-2xl font-bold">
          {{ props.media.title }} ({{ props.media.release_date.split("-")[0] }})
        </h1>
        <h1 v-else class="text-2xl font-bold">
          {{ props.media.name }}
          ({{ props.media.first_air_date.split("-")[0] }})
        </h1>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-4 text-sm">
          <span v-if="'release_date' in props.media">
            {{ props.media.vote_average }}/10 | {{ props.media.release_date }} |
            {{ runtime() }}
          </span>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-4">
            <RouterLink
              class="rounded-lg bg-rose-800 px-2 py-1 hover:bg-amber-500"
              v-for="genre in props.media.genres"
              :key="genre.id"
              :to="`/${props.type}/genres/${genre.id}`"
            >
              {{ genre.name }}
            </RouterLink>
          </div>
        </div>
        <p class="italic text-white/50" v-if="props.media.tagline !== ''">
          {{ props.media.tagline }}
        </p>
        <div class="space-y-4">
          <h2 class="text-lg font-bold">Overview</h2>
          <p>{{ props.media.overview }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
