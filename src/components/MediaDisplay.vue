<script setup lang="ts">
import MediaDisplayItem from "./MediaDisplayItem.vue";
import { mediaDisplayProps } from "@/utils/props";
import type { ShortMovieDetails, ShortSerieDetails } from "@/types";

interface Props {
  sectionName: string;
  items: ShortMovieDetails[] | ShortSerieDetails[];
}

const props = defineProps<Props>();
</script>

<template>
  <section
    :id="props.sectionName"
    class="main-scrollbar flex snap-x snap-mandatory overflow-auto"
  >
    <MediaDisplayItem
      v-for="item in items"
      :key="item.id"
      v-bind="mediaDisplayProps(item)"
    />
  </section>
</template>
