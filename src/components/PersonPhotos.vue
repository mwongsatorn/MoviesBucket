<script setup lang="ts">
import { ref } from "vue";
import { vLazy } from "@/directives/lazy";
import CardGrid from "./CardGrid.vue";
import MediaItemSlider from "./MediaItemSlider.vue";
import IconExpand from "./Icons/IconExpand.vue";
import type { Image } from "@/types";

const props = defineProps<{
  photos: Image[];
}>();

const showSlider = ref(false);
const initialIndex = ref(0);

function openSlider(index: number) {
  initialIndex.value = index;
  document.body.classList.toggle("overflow-hidden");
  showSlider.value = true;
}

function closeSlider() {
  showSlider.value = false;
  document.body.classList.toggle("overflow-hidden");
}
</script>

<template>
  <div class="px-4 @container">
    <CardGrid>
      <template #cards>
        <div
          class="group relative cursor-pointer bg-gray-100"
          @click="openSlider(index)"
          v-for="(photo, index) in props.photos"
          :key="index"
        >
          <img
            class="w-full object-cover object-center opacity-0 transition duration-500"
            v-lazy
            :data-src="`https://image.tmdb.org/t/p/w300/${photo.file_path}`"
            alt=""
          />
          <div
            class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100"
          >
            <IconExpand class="h-8 w-8"></IconExpand>
          </div>
        </div>
      </template>
    </CardGrid>
    <Teleport to="body">
      <MediaItemSlider
        v-if="showSlider"
        :initial-index="initialIndex"
        :slider-item-list="props.photos"
        :item-aspect-ratio="2 / 3"
        @close-slider="closeSlider()"
      />
    </Teleport>
  </div>
</template>
