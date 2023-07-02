<script setup lang="ts">
import MediaDisplay from "@/components/MediaDisplay.vue";
import CardCarousel from "@/components/CardCarousel.vue";
import MediaCard from "@/components/MediaCard.vue";
import {
  getTrendingMedia,
  getPopularMedia,
  getTopRatedMedia,
  getUpcomingMovies,
} from "@/composables/tmdb";
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";

interface MediaList {
  trending: ShortMovieDetails[] | ShortSerieDetails[];
  "top-rated": ShortMovieDetails[] | ShortSerieDetails[];
  popular: ShortMovieDetails[] | ShortSerieDetails[];
  upcoming?: ShortMovieDetails[];
}

type Media = "movies" | "series";
const props = defineProps<{ media: Media }>();
const type = props.media === "movies" ? "movie" : "tv";
const mediaList = {} as MediaList;

const [
  { data: trendingMedia },
  { data: topRatedMedia },
  { data: popularMedia },
] = await Promise.all([
  getTrendingMedia(type, "week"),
  getTopRatedMedia(type),
  getPopularMedia(type),
]);

mediaList.trending = trendingMedia.value!.results;
mediaList["top-rated"] = topRatedMedia.value!.results;
mediaList.popular = popularMedia.value!.results;

if (props.media === "movies") {
  const { data: upComingMovies } = await getUpcomingMovies();
  mediaList.upcoming = upComingMovies.value!.results;
}
</script>

<template>
  <main>
    <MediaDisplay section-name="trending-movies" :items="mediaList.trending" />
    <CardCarousel
      v-for="(cat, key, index) in mediaList"
      :key="index"
      :name="`${key}-${props.media}`"
      :title="`${key} ${props.media}`"
      :to="`/${props.media}/categories/${key}`"
    >
      <template #cards>
        <MediaCard
          v-for="media in cat"
          class="snap-start"
          :key="media.id"
          :media="media"
          :type="props.media"
        />
      </template>
    </CardCarousel>
  </main>
</template>
