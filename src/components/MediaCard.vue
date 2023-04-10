<script setup lang="ts">
import { RouterLink } from "vue-router";
import { vLazy } from "@/directives/lazy";
import IconMediaPlaceholder from "./Icons/IconMediaPlaceholder.vue";

interface Props {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  media_type: string;
}
const props = defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="`/${props.media_type}/${props.id}`"
    class="relative shrink-0 bg-gray-200 shadow-black transition-transform duration-500 hover:scale-105"
  >
    <img
      v-lazy
      v-if="poster_path"
      class="aspect-[2/3] w-[250px] opacity-0 transition duration-500"
      :data-src="`https://image.tmdb.org/t/p/w500/${poster_path}`"
      alt=""
    />
    <div
      v-else
      class="flex aspect-[2/3] w-[250px] items-center justify-center bg-gray-400"
    >
      <IconMediaPlaceholder class="h-20 w-20 font-bold text-white" />
    </div>
    <div
      class="absolute left-2 top-2 border-2 bg-red-800 px-2 py-1 text-xs font-bold text-white"
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
