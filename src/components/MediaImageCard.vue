<script setup lang="ts">
import { vLazy } from "@/directives/lazy";
import IconExpand from "./Icons/IconExpand.vue";

interface Props {
  filePath: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="group relative aspect-auto w-full cursor-pointer bg-gray-400">
    <img
      v-lazy
      class="h-full w-full opacity-0 transition duration-500"
      :data-src="`https://image.tmdb.org/t/p/w400/${props.filePath}`"
      alt=""
    />
    <div
      class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100"
    >
      <IconExpand class="h-8 w-8"></IconExpand>
    </div>
  </div>
</template>
