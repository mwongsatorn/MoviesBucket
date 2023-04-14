<script setup lang="ts">
interface Props {
  backdropPath: string | null;
  posterPath: string | null;
  title: string;
  releaseYear: string;
  voteAverage: number;
  releaseDate: string;
  runtime: string | null;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  tagline: string | null;
  overview: string;
}

const props = defineProps<Props>();
</script>

<template>
  <section
    id="overview"
    class="relative bg-cover bg-center"
    :style="{
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${props.backdropPath})`,
    }"
  >
    <div class="absolute top-0 h-full w-full bg-black/80" />
    <div
      class="relative mx-auto flex max-w-7xl flex-col space-y-4 px-4 pb-12 pt-[calc(56px+2rem)] sm:flex-row sm:space-x-8"
    >
      <div class="shrink-0 self-center">
        <img
          class="w-[250px] border-2"
          :src="`https://image.tmdb.org/t/p/w342/${props.posterPath}`"
          alt=""
        />
      </div>
      <div class="space-y-4 text-white">
        <h1 class="text-2xl font-bold">
          {{ props.title }} ({{ props.releaseYear }})
        </h1>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-4 text-sm">
          <span>
            {{ props.voteAverage }}/10 | {{ props.releaseDate }} |
            {{ props.runtime }}
          </span>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-4">
            <RouterLink
              class="rounded-lg bg-rose-800 px-2 py-1 hover:bg-amber-500"
              v-for="genre in props.genres"
              :key="genre.id"
              :to="`/genres/${genre.id}`"
            >
              {{ genre.name }}
            </RouterLink>
          </div>
        </div>
        <p class="italic text-white/50" v-if="props.tagline !== ''">
          {{ props.tagline }}
        </p>
        <div class="space-y-4">
          <h2 class="text-lg font-bold">Overview</h2>
          <p>{{ props.overview }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
