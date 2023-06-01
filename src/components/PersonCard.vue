<script setup lang="ts">
import { vLazy } from "@/directives/lazy";
import IconPerson from "./Icons/IconPerson.vue";

interface Props {
  id: number;
  profilePath: string | null;
  name: string;
  character: string | undefined;
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="`/people/${props.id}`"
    class="relative w-[30%] shrink-0 space-y-1 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 @md/scroll:w-[22.5%] @2xl/scroll:w-[18%] @5xl/scroll:w-[15%]"
  >
    <img
      v-lazy
      v-if="props.profilePath"
      class="aspect-[2/3] w-full opacity-0 transition duration-500"
      alt=""
      :data-src="`https://image.tmdb.org/t/p/w185/${props.profilePath}`"
    />
    <div
      v-else
      class="flex aspect-[2/3] w-full items-center justify-center bg-gray-400"
    >
      <IconPerson class="h-20 w-20 text-white" />
    </div>
    <p class="line-clamp-1 px-2">{{ props.name }}</p>
    <p class="line-clamp-1 px-2 text-sm text-gray-400">{{ props.character }}</p>
  </RouterLink>
</template>
