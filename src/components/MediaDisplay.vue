<script setup lang="ts">
import { ref } from "vue";
import { mediaDisplayProps } from "@/utils/props";
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";
import MediaDisplayItem from "./MediaDisplayItem.vue";
import IconChevronLeft from "./Icons/IconChevronLeft.vue";
import IconChevronRight from "./Icons/IconChevronRight.vue";

interface Props {
  sectionName: string;
  items: ShortMovieDetails[] | ShortSerieDetails[];
}

const props = defineProps<Props>();

const scroll = ref<HTMLElement | null>(null);

function scrollHorizontally(dir: number) {
  const scrollElement = scroll.value;
  if (scrollElement) {
    const scrollWidth = scrollElement.clientWidth;
    const scrollAmount = dir === 1 ? scrollWidth : -scrollWidth;

    scrollElement.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
}
</script>

<template>
  <section :id="props.sectionName" class="relative">
    <div
      ref="scroll"
      class="main-scrollbar flex snap-x snap-mandatory overflow-auto"
    >
      <MediaDisplayItem
        v-for="item in items"
        :key="item.id"
        v-bind="mediaDisplayProps(item)"
      />
    </div>
    <button
      @click="scrollHorizontally(-1)"
      class="absolute left-4 top-1/2 -translate-y-[150%] rounded-full bg-rose-800 px-4 py-4 text-white opacity-20 duration-300 hover:opacity-100 md:-translate-y-1/2"
    >
      <IconChevronLeft class="h-4 w-4"></IconChevronLeft>
    </button>
    <button
      @click="scrollHorizontally(1)"
      class="absolute right-4 top-1/2 -translate-y-[150%] rounded-full bg-rose-800 px-4 py-4 text-white opacity-20 duration-300 hover:opacity-100 md:-translate-y-1/2"
    >
      <IconChevronRight class="h-4 w-4"></IconChevronRight>
    </button>
  </section>
</template>
