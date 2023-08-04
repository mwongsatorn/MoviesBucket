<script setup lang="ts">
import { ref, computed } from "vue";
import { getMediaByGenreId, getMediaGenreList } from "@/composables/tmdb";
import type { ShortMovie, ShortSerie } from "@/types";
import CardGrid from "@/components/CardGrid.vue";
import MediaCard from "@/components/MediaCard.vue";

type Media = "movies" | "series";
const props = defineProps<{
  media: Media;
  id: string;
}>();

const type = props.media === "movies" ? "movie" : "tv";

const cards = ref<(ShortMovie | ShortSerie)[]>([]);

const { data: genres } = await getMediaGenreList(type);
const genre = computed(() => {
  return genres.value!.genres.find((genre) => genre.id == props.id);
});

let page = 0;

async function fetch() {
  page++;
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
      <CardGrid :fetch="fetch">
        <template #cards>
          <MediaCard
            v-for="card in cards"
            :key="card.id"
            :media="card"
            :type="props.media"
          />
        </template>
      </CardGrid>
    </section>
  </main>
</template>
