<script lang="ts" setup>
import { ref } from "vue";
import {
  getTrendingMedia,
  getTopRatedMedia,
  getPopularMedia,
  getUpcomingMovies,
} from "@/composables/tmdb";
import CardGrid from "@/components/CardGrid.vue";
import MediaCard from "@/components/MediaCard.vue";
import type { ShortMovie, ShortSerie } from "@/types";

type Media = "movies" | "series";
type Category = "top-rated" | "trending" | "popular" | "upcoming";
const props = defineProps<{ media: Media; category: Category }>();

const type = props.media === "movies" ? "movie" : "tv";

async function getCardlist(page: number) {
  if (props.category === "top-rated") return getTopRatedMedia(type, page);
  if (props.category === "popular") return getPopularMedia(type, page);
  if (props.category === "trending")
    return getTrendingMedia(type, "week", page);
  if (props.category === "upcoming" && props.media === "movies")
    return getUpcomingMovies(page);
  throw "never";
}
const cards = ref<(ShortMovie | ShortSerie)[]>([]);
let page = 0;

const title = `${props.category} ${props.media}`;

async function fetch() {
  page++;
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
      <h1 class="text-xl font-bold capitalize sm:text-2xl">
        {{ title }}
      </h1>
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
