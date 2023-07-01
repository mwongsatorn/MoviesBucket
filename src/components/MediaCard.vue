<script setup lang="ts">
import { RouterLink } from "vue-router";
import { vLazy } from "@/directives/lazy";
import IconMediaPlaceholder from "./Icons/IconMediaPlaceholder.vue";
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";

interface Props {
  media: ShortMovieDetails | ShortSerieDetails;
  type: "movies" | "series";
}
const props = defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="`/${props.type}/${props.media.id}`"
    class="relative aspect-[2/3] shrink-0 overflow-hidden border-2 bg-gray-200"
  >
    <img
      v-lazy
      v-if="props.media.poster_path"
      class="h-full w-full opacity-0 transition duration-500 hover:scale-110"
      :data-src="`https://image.tmdb.org/t/p/w500/${props.media.poster_path}`"
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
      <p v-if="'title' in props.media" class="line-clamp-1 font-bold">
        {{ props.media.title }}
      </p>
      <p v-else class="line-clamp-1 font-bold">
        {{ props.media.name }}
      </p>
      <p class="flex justify-between text-xs">
        <span v-if="'release_date' in props.media">
          {{ props.media.release_date }}
        </span>
        <span v-else>{{ props.media.first_air_date }}</span>
        <span>{{ props.media.vote_average }} / 10</span>
      </p>
    </div>
  </RouterLink>
</template>
