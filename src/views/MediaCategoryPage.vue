<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  getTrendingMedia,
  getTopRatedMedia,
  getPopularMedia,
  getUpcomingMovies,
} from "@/composables/tmdb";
import CardGrid from "@/components/CardGrid.vue";
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";

type Category = "top-rated" | "trending" | "popular" | "upcoming";
const props = defineProps<{ category: Category }>();

const route = useRoute();
const type = route.name === "MovieCategory" ? "movie" : "tv";

async function getCardlist(page: number) {
  if (props.category === "top-rated") return getTopRatedMedia(type, page);
  if (props.category === "popular") return getPopularMedia(type, page);
  if (props.category === "trending")
    return getTrendingMedia(type, "week", page);
  if (props.category === "upcoming") return getUpcomingMovies(page);
  throw "never";
}
const cards = ref<(ShortMovieDetails | ShortSerieDetails)[]>([]);

const categoryName =
  props.category.charAt(0).toUpperCase() + props.category.slice(1);
const mediaName = route.name === "MovieCategory" ? "Movies" : "Series";
const title = `${categoryName} ${mediaName}`;

async function fetch(page: number) {
  const { data } = await getCardlist(page);
  cards.value.push(...data.value!.results);
}
</script>

<template>
  <main>
    <section
      id="media-category"
      class="relative mx-auto my-8 max-w-7xl px-4 @container"
    >
      <h1 class="text-xl font-bold sm:text-2xl">
        {{ title }}
      </h1>
      <CardGrid :fetch="fetch" card-type="media" :cards="cards" />
    </section>
  </main>
</template>
