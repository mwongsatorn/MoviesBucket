<script setup lang="ts">
import MediaDisplay from "@/components/MediaDisplay.vue";
import MediaCarousel from "@/components/MediaCarousel.vue";
import {
  getTrendingMedia,
  getPopularMedia,
  getTopRatedMedia,
} from "@/composables/tmdb";
import { mediaDisplayProps } from "@/utils/props";

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
    <section
      id="trending-media"
      class="main-scrollbar flex snap-x snap-mandatory overflow-auto"
    >
      <MediaDisplay
        v-for="media in trendingSeries?.results.slice(0, 10)"
        v-bind="mediaDisplayProps(media)"
        :key="media.id"
      >
      </MediaDisplay>
    </section>
    <MediaCarousel
      section-name="top-rated-series"
      header-title="Top Rated Series"
      :media="topRatedSeries!.results"
    />
    <MediaCarousel
      section-name="popular-series"
      header-title="Popular Series"
      :media="popularSeries!.results"
    />
  </main>
</template>
