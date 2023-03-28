<script setup lang="ts">
import { vLazy } from "@/directives/lazy";
import IconPerson from "./Icons/IconPerson.vue";

interface Props {
  id: number;
  profile_path: string;
  name: string;
  character: string | undefined;
}

const props = defineProps<Props>();

console.log(props.id);
</script>

<template>
  <RouterLink
    :to="`/people/${props.id}`"
    class="relative w-[185px] shrink-0 space-y-1 shadow-lg transition-transform duration-300 hover:scale-105"
  >
    <img
      v-lazy
      v-if="props.profile_path"
      class="aspect-[185/278] w-[185px] opacity-0 transition duration-500"
      alt=""
      :data-src="`https://image.tmdb.org/t/p/w185/${props.profile_path}`"
    />
    <div
      v-else
      class="flex aspect-[185/278] w-[185px] items-center justify-center bg-gray-400"
    >
      <IconPerson class="h-20 w-20 text-white" />
    </div>
    <p class="px-2">{{ props.name }}</p>
    <p class="line-clamp-1 px-2 text-sm text-gray-400">{{ props.character }}</p>
  </RouterLink>
</template>
