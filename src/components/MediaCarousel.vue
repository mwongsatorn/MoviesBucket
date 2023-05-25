<script setup lang="ts">
import { ref } from "vue";
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";
import { mediaCardProps } from "@/utils/props";
import MediaCard from "./MediaCard.vue";
import IconChevronLeft from "./Icons/IconChevronLeft.vue";
import IconChevronRight from "./Icons/IconChevronRight.vue";

interface Props {
  sectionName: string;
  headerTitle: string;
  media: ShortMovieDetails[] | ShortSerieDetails[];
}

const props = defineProps<Props>();

const scroll = ref<HTMLElement | null>(null);

function scrollHorizontally(dir: 1 | -1) {
  const scrollElement = scroll.value;
  if (scrollElement) {
    const scrollWidth = scrollElement.clientWidth;
    const scrollAmount = scrollWidth * dir;

    scrollElement.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
}
</script>

<template>
  <section :id="props.sectionName" class="relative mx-auto my-8 max-w-7xl px-4">
    <h1 class="text-2xl font-bold">{{ props.headerTitle }}</h1>
    <div class="relative @container/scroll">
      <div
        ref="scroll"
        class="main-scrollbar flex snap-x snap-mandatory gap-x-2 overflow-x-auto scroll-smooth py-4"
      >
        <MediaCard
          class="snap-start"
          v-for="item in media"
          v-bind="mediaCardProps(item)"
          :key="item.id"
        />
      </div>
      <button
        @click="scrollHorizontally(-1)"
        class="absolute left-0 top-4 flex h-[calc(100%-2.5rem)] w-[calc(10%-1rem)] items-center justify-center bg-black text-white opacity-40 duration-300 hover:opacity-80 @md/scroll:w-[calc(10%-1.5rem)] @2xl/scroll:w-[calc(10%-2rem)] @5xl/scroll:w-[calc(10%-2.5rem)]"
      >
        <IconChevronLeft class="h-6 w-6" />
      </button>
      <button
        @click="scrollHorizontally(1)"
        class="absolute right-0 top-4 flex h-[calc(100%-2.5rem)] w-[calc(10%-1rem)] items-center justify-center bg-black text-white opacity-40 duration-300 hover:opacity-80 @md/scroll:w-[calc(10%-1.5rem)] @2xl/scroll:w-[calc(10%-2rem)] @5xl/scroll:w-[calc(10%-2.5rem)]"
      >
        <IconChevronRight class="h-6 w-6" />
      </button>
    </div>
  </section>
</template>
