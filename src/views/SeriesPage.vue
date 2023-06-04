<script setup lang="ts">
import MediaDisplay from "@/components/MediaDisplay.vue";
import CardCarousel from "@/components/CardCarousel.vue";
import MediaCard from "@/components/MediaCard.vue";
import {
  getTrendingMedia,
  getPopularMedia,
  getTopRatedMedia,
} from "@/composables/tmdb";
import { mediaCardProps } from "@/utils/props";

const [
  { data: trendingSeries },
  { data: topRatedSeries },
  { data: popularSeries },
] = await Promise.all([
  getTrendingMedia("tv", "week"),
  getTopRatedMedia("tv"),
  getPopularMedia("tv"),
]);
</script>

<template>
  <main>
    <MediaDisplay
      section-name="trending-series"
      :items="trendingSeries!.results"
    />
    <CardCarousel
      name="top-rated-series"
      title="Top Rated Series"
      to="/series/categories/top-rated"
    >
      <template #cards>
        <MediaCard
          class="snap-start"
          v-for="serie in topRatedSeries?.results"
          :key="serie.id"
          v-bind="mediaCardProps(serie)"
        />
      </template>
    </CardCarousel>
    <CardCarousel
      name="popular-series"
      title="Popular Series"
      to="/series/categories/popular"
    >
      <template #cards>
        <MediaCard
          class="snap-start"
          v-for="serie in popularSeries?.results"
          :key="serie.id"
          v-bind="mediaCardProps(serie)"
        />
      </template>
    </CardCarousel>
  </main>
</template>
