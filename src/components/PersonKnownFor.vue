<script setup lang="ts">
import type { ShortMovie, ShortSerie } from "@/types";
import CardGrid from "./CardGrid.vue";
import MediaCard from "./MediaCard.vue";

const props = defineProps<{
  list: (ShortMovie | ShortSerie)[];
}>();
</script>

<template>
  <div class="px-4 @container">
    <CardGrid>
      <template #cards>
        <MediaCard
          v-for="card in props.list"
          :key="card.id"
          :media="card"
          :type="card.media_type === 'movie' ? 'movies' : 'series'"
        />
      </template>
    </CardGrid>
  </div>
</template>
