<script setup lang="ts">
import { ref } from "vue";
import { getMediaByGenreId, getMediaGenreList } from "@/composables/tmdb";
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";
import CardGrid from "@/components/CardGrid.vue";
import { computed } from "vue";

const props = defineProps<{
  media: "movies" | "series";
  id: string;
}>();

const type = props.media === "movies" ? "movie" : "tv";

const cards = ref<(ShortMovieDetails | ShortSerieDetails)[]>([]);

const { data: genres } = await getMediaGenreList(type);
const genre = computed(() => {
  return genres.value!.genres.find((genre) => genre.id == props.id);
});

async function fetch(page: number) {
  const { data } = await getMediaByGenreId(type, props.id, page);
  cards.value.push(...data.value!.results);
}
</script>

<template>
  <main>
    <section
      id="media-by-keyword"
      class="relative mx-auto my-8 max-w-7xl px-4 @container"
    >
      <h1 class="text-xl font-bold sm:text-2xl">Genre: {{ genre?.name }}</h1>
      <CardGrid :fetch="fetch" card-type="media" :cards="cards" />
    </section>
  </main>
</template>
