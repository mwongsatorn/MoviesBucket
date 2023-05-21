<script setup lang="ts">
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";
import { mediaCardProps } from "@/utils/props";
import MediaCard from "./MediaCard.vue";

interface Props {
  sectionName: string;
  headerTitle: string;
  media: ShortMovieDetails[] | ShortSerieDetails[];
}

const props = defineProps<Props>();
</script>

<template>
  <section :id="props.sectionName" class="mx-auto my-8 max-w-7xl px-4">
    <h1 class="text-2xl font-bold">{{ props.headerTitle }}</h1>
    <div class="main-scrollbar flex space-x-2 overflow-auto px-1 py-6">
      <MediaCard
        v-for="item in media"
        v-bind="mediaCardProps(item)"
        :key="item.id"
      />
    </div>
  </section>
</template>
