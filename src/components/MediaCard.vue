<script setup lang="ts">
import { RouterLink } from "vue-router";
import { vLazy } from "@/directives/lazy";
import IconMediaPlaceholder from "./Icons/IconMediaPlaceholder.vue";

interface Props {
  id: number;
  title: string;
  releaseDate: string;
  voteAverage: number;
  posterPath: string | null;
  mediaType: string;
}
const props = defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="`/${props.mediaType}/${props.id}`"
    class="relative aspect-[2/3] shrink-0 overflow-hidden border-2 bg-gray-200"
  >
    <img
      v-lazy
      v-if="posterPath"
      class="h-full w-full opacity-0 transition duration-500 hover:scale-110"
      :data-src="`https://image.tmdb.org/t/p/w500/${posterPath}`"
      alt=""
    />
    <div
      v-else
      class="flex h-full w-full items-center justify-center bg-gray-400"
    >
      <IconMediaPlaceholder class="h-20 w-20 font-bold text-white" />
    </div>

    <div
      class="pointer-events-none absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-black/70"
    />
    <div
      class="absolute bottom-4 hidden w-full space-y-2 px-4 text-white @2xl:block"
    >
      <p class="line-clamp-1 font-bold">{{ props.title }}</p>
      <p class="flex justify-between text-xs">
        <span>{{ props.releaseDate }}</span>
        <span>{{ props.voteAverage }} / 10</span>
      </p>
    </div>
  </RouterLink>
</template>
