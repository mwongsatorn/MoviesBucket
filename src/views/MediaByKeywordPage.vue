<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getMediaByKeywordId } from "@/composables/tmdb";
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";
import CardGrid from "@/components/CardGrid.vue";

const props = defineProps<{
  media: string;
  id: string;
  name: string;
}>();

const route = useRoute();
const type = route.name === "MoviesByKeyword" ? "movie" : "tv";

const cards = ref<(ShortMovieDetails | ShortSerieDetails)[]>([]);

async function fetch(page: number) {
  const { data } = await getMediaByKeywordId(type, props.id, page);
  cards.value.push(...data.value!.results);
}
</script>

<template>
  <main>
    <section
      id="media-by-keyword"
      class="relative mx-auto my-8 max-w-7xl px-4 @container"
    >
      <h1 class="text-xl font-bold sm:text-2xl">Keyword: {{ props.name }}</h1>
      <CardGrid :fetch="fetch" card-type="media" :cards="cards" />
    </section>
  </main>
</template>
