<script lang="ts" setup>
import { ref, onMounted, onUnmounted, onUpdated } from "vue";
import MediaCard from "./MediaCard.vue";
import { mediaCardProps } from "@/utils/props";
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";

type Card = ShortMovieDetails | ShortSerieDetails;

interface Props {
  cards: Card[];
  cardType: "media" | "search";
  fetch: (page: number) => Promise<void>;
}
const io = new IntersectionObserver(handleGridScroll);

function handleGridScroll(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  const entry = entries[0];
  if (entry.isIntersecting) {
    page = page + 1;
    observer.unobserve(entry.target);
    props.fetch(page);
  }
}
let page = 1;
const cardsContainer = ref<HTMLElement | null>(null);
const props = defineProps<Props>();
await props.fetch(page);

onMounted(() => {
  io.observe(cardsContainer.value!.lastElementChild!);
});

onUpdated(() => {
  io.observe(cardsContainer.value!.lastElementChild!);
});

onUnmounted(() => {
  io.disconnect();
});
</script>
<template>
  <div
    ref="cardsContainer"
    class="grid grid-cols-2 gap-1 py-4 @md:grid-cols-3 @2xl:grid-cols-4 @5xl:grid-cols-5"
  >
    <MediaCard
      v-for="card in cards"
      :key="card.id"
      v-bind="mediaCardProps(card)"
    />
  </div>
</template>
