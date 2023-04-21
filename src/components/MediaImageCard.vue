<script setup lang="ts">
import { computed } from "vue";
import { vLazy } from "@/directives/lazy";
import IconExpand from "./Icons/IconExpand.vue";

interface Props {
  filePath: string;
  type: "backdrops" | "posters";
}

const props = defineProps<Props>();

const itemClass = computed<string>(() => {
  return props.type === "backdrops"
    ? "w-full @sm:w-[calc(50%-8px)] @xl:w-[calc(33.33%-8px)] @4xl:w-[calc(25%-8px)]"
    : "w-[calc(50%-8px)] @sm:w-[calc(33.33%-8px)] @xl:w-[calc(25%-8px)] @4xl:w-[calc(20%-8px)]";
});
const imageWidth = computed<string>(() => {
  return props.type === "backdrops" ? "w780" : "w342";
});
</script>

<template>
  <div :class="[itemClass]" class="group relative cursor-pointer bg-gray-100">
    <img
      v-lazy
      class="h-full w-full object-cover object-center opacity-0 transition duration-500"
      :data-src="`https://image.tmdb.org/t/p/${imageWidth}/${props.filePath}`"
      alt=""
    />
    <div
      class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100"
    >
      <IconExpand class="h-8 w-8"></IconExpand>
    </div>
  </div>
</template>
