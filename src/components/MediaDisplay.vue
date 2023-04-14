<script setup lang="ts">
import { RouterLink } from "vue-router";

interface Props {
  id: number;
  title: string;
  overview: string | null;
  releaseYear: string;
  backdropPath: string | null;
  mediaType: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="relative h-[520px] w-full shrink-0 snap-start bg-black">
    <img
      class="absolute right-0 top-0 h-[50%] w-full object-cover sm:h-full sm:w-[50%]"
      :src="`https://image.tmdb.org/t/p/w1280/${props.backdropPath}`"
      alt=""
    />
    <div
      class="relative mx-auto h-full max-w-7xl bg-gradient-to-t from-black via-black to-transparent sm:bg-gradient-to-r"
    >
      <div
        class="flex h-full w-full flex-col justify-end space-y-8 px-4 pb-12 text-white sm:w-[50%] sm:justify-center"
      >
        <div class="line-clamp-1 text-2xl font-bold">
          {{ props.title }} ({{ props.releaseYear }})
        </div>
        <div class="line-clamp-3">
          {{ props.overview }}
        </div>
        <RouterLink
          :to="`${props.mediaType}/${props.id}`"
          class="w-fit rounded-lg bg-rose-800 px-4 py-2 text-sm hover:bg-amber-500"
        >
          More details
        </RouterLink>
      </div>
    </div>
  </div>
</template>
