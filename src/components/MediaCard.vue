<script setup lang="ts">
import { RouterLink } from "vue-router";
import { vLazy } from "@/directives/lazy";

interface Props {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  media_type: string;
}
const props = withDefaults(defineProps<Props>(), {
  id: 0,
  title: "Title",
  release_date: "01/01/2023",
  vote_average: 0,
  media_type: "movies",
});
</script>

<template>
  <RouterLink
    :to="`/${props.media_type}/${props.id}`"
    class="relative h-[375px] w-[250px] shrink-0 border-4 border-gray-200 shadow-black transition-transform hover:scale-105"
  >
    <img
      v-lazy
      v-if="poster_path"
      class="opacity-0 transition duration-500"
      :data-src="`https://image.tmdb.org/t/p/w500/${poster_path}`"
      alt=""
    />
    <div
      class="absolute top-2 left-2 border-2 bg-red-800 px-2 py-1 text-xs font-bold text-white"
    >
      {{ props.vote_average }} / 10
    </div>
    <div
      class="absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-black/70"
    ></div>
    <div class="absolute bottom-4 w-full space-y-2 px-4 text-white">
      <div class="text-sm font-bold">{{ props.title }}</div>
      <div class="flex justify-between text-xs italic">
        <span>{{ props.release_date }}</span>
      </div>
    </div>
  </RouterLink>
</template>
